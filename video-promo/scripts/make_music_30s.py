#!/usr/bin/env python3
"""Trilha original da Mercavejo — versão 30,0 s (foco no estúdio), 128 BPM, gerada 100% por código.

16 compassos de 1,875 s = 30,0 s. Cada seção acompanha uma cena do vídeo:

  b0–3    (0,00–1,875)   gancho: 3 impactos no beat (montagem do logo) + riser
  b4–11   (1,875–5,625)  manifesto do estúdio: groove cheio
  b12–19  (5,625–9,375)  foto do estúdio: breakdown (meio-tempo, pad, arpejo filtrado) + riser
  b20–31  (9,375–15,0)   diferenciais (3 cards): groove cheio + arpejo; impacto em cada card
  b32–39  (15,0–18,75)   o poder dos cortes: segundo drop, hats abertos dobrados, arpejo dobrado
  b40–47  (18,75–22,5)   podcasts de sucesso: groove
  b48–55  (22,5–26,25)   produção completa: groove; virada de caixa + riser nos 2 últimos beats
  b56–63  (26,25–30,0)   assinatura: impacto, acorde sustentado, kicks, stab final e cauda

Cortes de cena (todos em beat): 1,875 · 5,625 · 9,375 · 15,0 · 18,75 · 22,5 · 26,25
(+ trocas de card em 11,25 e 13,125). Saída: assets/audio/mercavejo-trilha-30s.wav, -14 LUFS.

Uso:  build/.venv/bin/python scripts/make_music_30s.py
"""
import os
import sys

os.environ["TRILHA_DUR"] = "30.0"
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from trilha_base import *  # noqa: E402,F401,F403

OUT = os.path.join(ROOT, "assets", "audio", "mercavejo-trilha-30s.wav")
CUT_BEATS = [4, 12, 20, 32, 40, 48, 56]
CARD_BEATS = [24, 28]
CUTS = [b * BEAT for b in CUT_BEATS]

drums, bass, music, fx = Bus(), Bus(), Bus(), Bus()

# Lá menor: Am – F – C – G, um acorde por compasso
PROG = [
    (57, [69, 72, 76]),
    (53, [69, 72, 77]),
    (48, [67, 72, 76]),
    (55, [67, 71, 74]),
]

K = kick()
C = clap()
SN = snare()
HC, HO = hat(False), hat(True)

kick_beats = []


