---
workflow: general-video
flow: automation
storyboard: no
message: "Estúdio Mercavejo: o único estúdio de podcast profissional em uma agência de marketing — da gravação aos cortes e à publicação."
destination: instagram-reels / tiktok / stories
aspect: 1080x1920
language: pt-BR
audience: donos de negócio e profissionais liberais de Catanduva e região que rolam o feed
length: 30s  # versão atual; a de 15 s (agência) está no commit 7c29c7a
angle: estúdio (logo → manifesto do estúdio → foto → diferenciais → cortes reais → podcasts → produção completa → CTA)
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

---

## Versão 30 s — foco no estúdio de gravação (pedido de 14/10/2026)

Pedido: "aumentar o tempo do vídeo promocional para 30 segundos e focar no estúdio de gravação".

**Decisões e suposições**

1. **Arquivo novo, não sobrescrito:** `mercavejo-promo-30s.mp4`. O `mercavejo-promo-15s.mp4` foi mantido. O código-fonte da versão de 15 s (cenas de serviços e portfólio) saiu da árvore atual, mas continua no commit `7c29c7a`.
2. **Estrutura:** 16 compassos a 128 BPM = 30,0 s exatos, com cortes em 1,875 · 5,625 · 9,375 · 15,0 · 18,75 · 22,5 · 26,25 s (e trocas de card em 11,25 e 13,125).
3. **O gancho (logo) foi mantido** da versão anterior. Ele já prova o nível de motion design e apresenta a marca antes do estúdio.
4. **Todo o texto vem da página `/podcast` e do componente `Studio.tsx`** (ver BRAND.md § 9). Duas adaptações de layout, sem mudar o sentido:
   - O H1 foi quebrado em linhas: "O ÚNICO / ESTÚDIO / DE PODCAST / PROFISSIONAL / EM UMA AGÊNCIA / DE MARKETING".
   - A frase "1 episódio de 1 hora pode gerar até 10 vídeos curtos de alto impacto" virou contagem 1→10. "Um episódio" foi escrito como "1 episódio".
5. **Vídeos reais:** foram usados trechos de 4,2 s de `corte1.mp4` (a partir de 4 s) e `corte2.mp4` (a partir de 8 s), os mesmos publicados na seção "O Poder dos Cortes" do site. São trechos sem legenda queimada, **sem áudio** (só a trilha), reduzidos para 720×1280 em `assets/video/`.
6. **CTA do estúdio:** "Reservar meu Horário" (botão real da página) + mercavejo.com.br + WhatsApp (17) 99624-0418, legíveis de ~26,6 s a 30 s (≥ 3,3 s).
7. **Preço fora do vídeo:** a página mostra "Locação de Estúdio — R$ 400". Deixei o preço de fora, porque preço em anúncio envelhece rápido e depende de decisão comercial. Os itens do pacote entraram (microfones Shure/Rode, técnico de áudio, cenário e iluminação). É fácil incluir se quiserem.
8. **Trilha:** `scripts/make_music_30s.py` (mesma semente e mesmos instrumentos, agora em `scripts/trilha_base.py`). Tem breakdown na foto do estúdio, segundo drop nos cortes e drop final na assinatura.
9. **Loudness, ajuste técnico:** o render do HyperFrames atenuou a mix inteira em 1,7 dB quando a trilha tinha pico real de −1,4 dBTP (o MP4 saía com −15,8 LUFS). Isso foi confirmado em teste A/B: vídeos e `TMPDIR` não influenciavam; só o arquivo de áudio. A trilha de 30 s agora usa teto de −2,5 dBFS, e o MP4 final mede **−14,1 LUFS e −1,8 dBTP**.
10. **Ficou de fora:**
    - **Terápico:** continua sem material.
    - **Depoimentos e números:** a seção está oculta no site.
    - **Preço do estúdio:** ver item 7.
    - **O áudio original dos cortes:** a fala seria cortada no meio, e o vídeo não tem narração.

