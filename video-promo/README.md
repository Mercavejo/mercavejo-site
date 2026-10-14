# Mercavejo — vídeo promocional 15 s (9:16)

`mercavejo-promo-15s.mp4`: 1080×1920, 60 fps, 15,0 s (900 frames), H.264 + AAC estéreo, áudio em −14 LUFS.
Feito com [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP renderizado para vídeo).

| Arquivo | O que é |
| --- | --- |
| `BRAND.md` | levantamento da marca, com a fonte de cada informação |
| `BRIEF.md` | intenção, decisões, suposições e o que ficou de fora |
| `DESIGN.md` | paleta, tipografia e regras de movimento |
| `STORYBOARD.md` | as 6 cenas, com tempos alinhados aos beats (128 BPM) |
| `index.html` | orquestrador: monta as cenas, as transições, o acabamento e a trilha |
| `compositions/` | uma sub-composição por cena (`s1`…`s6`) + `transicoes.html` + `acabamento.html` |
| `scripts/make_music.py` | gera a trilha original (numpy/scipy, semente fixa) |
| `assets/` | fontes `.woff2`, GSAP local, imagens reduzidas, trilha `.wav` |

## Renderizar de novo

Requisitos: Node 22+, FFmpeg e Chrome/Chromium. Dentro desta pasta:

```bash
# 1) (opcional) recriar a trilha — sai idêntica, porque a semente é fixa
python3 -m venv build/.venv
build/.venv/bin/pip install numpy==2.1.3 scipy==1.14.1 soundfile
build/.venv/bin/python scripts/make_music.py   # escreve assets/audio/mercavejo-trilha.wav

# 2) se o HyperFrames não achar o Chrome (ex.: ambiente com Playwright)
export PRODUCER_HEADLESS_SHELL_PATH=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux)/headless_shell
export HYPERFRAMES_BROWSER_PATH=$PRODUCER_HEADLESS_SHELL_PATH

# 3) validar (deve dar 0 erros) e renderizar
npx hyperframes@0.8.157 check
npx hyperframes@0.8.157 render -f 60 -q delivery -o mercavejo-promo-15s.mp4

# 4) conferir
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,duration -of compact mercavejo-promo-15s.mp4
```

Para ver e editar no navegador: `npx hyperframes@0.8.157 preview`.
Para capturar frames de revisão: `npx hyperframes@0.8.157 snapshot --at 1.4,3.9,6.0,9.8,11.6,14.5`.

## Editar

- **Textos:** estão direto no HTML de cada cena (`compositions/s*.html`).
- **Tempos:** cada cena usa `B = 60/128` (1 beat). Os cortes ficam em `index.html` (`data-start`/`data-duration`) e precisam continuar em múltiplos de 0,46875 s para seguir a música.
- **Trilha:** o arranjo está em `scripts/make_music.py` (progressão, viradas, impactos nos cortes). Depois de mudar, rode o script de novo.
- **Fontes:** o lint exige o `@font-face` dentro de cada sub-composição.
