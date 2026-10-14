#!/usr/bin/env python3
"""Base da trilha Mercavejo: instrumentos sintetizados, barramentos, mix e loudness (BS.1770-4).

Usada por make_music.py (15 s) e make_music_30s.py (30 s). A duração vem de TRILHA_DUR
(definida pelo script de arranjo antes do import). Determinística: semente fixa.
"""
import json
import os
import sys

import numpy as np
from scipy.signal import butter, lfilter, sosfilt

SR = 48000
BPM = 128.0
BEAT = 60.0 / BPM  # 0,46875 s
BAR = BEAT * 4  # 1,875 s
DUR = float(os.environ.get("TRILHA_DUR", "15.0"))
N = int(round(DUR * SR))
SEED = 20090101  # "Desde 2009"
rng = np.random.default_rng(SEED)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def t_of(beat):
    return beat * BEAT


def midi_hz(m):
    return 440.0 * 2 ** ((m - 69) / 12.0)


def env_exp(n, decay_s):
    t = np.arange(n) / SR
    return np.exp(-t / max(decay_s, 1e-4))


def adsr(n, a, d, s, r):
    """Envelope linear de n amostras; a/d/r em segundos, s = nível de sustain."""
    e = np.ones(n) * s
    na, nd, nr = int(a * SR), int(d * SR), int(r * SR)
    na = min(na, n)
    e[:na] = np.linspace(0, 1, na, endpoint=False) if na else e[:na]
    nd = min(nd, n - na)
    if nd > 0:
        e[na:na + nd] = np.linspace(1, s, nd, endpoint=False)
    nr = min(nr, n)
    if nr > 0:
        e[n - nr:] *= np.linspace(1, 0, nr)
    return e


def saw(freq, n, phase=0.0):
    t = np.arange(n) / SR
    x = (freq * t + phase) % 1.0
    # PolyBLEP simples para reduzir aliasing
    dt = freq / SR
    y = 2 * x - 1
    m1 = x < dt
    y[m1] -= (x[m1] / dt) ** 2 - 2 * x[m1] / dt + 1 if np.any(m1) else 0
    m2 = x > 1 - dt
    if np.any(m2):
        xx = (x[m2] - 1) / dt
        y[m2] -= xx ** 2 + 2 * xx + 1
    return y


def lp(x, fc, order=2):
    sos = butter(order, min(fc, SR * 0.45), btype="low", fs=SR, output="sos")
    return sosfilt(sos, x)


def hp(x, fc, order=2):
    sos = butter(order, fc, btype="high", fs=SR, output="sos")
    return sosfilt(sos, x)


def bp(x, lo, hi, order=2):
    sos = butter(order, [lo, hi], btype="band", fs=SR, output="sos")
    return sosfilt(sos, x)


def sweep_lp(x, f0, f1, curve=2.0):
    """Filtro passa-baixa de 1 polo com corte variando no tempo (varredura)."""
    n = len(x)
    k = np.linspace(0, 1, n) ** curve
    fc = f0 * (f1 / f0) ** k
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty(n)
    z = 0.0
    for i in range(n):
        z = (1 - a[i]) * x[i] + a[i] * z
        y[i] = z
    return y


class Bus:
    def __init__(self):
        self.L = np.zeros(N)
        self.R = np.zeros(N)

    def add(self, sig, t0, gain=1.0, pan=0.0):
        i0 = int(round(t0 * SR))
        if i0 >= N:
            return
        if i0 < 0:
            sig = sig[..., -i0:]
            i0 = 0
        sig = sig[..., : N - i0]
        if sig.ndim == 1:
            gl = gain * np.cos((pan + 1) * np.pi / 4) * np.sqrt(2)
            gr = gain * np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)
            self.L[i0:i0 + len(sig)] += sig * gl
            self.R[i0:i0 + len(sig)] += sig * gr
        else:
            n = sig.shape[1]
            self.L[i0:i0 + n] += sig[0] * gain
            self.R[i0:i0 + n] += sig[1] * gain


# ---------------------------------------------------------------- instrumentos
def kick(length=0.42):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = 46 + 150 * np.exp(-t / 0.028)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * env_exp(n, 0.16)
    click = hp(rng.standard_normal(n), 2500) * env_exp(n, 0.004) * 0.35
    k = np.tanh(1.6 * (body + click))
    return k


def clap():
    n = int(0.32 * SR)
    noise = rng.standard_normal(n)
    e = np.zeros(n)
    for off in (0.0, 0.011, 0.022):
        i = int(off * SR)
        e[i:] += env_exp(n - i, 0.007 if off < 0.02 else 0.085)
    c = bp(noise, 900, 3200) * e
    return c / (np.max(np.abs(c)) + 1e-9)


