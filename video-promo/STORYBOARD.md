---
format: 1080x1920
duration: 15s
fps: 60
message: "Mercavejo: o melhor do marketing para o seu negócio — da estratégia ao estúdio."
arc: Gancho (logo) → Manifesto → Serviços → Estúdio → Prova (portfólio) → Assinatura + CTA
audience: donos de negócio de Catanduva e região, no feed vertical
mode: autonomous
bpm: 128
beat: 0.46875s
bar: 1.875s
---

# Storyboard — Mercavejo 15 s (9:16)

Grade musical: 128 BPM, 8 compassos de 1,875 s. Todos os cortes acontecem em beats:
`1,875 (b4) · 4,6875 (b10) · 8,4375 (b18) · 10,3125 (b22) · 12,1875 (b26)`.

Camadas globais em `index.html`:

- `compositions/transicoes.html`, de 0 a 15 s, acima das cenas. Lâminas em paralelogramo a 60° (a peça dourada do logo), flashes e o anel de choque, cobrindo cada corte.
- Grão de filme (catálogo `grain-overlay`) + vinheta radial.
- `assets/audio/mercavejo-trilha.wav`, de 0 a 15 s.

## Frame 1 — Gancho: o logo se monta no beat

- scene: As 3 peças do símbolo batem uma por beat (0 · 0,47 · 0,94 s), "MERCAVEJO" cai letra a letra, a câmera mergulha na peça dourada
- duration: 1.875s
- poster: 1.45s
- transition_in: cut (abre o vídeo)
- status: animated
- src: compositions/s1-gancho.html
- blueprint: logo-assemble-lockup (variante "parts-arrive" + "CTA push-through"); regras kinetic-beat-slam, motion-blur-streak, spring-pop-entrance

Fundo navy `#012C47` com glow radial dourado. Beat 0: a peça branca em zigue-zague bate a 2,4× com flash branco e tremor de 3 frames. Beat 1: o paralelogramo dourado entra em diagonal pelo eixo de 60°, com rastro de movimento. Beat 2: o triângulo salta de baixo (back.out). Entre 1,0 e 1,35 s, "MERCAVEJO" (Poppins 900) cai letra a letra e "MARKETING & ESTÚDIO" é revelado por uma régua dourada. De 1,55 a 1,875 s, a câmera empurra para dentro da peça dourada, que ocupa a tela inteira e vira o fundo da cena 2.

## Frame 2 — Manifesto: "O Melhor do MARKETING para seu Negócio"

- scene: H1 real do site em tipografia cinética, uma palavra-bloco por beat, terminando no badge "Desde 2009 transformando negócios"
- duration: 2.8125s
- poster: 2.3s
- transition_in: push-through (a peça dourada vira o fundo)
- status: animated
- src: compositions/s2-manifesto.html
- blueprint: kinetic-type-beats; regras kinetic-beat-slam, scale-swap-transition

- b4 (1,875): o fundo é dourado e "O MELHOR DO" bate em navy.
- b5 (2,34): corte seco para navy, e "MARKETING" (dourado, ~215 px) entra estourando, com tremor e texto-fantasma.
- b6 (2,81): "PARA SEU" desliza da esquerda.
- b7 (3,28): "NEGÓCIO" (branco) sobe girando, e uma régua dourada desenha por baixo.
- b8 (3,75): as quatro linhas se reorganizam na frase completa, e o badge entra com mola.
- 4,45: lâmina dourada diagonal (overlay) para o corte.

## Frame 3 — Serviços: um serviço por beat

- scene: Âncora fixa "NOSSOS SERVIÇOS" + contador 01–08; o nome do serviço troca em corte seco a cada beat, cada um com uma entrada diferente
- duration: 3.75s
- poster: 1.2s
- transition_in: wipe (lâmina dourada a 60°)
- status: animated
- src: compositions/s3-servicos.html
- blueprint: fixed-anchor-cycle (âncora fixa + região que cicla); regras discrete-text-sequence, kinetic-beat-slam

Oito serviços reais, de 0,46875 s cada: Tráfego Pago · Google Ads · Redes Sociais · Criação de Sites · Vídeos Profissionais · Artes & Logotipos · Consultoria · Marketing na Saúde. O painel de fundo alterna navy / azul `#0F3A7D` / dourado no ritmo. Um número-fantasma gigante (01…08) desliza atrás, e a barra de progresso dourada avança por beat.

## Frame 4 — Estúdio Mercavejo

- scene: Foto real do estúdio revelada por máscara em paralelogramo, com push-in lento; "Estúdio Mercavejo", "EXCLUSIVIDADE EM CATANDUVA" e a faixa com os podcasts gravados
- duration: 1.875s
- poster: 1.1s
- transition_in: wipe (lâminas escalonadas dourado/azul/navy)
- status: animated
- src: compositions/s4-estudio.html
- blueprint: titlecard-reveal (adaptado: uma revelação + hold com Ken Burns); regras depth-of-field-blur, vertical-spring-ticker

## Frame 5 — Prova: Portfólio de Impacto

- scene: Mural 3D inclinado com as artes reais e capturas dos sites, em colunas que correm em sentidos opostos e aceleram até o drop; faixa "Empresas que confiam na Mercavejo" com os logos
- duration: 1.875s
- poster: 0.9s
- transition_in: glitch RGB + whip
- status: animated
- src: compositions/s5-portfolio.html
- blueprint: grid-card-assemble (mural que se monta + recuo de câmera); regras split-tilt-cards, chromatic-glitch

## Frame 6 — Assinatura + CTA

- scene: Flash branco e anel dourado no drop; as peças do logo convergem para o centro, MERCAVEJO + "Marketing & Estúdio", botão "Solicite um Orçamento" e "mercavejo.com.br" em destaque com brilho, mantido até o fim
- duration: 2.8125s
- poster: 2.2s
- transition_in: flash
- status: animated
- src: compositions/s6-assinatura.html
- blueprint: logo-assemble-lockup (Brand_Outro / CTA); regras spring-pop-entrance, gradient-text-sweep (shimmer)

O URL fica legível de ~12,5 s a 15,0 s. Em b30 (14,06) entra o stab final, com pulso sutil no botão e na peça dourada.
