#!/usr/bin/env python3
"""Trilha original da Mercavejo — 15,0 s, 128 BPM, gerada 100% por código.

Determinística (semente fixa). Estrutura em 8 compassos de 1,875 s = 15,0 s:

  compasso 1  (0,000–1,875)  gancho: 3 impactos no beat (montagem do logo) + riser
  compassos 2–5 (1,875–9,375) groove cheio: kick 4x4, palmas, hats, baixo, stabs, arpejo
  compasso 6  (9,375–11,25)  groove + arpejo dobrado
  compasso 6½–7 (11,25–12,1875) virada de caixa + riser até o drop final
  compassos 7–8 (12,1875–15,0) impacto, acorde final sustentado, kicks esparsos, cauda

Cortes de cena (todos em beat): 1,875 · 4,6875 · 8,4375 · 10,3125 · 12,1875.
Saída: assets/audio/mercavejo-trilha.wav (48 kHz, estéreo, 24-bit), normalizada a -14 LUFS
integrado com pico real ≤ -1 dBTP.

Uso:  build/.venv/bin/python scripts/make_music.py
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
DUR = 15.0
N = int(round(DUR * SR))
SEED = 20090101  # "Desde 2009"
rng = np.random.default_rng(SEED)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "audio", "mercavejo-trilha.wav")

CUTS = [1.875, 4.6875, 8.4375, 10.3125, 12.1875]


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


def pad(notes, length, cutoff=2400):
    n = int(length * SR)
    sig = np.zeros((2, n))
    for i, m in enumerate(notes):
        sig += supersaw(midi_hz(m), n, voices=5, detune=0.12, seed_off=500 + i)
    e = adsr(n, 0.01, 0.4, 0.55, length * 0.55)
    out = np.vstack([lp(sig[0], cutoff), lp(sig[1], cutoff)]) * e
    return out / len(notes) * 1.4


# ---------------------------------------------------------------- arranjo
drums, bass, music, fx = Bus(), Bus(), Bus(), Bus()

# Progressão em Lá menor: Am – F – C – G (i–VI–III–VII), um acorde por compasso
PROG = [
    (57, [69, 72, 76]),  # Am
    (53, [69, 72, 77]),  # F
    (48, [67, 72, 76]),  # C
    (55, [67, 71, 74]),  # G
]

K = kick()
C = clap()
SN = snare()
HC, HO = hat(False), hat(True)

# Compasso 1 — gancho: três impactos no 1, 2 e 3 (peças do logo), riser no 4
for b in (0, 1, 2):
    drums.add(K, t_of(b), 1.0)
    fx.add(impact(1.2, sub=48 - b * 2), t_of(b), 0.45)
    drums.add(C, t_of(b), 0.35 + 0.1 * b)
fx.add(riser(BEAT * 1.0, 300, 9000), t_of(3), 0.5)
drums.add(SN, t_of(3.5), 0.35)
drums.add(SN, t_of(3.75), 0.45)

# Compassos 2–6 (beats 4–23): groove cheio. A partir do beat 22 (10,3125) arpejo dobrado.
GROOVE_START, GROOVE_END = 4, 24
for b in range(GROOVE_START, GROOVE_END):
    drums.add(K, t_of(b), 1.0)
    if b % 2 == 1:
        drums.add(C, t_of(b), 0.55)
    drums.add(HO, t_of(b + 0.5), 0.22, pan=0.25)
    for s16 in (0.25, 0.75):
        drums.add(HC, t_of(b + s16), 0.12, pan=-0.3)

# Sidechain: envelope de "pump" disparado em cada kick
pump = np.ones(N)
kick_beats = list(range(0, 3)) + list(range(GROOVE_START, GROOVE_END)) + [26, 27, 28, 29, 30]
for b in kick_beats:
    i0 = int(round(t_of(b) * SR))
    L = int(0.22 * SR)
    seg = 1 - 0.75 * np.exp(-np.arange(L) / (0.06 * SR))
    pump[i0:i0 + L] = np.minimum(pump[i0:i0 + L], seg[: max(0, min(L, N - i0))])

# Baixo: colcheias no contratempo (house), seguindo a progressão
for b in range(GROOVE_START, GROOVE_END):
    bar_idx = (b // 4) % 4
    root = PROG[bar_idx][0] - 12
    bass.add(bass_note(root, BEAT * 0.45), t_of(b + 0.5), 0.55)
    if b % 4 == 3:
        bass.add(bass_note(root + 12, BEAT * 0.2), t_of(b + 0.75), 0.35)

# Stabs de supersaw: ritmo sincopado (1, 1.75, 2.5, 3.25 …) por compasso
STAB_POS = [0.0, 0.75, 1.5, 2.5, 3.25]
for bar in range(1, 6):  # compassos 2–6
    _, chord = PROG[(bar - 1) % 4]
    for p in STAB_POS:
        b = bar * 4 + p
        if b >= GROOVE_END:
            continue
        music.add(stab(chord, BEAT * 0.38, cutoff=3200 + 400 * bar, seed_off=int(b * 10)), t_of(b), 0.55)

# Arpejo pluck em semicolcheias (compasso 3 em diante), dobrado no compasso 6
ARP = [0, 1, 2, 1, 2, 0, 1, 2]
for b in range(8, GROOVE_END):
    bar_idx = (b // 4) % 4
    chord = PROG[bar_idx][1]
    steps = 4 if b >= 22 else 2
    for s in range(steps):
        note = chord[ARP[(b * steps + s) % len(ARP)]] + 12
        music.add(pluck(note, 0.2), t_of(b + s / steps), 0.18, pan=(-0.35 if s % 2 else 0.35))

# Whooshes que desembocam nos cortes internos
for c in CUTS[1:4]:
    fx.add(whoosh(0.42), c - 0.42, 0.32)
    fx.add(impact(0.9, sub=55), c, 0.22)

# Impacto no drop do compasso 2 (corte 1,875)
fx.add(impact(1.6, sub=44), CUTS[0], 0.55)

# Virada (beats 24–26, 11,25–12,1875): caixa acelerando + riser, groove sai
for i, b in enumerate(np.arange(24, 26, 0.25)):
    drums.add(SN, t_of(b), 0.25 + 0.06 * i)
drums.add(K, t_of(24), 0.9)
drums.add(K, t_of(25), 0.9)
fx.add(riser(BEAT * 2, 250, 11000), t_of(24), 0.55)

# Drop final (beat 26 = 12,1875): impacto + acorde sustentado + baixo longo
fx.add(impact(2.8, sub=40), t_of(26), 0.75)
music.add(pad([57, 64, 69, 72, 76, 83], DUR - t_of(26)), t_of(26), 0.9)
bass.add(bass_note(33, 2.4), t_of(26), 0.6)
for b in (26, 27, 28, 29, 30):
    drums.add(K, t_of(b), 0.85 if b < 30 else 0.7)
    if b in (27, 29):
        drums.add(C, t_of(b), 0.4)
    drums.add(HO, t_of(b + 0.5), 0.14, pan=0.25)
# Stab de assinatura no beat 30 (14,0625)
music.add(stab([69, 72, 76, 81], BEAT * 1.6, cutoff=5200, seed_off=999), t_of(30), 0.5)

# ---------------------------------------------------------------- mix
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


TARGET = -14.0
L0, R0 = mixL, mixR
# Busca o ganho de entrada (bisseção em dB) tal que a saída limitada fique em -14 LUFS
lo_db, hi_db = -40.0, 40.0
for it in range(30):
    mid = (lo_db + hi_db) / 2
    g = 10 ** (mid / 20)
    L, R = limit(L0 * g, R0 * g)
    cur = lufs(L, R)
    if abs(cur - TARGET) < 0.03:
        break
    if cur < TARGET:
        lo_db = mid
    else:
        hi_db = mid
# Garante pico real <= -1 dBTP (o oversampling pode revelar inter-sample peaks)
tp = true_peak_db(L, R)
if tp > -1.0:
    trim = 10 ** ((-1.05 - tp) / 20)
    L, R = L * trim, R * trim
    tp = true_peak_db(L, R)
final_lufs = lufs(L, R)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
import soundfile as sf  # noqa: E402

sf.write(OUT, np.stack([L, R], axis=1), SR, subtype="PCM_24")

report = {
    "file": os.path.relpath(OUT, ROOT),
    "seed": SEED,
    "bpm": BPM,
    "beat_s": BEAT,
    "bar_s": BAR,
    "duration_s": N / SR,
    "integrated_lufs": round(final_lufs, 2),
    "true_peak_dbtp": round(tp, 2),
    "scene_cuts_s": CUTS,
}
with open(os.path.join(ROOT, "assets", "audio", "trilha-info.json"), "w") as f:
    json.dump(report, f, indent=2, ensure_ascii=False)
print(json.dumps(report, indent=2, ensure_ascii=False))