def snare(length=0.18):
    n = int(length * SR)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 190 * t) * env_exp(n, 0.04)
    noise = bp(rng.standard_normal(n), 1500, 9000) * env_exp(n, 0.06)
    s = 0.5 * tone + noise
    return s / (np.max(np.abs(s)) + 1e-9)


def hat(open_=False):
    n = int((0.22 if open_ else 0.05) * SR)
    x = hp(rng.standard_normal(n), 7500, order=4)
    x *= env_exp(n, 0.07 if open_ else 0.012)
    return x / (np.max(np.abs(x)) + 1e-9)


def supersaw(freq, n, voices=7, detune=0.18, seed_off=0):
    r = np.random.default_rng(SEED + seed_off)
    L = np.zeros(n)
    R = np.zeros(n)
    for v in range(voices):
        d = (v - (voices - 1) / 2) / ((voices - 1) / 2) * detune  # semitons
        fv = freq * 2 ** (d / 12)
        s = saw(fv, n, phase=r.random())
        pan = (v / (voices - 1)) * 2 - 1
        L += s * np.cos((pan + 1) * np.pi / 4)
        R += s * np.sin((pan + 1) * np.pi / 4)
    return np.vstack([L, R]) / voices


def stab(notes, length, cutoff=3800, seed_off=0):
    n = int(length * SR)
    sig = np.zeros((2, n))
    for i, m in enumerate(notes):
        sig += supersaw(midi_hz(m), n, seed_off=seed_off + i * 13)
    e = adsr(n, 0.003, 0.09, 0.45, 0.05)
    out = np.vstack([lp(sig[0], cutoff), lp(sig[1], cutoff)]) * e
    return out / len(notes) * 1.6


def bass_note(m, length):
    n = int(length * SR)
    f = midi_hz(m)
    s = 0.7 * saw(f, n) + 0.6 * np.sin(2 * np.pi * f * np.arange(n) / SR)
    s = lp(s, 420, order=4)
    e = adsr(n, 0.004, 0.05, 0.85, 0.03)
    return np.tanh(1.4 * s * e)


def pluck(m, length=0.22):
    n = int(length * SR)
    s = saw(midi_hz(m), n) + 0.5 * saw(midi_hz(m) * 1.005, n)
    s = sweep_lp(s, 6000, 500, curve=0.5)
    return s * env_exp(n, 0.11)


def riser(length, f0=200, f1=6000):
    n = int(length * SR)
    x = rng.standard_normal(n)
    x = sweep_lp(x, f0, f1, curve=1.5)
    x = hp(x, 150)
    t = np.arange(n) / SR
    tone_f = 220 * (8 ** (t / length))
    tone = 0.25 * np.sin(2 * np.pi * np.cumsum(tone_f) / SR)
    e = (t / length) ** 2.2
    s = (x / (np.max(np.abs(x)) + 1e-9) + tone) * e
    return s


def whoosh(length=0.42):
    """Swell reverso que termina exatamente no corte."""
    n = int(length * SR)
    x = rng.standard_normal(n)
    x = sweep_lp(x, 400, 9000, curve=1.0)
    t = np.arange(n) / SR
    e = (t / length) ** 3
    s = x * e
    return s / (np.max(np.abs(s)) + 1e-9)


def impact(length=2.6, sub=42):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = sub + 60 * np.exp(-t / 0.06)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.55)
    crash = hp(rng.standard_normal(n), 4000, order=4) * env_exp(n, 0.45) * 0.22
    s = np.tanh(1.3 * boom) + crash
    return s / (np.max(np.abs(s)) + 1e-9)


def pad(notes, length, cutoff=2400, release=None):
    n = int(length * SR)
    sig = np.zeros((2, n))
    for i, m in enumerate(notes):
        sig += supersaw(midi_hz(m), n, voices=5, detune=0.12, seed_off=500 + i)
    e = adsr(n, 0.01, 0.4, 0.55, length * 0.55 if release is None else release)
    out = np.vstack([lp(sig[0], cutoff), lp(sig[1], cutoff)]) * e
    return out / len(notes) * 1.4


# ---------------------------------------------------------------- loudness (BS.1770-4)
def k_weight(x):
    b1 = [1.53512485958697, -2.69169618940638, 1.19839281085285]
    a1 = [1.0, -1.69065929318241, 0.73248077421585]
    b2 = [1.0, -2.0, 1.0]
    a2 = [1.0, -1.99004745483398, 0.99007225036621]
    return lfilter(b2, a2, lfilter(b1, a1, x))