def chord_at(b):
    return PROG[(int(b) // 4) % 4]


def groove(b0, b1, hats_dobrados=False, arp_steps=2, stabs=True, arp=True):
    """Groove cheio entre os beats [b0, b1)."""
    for b in range(b0, b1):
        drums.add(K, t_of(b), 1.0)
        kick_beats.append(b)
        if b % 2 == 1:
            drums.add(C, t_of(b), 0.55)
        drums.add(HO, t_of(b + 0.5), 0.22, pan=0.25)
        for s16 in (0.25, 0.75):
            drums.add(HC, t_of(b + s16), 0.12, pan=-0.3)
        if hats_dobrados:
            drums.add(HO, t_of(b + 0.25), 0.1, pan=-0.4)
        root = chord_at(b)[0] - 12
        bass.add(bass_note(root, BEAT * 0.45), t_of(b + 0.5), 0.55)
        if b % 4 == 3:
            bass.add(bass_note(root + 12, BEAT * 0.2), t_of(b + 0.75), 0.35)
        if arp:
            chord = chord_at(b)[1]
            for s in range(arp_steps):
                note = chord[[0, 1, 2, 1, 2, 0, 1, 2][(b * arp_steps + s) % 8]] + 12
                music.add(pluck(note, 0.2), t_of(b + s / arp_steps), 0.18, pan=(-0.35 if s % 2 else 0.35))
    if stabs:
        for bar_start in range(b0 - b0 % 4, b1, 4):
            chord = chord_at(bar_start)[1]
            for p in [0.0, 0.75, 1.5, 2.5, 3.25]:
                b = bar_start + p
                if b0 <= b < b1:
                    music.add(stab(chord, BEAT * 0.38, cutoff=3600, seed_off=int(b * 10)), t_of(b), 0.55)


# ---- b0–3: gancho (idêntico ao da versão 15 s)
for b in (0, 1, 2):
    drums.add(K, t_of(b), 1.0)
    kick_beats.append(b)
    fx.add(impact(1.2, sub=48 - b * 2), t_of(b), 0.45)
    drums.add(C, t_of(b), 0.35 + 0.1 * b)
fx.add(riser(BEAT * 1.0, 300, 9000), t_of(3), 0.5)
drums.add(SN, t_of(3.5), 0.35)
drums.add(SN, t_of(3.75), 0.45)
fx.add(impact(1.6, sub=44), t_of(4), 0.55)

# ---- b4–11: manifesto
groove(4, 12, arp=False)

# ---- b12–19: breakdown na foto do estúdio — meio-tempo, pad e arpejo
for b in range(12, 20, 2):
    drums.add(K, t_of(b), 0.85)
    kick_beats.append(b)
    drums.add(C, t_of(b + 1), 0.4)
for b in range(12, 20):
    drums.add(HC, t_of(b + 0.5), 0.1, pan=0.3)
music.add(pad([57, 64, 69, 72, 76], BAR * 1.0), t_of(12), 0.55)
music.add(pad([53, 60, 65, 69, 72], BAR * 1.0), t_of(16), 0.55)
for b in range(12, 20):
    chord = chord_at(b)[1]
    for s in range(2):
        note = chord[[0, 2, 1, 2][(b * 2 + s) % 4]] + 12
        music.add(pluck(note, 0.24), t_of(b + s / 2), 0.15, pan=(-0.3 if s else 0.3))
for b in range(16, 20):
    bass.add(bass_note(chord_at(b)[0] - 12, BEAT * 0.9), t_of(b), 0.4)
fx.add(riser(BEAT * 2, 250, 10000), t_of(18), 0.5)
for i, b in enumerate(np.arange(19, 20, 0.25)):
    drums.add(SN, t_of(b), 0.25 + 0.07 * i)

# ---- b20–31: diferenciais (3 cards)
groove(20, 32)
for cb in CARD_BEATS:
    fx.add(impact(0.9, sub=55), t_of(cb), 0.25)
    fx.add(whoosh(0.3), t_of(cb) - 0.3, 0.25)

# ---- b32–39: o poder dos cortes — segundo drop, mais energia
fx.add(impact(1.8, sub=42), t_of(32), 0.6)
groove(32, 40, hats_dobrados=True, arp_steps=4)

# ---- b40–47: podcasts de sucesso
groove(40, 48)

# ---- b48–55: produção completa + virada
groove(48, 54)
for i, b in enumerate(np.arange(54, 56, 0.25)):
    drums.add(SN, t_of(b), 0.25 + 0.06 * i)
drums.add(K, t_of(54), 0.9)
drums.add(K, t_of(55), 0.9)
kick_beats += [54, 55]
fx.add(riser(BEAT * 2, 250, 11000), t_of(54), 0.55)

# ---- b56–63: assinatura
fx.add(impact(2.8, sub=40), t_of(56), 0.75)
music.add(pad([57, 64, 69, 72, 76, 83], DUR - t_of(56), release=0.9), t_of(56), 0.9)
# kick suave e hat até o fim, para a trilha não "morrer" sob o CTA
for b in (62, 63):
    drums.add(K, t_of(b), 0.5)
    kick_beats.append(b)
    drums.add(HO, t_of(b + 0.5), 0.1, pan=0.25)
bass.add(bass_note(33, 2.6), t_of(56), 0.6)
for b in (56, 57, 58, 59, 60, 61):
    drums.add(K, t_of(b), 0.85 if b < 60 else 0.7)
    kick_beats.append(b)
    if b in (57, 59, 61):
        drums.add(C, t_of(b), 0.4)
    drums.add(HO, t_of(b + 0.5), 0.14, pan=0.25)
music.add(stab([69, 72, 76, 81], BEAT * 1.6, cutoff=5200, seed_off=999), t_of(60), 0.5)

# ---- whooshes + impactos nos cortes internos
for cb in (12, 20, 40, 48):
    fx.add(whoosh(0.42), t_of(cb) - 0.42, 0.32)
    fx.add(impact(0.9, sub=55), t_of(cb), 0.22)
fx.add(whoosh(0.42), t_of(32) - 0.42, 0.3)

# ---- sidechain
pump = np.ones(N)
for b in kick_beats:
    i0 = int(round(t_of(b) * SR))
    Lk = int(0.22 * SR)
    seg = 1 - 0.75 * np.exp(-np.arange(Lk) / (0.06 * SR))
    pump[i0:i0 + Lk] = np.minimum(pump[i0:i0 + Lk], seg[: max(0, min(Lk, N - i0))])

finalize(
    drums, bass, music, fx, pump, OUT, CUTS,
    os.path.join(ROOT, "assets", "audio", "trilha-30s-info.json"),
    extra={"card_changes_s": [b * BEAT for b in CARD_BEATS], "bars": 16},
    # Teto mais baixo: o render do HyperFrames atenua a mix inteira quando o pico real
    # passa de ~-1,5 dBTP (medido neste projeto). Com -2,5 dBFS de teto, -14 LUFS chega intacto.
    ceiling_db=-2.5,
    tp_max=-2.0,
)
