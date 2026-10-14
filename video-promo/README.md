# Mercavejo — vídeos promocionais (9:16)

| Arquivo | Versão | Especificação |
| --- | --- | --- |
| `mercavejo-promo-30s.mp4` | **atual**: 30 s com foco no Estúdio Mercavejo | 1080×1920, 60 fps, 1800 frames, H.264 + AAC, −14,1 LUFS |
| `mercavejo-promo-15s.mp4` | anterior: 15 s, agência (serviços + portfólio) | 1080×1920, 60 fps, 900 frames, −14,1 LUFS |

O projeto renderiza a versão de 30 s. O código da versão de 15 s está no commit `7c29c7a`; para renderizá-la, faça `git checkout 7c29c7a -- video-promo/index.html video-promo/compositions`.

Feito com [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP renderizado para vídeo).

| Arquivo | O que é |
| --- | --- |
| `BRAND.md` | levantamento da marca e do estúdio, com a fonte de cada informação |
| `BRIEF.md` | intenção, decisões, suposições e o que ficou de fora (as duas versões) |
| `DESIGN.md` | paleta, tipografia e regras de movimento |
| `STORYBOARD.md` | as 8 cenas da versão de 30 s, com tempos alinhados aos beats (128 BPM) |
| `index.html` | orquestrador: cenas, transições, acabamento e trilha |
| `compositions/` | `s1-gancho`, `e2`…`e8` (uma por cena), `transicoes-30.html`, `acabamento.html` |
| `scripts/trilha_base.py` | instrumentos sintetizados, mix e loudness (semente fixa) |
| `scripts/make_music_30s.py` / `make_music.py` | arranjos de 30 s e de 15 s |
| `assets/` | fontes `.woff2`, GSAP local, imagens, trechos de vídeo dos cortes e trilhas `.wav` |

## Renderizar de novo

Requisitos: Node 22+, FFmpeg e Chrome/Chromium. Dentro desta pasta:

```bash
# 1) (opcional) recriar as trilhas — saem idênticas, porque a semente é fixa
python3 -m venv build/.venv
build/.venv/bin/pip install numpy==2.1.3 scipy==1.14.1 soundfile
build/.venv/bin/python scripts/make_music_30s.py   # assets/audio/mercavejo-trilha-30s.wav
build/.venv/bin/python scripts/make_music.py       # assets/audio/mercavejo-trilha.wav (15 s)

# 2) se o HyperFrames não achar o Chrome (ex.: ambiente com Playwright)
export PRODUCER_HEADLESS_SHELL_PATH=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux)/headless_shell
export HYPERFRAMES_BROWSER_PATH=$PRODUCER_HEADLESS_SHELL_PATH

# 3) validar (deve dar 0 erros) e renderizar
npx hyperframes@0.8.157 check
npx hyperframes@0.8.157 render -f 60 -q delivery -o mercavejo-promo-30s.mp4

# 4) conferir
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,duration -of compact mercavejo-promo-30s.mp4
ffmpeg -nostats -i mercavejo-promo-30s.mp4 -af ebur128=peak=true:framelog=quiet -f null - 2>&1 | grep -E "I:|Peak:"
```

Para ver e editar no navegador: `npx hyperframes@0.8.157 preview`.

## Editar

- **Textos:** estão direto no HTML de cada cena (`compositions/*.html`).
- **Tempos:** `B = 60/128` (1 beat). Os cortes ficam em `index.html` e precisam continuar em múltiplos de 0,46875 s para seguir a música.
- **Trilha:** mantenha o pico real abaixo de ~−1,5 dBTP. Acima disso, o render do HyperFrames atenua a mix inteira (por isso a de 30 s usa teto de −2,5 dBFS; detalhes no BRIEF.md).
- **Vídeos dos cortes:** os trechos em `assets/video/` foram gerados assim: `ffmpeg -ss 4 -t 4.2 -i ../client/public/images/corte1.mp4 -an -vf scale=720:1280,fps=30 -c:v libx264 -crf 20 assets/video/corte1-trecho.mp4` (corte2: `-ss 8`).
- **Fontes:** o lint exige o `@font-face` dentro de cada sub-composição.
