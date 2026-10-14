---
workflow: general-video
flow: automation
storyboard: no
message: "Mercavejo: o melhor do marketing para o seu negócio — da estratégia ao estúdio."
destination: instagram-reels / tiktok / stories
aspect: 1080x1920
language: pt-BR
audience: donos de negócio e profissionais liberais de Catanduva e região que rolam o feed
length: 15s
angle: brand-sizzle (logo → manifesto → serviços → estúdio → portfólio → CTA)
fps: 60
---

## Intent

Peça promocional vertical de 15 s para Reels, Stories e TikTok. Logo no primeiro segundo, ela precisa provar que a Mercavejo é uma agência criativa de alto nível: motion design profissional, tipografia cinética, transições criativas e cortes no ritmo da música. O pedido foi "Capriche". Sem narração.

Conceito em uma frase: **a peça dourada do logo é o fio condutor do vídeo; ela monta a marca, corta as cenas no beat e volta para fechar a assinatura.**

## Assets

Todos foram copiados para `assets/`, e os muito grandes foram reduzidos. A origem de cada um está no BRAND.md.

- `assets/img/logo/mercavejo-simbolo.svg`: símbolo redesenhado em vetor a partir de `client/public/images/logo.png`. Abre e fecha o vídeo.
- `assets/img/portfolio/*.webp`: as 8 artes do portfólio do site. Entram na cena de prova.
- `assets/img/sites/*.webp`: capturas dos sites desenvolvidos (WebsiteProjects). Entram na cena de prova.
- `assets/img/clientes/*.webp`: logos de "Empresas que confiam na Mercavejo". Entram na cena de prova.
- `assets/img/estudio.webp`: foto real do Estúdio Mercavejo. Entra na cena do estúdio.
- `assets/audio/mercavejo-trilha.wav`: trilha original gerada por `scripts/make_music.py`.
- `assets/fonts/*.woff2`: Poppins e Inter, as fontes do site.
- `assets/vendor/gsap.min.js`: GSAP 3.14.2 local, porque o jsdelivr é bloqueado no Chrome headless deste ambiente.

## Customizations

- Trilha original por código (numpy + scipy, semente fixa `20090101`): 128 BPM, de modo que 15 s = 8 compassos exatos, em −14,0 LUFS integrado e −1,8 dBTP. Todos os cortes caem em beats: 1,875 · 4,6875 · 8,4375 · 10,3125 · 12,1875 s.
- O CTA "mercavejo.com.br" fica legível de ~12,5 s até 15,0 s (≥ 2,4 s).
- Busca no catálogo antes de construir efeitos (`npx hyperframes catalog --query …`). Adotados como base: `grain-overlay` (textura de filme), `headline-slam` (escala 1,6→1 em expo.out com tremor de 3 frames no impacto), `shimmer-sweep` (brilho no URL final) e o jitter RGB de `chromatic-aberration-wipe` (corte para o portfólio). A montagem do logo e as transições em paralelogramo foram feitas à mão: o catálogo (`logo-outro`, `logo-sting`, `directional-wipe`) não tem nada que use a geometria própria do símbolo.

## Notes — decisões e suposições (modo autônomo, sem perguntas)

1. **Rota:** `general-video` em modo automação. É uma peça de marca curta e multicena, sem captura de site (o site estava inacessível) e sem narração.
2. **Site ao vivo inacessível:** o proxy recusou mercavejo.com.br (403) e o WebFetch falhou com `ENOTFOUND`. Como o repositório é o código do site publicado, os textos e as cores dele foram tratados como os do site. Detalhes no BRAND.md.
3. **Slogan:** o site não tem um slogan rotulado. Usei o H1 do site, **"O Melhor do Marketing para seu Negócio"**, como frase-manifesto (cena 2), e o descritor do rodapé, **"Marketing & Estúdio"**, na assinatura. Nenhuma frase foi inventada.
4. **Serviços:** os nomes são os títulos reais de `Services.tsx`, encurtados para caber na tipografia cinética sem mudar o sentido. Mapeamento:
   - "Tráfego Pago" = Tráfego Pago
   - "Google Ads" = Configuração e lançamento de campanhas via Google ADS
   - "Redes Sociais" = Administração das redes sociais
   - "Criação de Sites" = Criação de sites (Land Pages, E-commerce)
   - "Vídeos Profissionais" = Edição e gravação de vídeos profissionais
   - "Artes & Logotipos" = Criação de artes, logotipos e vídeos
   - "Consultoria" = Consultoria especializada em Marketing / Consultoria de Vendas
   - "Marketing na Saúde" = Marketing na Saúde
5. **Wordmark:** não há arquivo de wordmark. O nome "MERCAVEJO" foi composto em Poppins 900, a fonte de display do site, ao lado do símbolo.
6. **Fontes:** Poppins + Inter são duas sans-serif. O guia de estilo do HyperFrames sugere evitar esse par e evitar as duas famílias, mas a regra do pedido ("use as fontes da marca") prevalece. O contraste vem do peso (900 contra 600) e da caixa (versal com tracking aberto nos rótulos).
7. **Cores:** o fundo-base é o `#012C47` do logo, para o vídeo abrir e fechar dentro da marca. `#0F3A7D` e `#20447D` (azuis do site) servem como painéis de ritmo, e `#D4B67B` é o único accent.
8. **Ficou de fora por falta de material ou de confiabilidade:**
   - **Terápico:** nenhum material na pasta nem na web.
   - **Depoimentos e números** (+200 clientes, 98%, +500% ROI etc.): a seção está oculta no site e usa avatar genérico.
   - **Preços e pacotes:** a seção foi removida do site.
   - **Prêmios:** não existem no material.
   - **Os vídeos `corte1.mp4` e `corte2.mp4`** (cortes de podcast, página Podcast): têm 14–22 MB e mostram pessoas reais. Em 15 s não sobra tempo útil para eles sem cortar falas no meio. A cena do estúdio usa a foto real do estúdio.
9. **Prova:** só trabalhos reais (artes, sites, logos de clientes e nomes de podcasts que estão no site). Nenhum número de resultado aparece.
10. **Safe zone do Reels:** todo texto importante fica entre y=220 e y=1600, com margem lateral ≥ 80 px. Títulos têm 96 px ou mais, e textos de apoio 34 px ou mais.
11. **Revisão final:** o pedido era autônomo e pedia o MP4 final. A prévia no Studio foi substituída por snapshots de todas as cenas, revisados antes do render (`build/review/`).
