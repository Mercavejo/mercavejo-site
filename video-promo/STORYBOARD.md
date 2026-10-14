---
format: 1080x1920
duration: 30s
fps: 60
message: "Estúdio Mercavejo: o único estúdio de podcast profissional em uma agência de marketing — da gravação aos cortes e à publicação."
arc: Gancho (logo) → Manifesto do estúdio → O estúdio → Diferenciais → Prova (cortes reais) → Podcasts → Produção completa → CTA
audience: profissionais, médicos, empresários e criadores de Catanduva e região, no feed vertical
mode: autonomous
bpm: 128
beat: 0.46875s
bar: 1.875s
---

# Storyboard — Mercavejo 30 s, foco no estúdio (9:16)

Grade musical: 128 BPM, 16 compassos de 1,875 s. Cortes em beat:
`1,875 (b4) · 5,625 (b12) · 9,375 (b20) · 15,0 (b32) · 18,75 (b40) · 22,5 (b48) · 26,25 (b56)`, com trocas de card em 11,25 (b24) e 13,125 (b28).

Camadas globais em `index.html`:

- `compositions/transicoes-30.html`: lâminas em paralelogramo a 60° (a peça dourada do logo), glitch RGB, flash e anel de choque.
- `compositions/acabamento.html`: vinheta + grão de filme (catálogo `grain-overlay`).
- `assets/audio/mercavejo-trilha-30s.wav`, de 0 a 30 s.

A versão de 15 s (agência) está no commit `7c29c7a`.

## Frame 1 — Gancho: o logo se monta no beat

- scene: As 3 peças do símbolo batem uma por beat, "MERCAVEJO" cai letra a letra e a câmera mergulha na peça dourada
- duration: 1.875s
- transition_in: cut
- status: animated
- src: compositions/s1-gancho.html
- blueprint: logo-assemble-lockup; regras kinetic-beat-slam, motion-blur-streak, spring-pop-entrance

## Frame 2 — Manifesto do estúdio

- scene: "O ÚNICO / ESTÚDIO / DE PODCAST / PROFISSIONAL / EM UMA AGÊNCIA / DE MARKETING", uma palavra-bloco por beat sobre uma onda de áudio gigante; termina no selo "EXCLUSIVIDADE EM CATANDUVA"
- duration: 3.75s
- transition_in: push-through (mergulho dourado)
- status: animated
- src: compositions/e2-manifesto.html
- blueprint: kinetic-type-beats; regras kinetic-beat-slam

## Frame 3 — O estúdio

- scene: Foto real do estúdio revelada por máscara a 60° com Ken Burns; "HUB DE CONTEÚDO / Estúdio Mercavejo" e depois "conversas / em autoridade / e vendas." (breakdown da trilha)
- duration: 3.75s
- transition_in: wipe (lâmina dourada)
- status: animated
- src: compositions/e3-estudio.html
- blueprint: titlecard-reveal (adaptado: revelação + hold com Ken Burns + troca de fase no b4)

## Frame 4 — Por que gravar no Estúdio Mercavejo?

- scene: Âncora fixa com a pergunta real + contador 01–03; três cards de 1 compasso cada (Áudio Cristalino, Vídeo em 4K, Foco em Cortes), com ícones que se desenham, descrição real e chips com itens reais dos pacotes
- duration: 5.625s
- transition_in: wipe (3 lâminas escalonadas)
- status: animated
- src: compositions/e4-diferenciais.html
- blueprint: fixed-anchor-cycle; regras svg-path-draw, spring-pop-entrance

## Frame 5 — O Poder dos Cortes (prova)

- scene: Dois celulares inclinados exibindo cortes reais gravados no estúdio (Reels/TikTok, YouTube Shorts) e a contagem "1 EPISÓDIO DE 1 HORA PODE GERAR ATÉ 10 vídeos curtos de alto impacto" (segundo drop)
- duration: 3.75s
- transition_in: glitch RGB + flash
- status: animated
- src: compositions/e5-cortes.html
- blueprint: video-text-pivot (adaptado) + dataviz-countup; regras split-tilt-cards, counting-dynamic-scale

## Frame 6 — Podcasts de Sucesso

- scene: Os 5 podcasts reais entram em linhas alternadas; uma faixa dourada "no ar" percorre a lista
- duration: 3.75s
- transition_in: wipe (lâminas azul e dourada)
- status: animated
- src: compositions/e6-podcasts.html
- blueprint: grid-card-assemble (lista vertical que acumula)

## Frame 7 — Produção Completa

- scene: Pacote real "PRODUÇÃO COMPLETA"; "Nós cuidamos de tudo, do roteiro à publicação final." e um checklist de 5 itens, um por beat; virada de caixa no fim
- duration: 3.75s
- transition_in: wipe (lâminas navy e dourada)
- status: animated
- src: compositions/e7-producao.html
- blueprint: grid-card-assemble (checklist); regras svg-path-draw

## Frame 8 — Assinatura + CTA do estúdio

- scene: Flash e anel dourado no drop; logo, MERCAVEJO, "Marketing & Estúdio", botão "Reservar meu Horário", mercavejo.com.br com brilho e WhatsApp (17) 99624-0418
- duration: 3.75s
- transition_in: flash
- status: animated
- src: compositions/e8-assinatura.html
- blueprint: logo-assemble-lockup (Brand_Outro / CTA)