def lufs(L, R):
    kl, kr = k_weight(L), k_weight(R)
    blk, hop = int(0.4 * SR), int(0.1 * SR)
    pw = []
    for s in range(0, len(L) - blk + 1, hop):
        pw.append(np.mean(kl[s:s + blk] ** 2) + np.mean(kr[s:s + blk] ** 2))
    pw = np.array(pw)
    ld = -0.691 + 10 * np.log10(pw + 1e-12)
    g = pw[ld > -70]
    rel = -0.691 + 10 * np.log10(np.mean(g)) - 10
    g2 = pw[(ld > -70) & (ld > rel)]
    return -0.691 + 10 * np.log10(np.mean(g2))


def true_peak_db(L, R):
    from scipy.signal import resample_poly
    up = np.concatenate([resample_poly(L, 4, 1), resample_poly(R, 4, 1)])
    return 20 * np.log10(np.max(np.abs(up)) + 1e-12)


def limit(L, R, ceiling_db=-1.5):
    """Limitador transparente: look-ahead de 3 ms, ataque instantâneo, release de 60 ms.
    Só reduz ganho onde o sinal passaria do teto; abaixo disso o áudio fica intacto."""
    from scipy.ndimage import minimum_filter1d

    c = 10 ** (ceiling_db / 20)
    peak = np.maximum(np.abs(L), np.abs(R))
    need = np.minimum(1.0, c / (peak + 1e-12))
    la = int(0.003 * SR)
    need = minimum_filter1d(need, size=2 * la + 1)
    g = np.empty_like(need)
    rel = np.exp(-1 / (0.06 * SR))
    z = 1.0
    for i in range(len(need)):
        z = need[i] if need[i] < z else rel * z + (1 - rel) * need[i]
        g[i] = z
    return np.clip(L * g, -c, c), np.clip(R * g, -c, c)


def finalize(drums, bass, music, fx, pump, out_path, cuts, info_path, extra=None, ceiling_db=-1.5, tp_max=-1.0):
    """Mixa os barramentos, aplica fade/HPF, normaliza a -14 LUFS (pico real <= -1 dBTP) e grava."""
    mixL = drums.L * 0.95 + (bass.L * pump) * 0.9 + (music.L * pump) * 0.8 + fx.L * 0.8
    mixR = drums.R * 0.95 + (bass.R * pump) * 0.9 + (music.R * pump) * 0.8 + fx.R * 0.8

    # Fade final curto (cauda termina em 15,0 s)
    fade = np.ones(N)
    nf = int(0.35 * SR)
    fade[-nf:] = np.linspace(1, 0, nf) ** 1.5
    mixL *= fade
    mixR *= fade

    # Corrente DC / sub-sônico
    mixL = hp(mixL, 25)
    mixR = hp(mixR, 25)


    TARGET = -14.0
    L0, R0 = mixL, mixR
    # Busca o ganho de entrada (bisseção em dB) tal que a saída limitada fique em -14 LUFS
    lo_db, hi_db = -40.0, 40.0
    for it in range(30):
        mid = (lo_db + hi_db) / 2
        g = 10 ** (mid / 20)
        L, R = limit(L0 * g, R0 * g, ceiling_db)
        cur = lufs(L, R)
        if abs(cur - TARGET) < 0.03:
            break
        if cur < TARGET:
            lo_db = mid
        else:
            hi_db = mid
    # Garante pico real <= -1 dBTP (o oversampling pode revelar inter-sample peaks)
    tp = true_peak_db(L, R)
    if tp > tp_max:
        trim = 10 ** ((tp_max - 0.05 - tp) / 20)
        L, R = L * trim, R * trim
        tp = true_peak_db(L, R)
    final_lufs = lufs(L, R)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    import soundfile as sf  # noqa: E402

    sf.write(out_path, np.stack([L, R], axis=1), SR, subtype="PCM_24")

    report = {
        "file": os.path.relpath(out_path, ROOT),
        "seed": SEED,
        "bpm": BPM,
        "beat_s": BEAT,
        "bar_s": BAR,
        "duration_s": N / SR,
        "integrated_lufs": round(final_lufs, 2),
        "true_peak_dbtp": round(tp, 2),
        "scene_cuts_s": cuts,
    }
    if extra:
        report.update(extra)
    with open(info_path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(json.dumps(report, indent=2, ensure_ascii=False))

