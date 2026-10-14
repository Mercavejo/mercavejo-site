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
(instrumentos, mix e loudness ficam em scripts/trilha_base.py)
"""
import os
import sys

os.environ["TRILHA_DUR"] = "15.0"
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from trilha_base import *  # noqa: E402,F401,F403

OUT = os.path.join(ROOT, "assets", "audio", "mercavejo-trilha.wav")
CUTS = [1.875, 4.6875, 8.4375, 10.3125, 12.1875]

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

finalize(drums, bass, music, fx, pump, OUT, CUTS, os.path.join(ROOT, "assets", "audio", "trilha-info.json"))
