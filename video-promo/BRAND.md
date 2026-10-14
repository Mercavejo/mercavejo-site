# BRAND.md — Levantamento da marca Mercavejo

Levantamento feito em 14/10/2026, antes de qualquer criação. Cada item cita a fonte.

**Fontes consultadas**

- **Pasta mercavejo** (este repositório, `mercavejo-site`): é o código-fonte do site mercavejo.com.br (React + Vite, deploy na Vercel). Textos, cores, fontes e imagens vieram daqui.
- **mercavejo.com.br ao vivo:** **não foi possível acessar.** O proxy do ambiente recusou a conexão (`CONNECT 403`, política de rede) e a ferramenta de busca de páginas falhou com `ENOTFOUND`. Como o repositório é o próprio código do site (o `canonical` em `client/index.html` aponta para `https://mercavejo.com.br/`), os textos abaixo são os mesmos que o site publica. Não houve verificação visual da versão no ar.
- **Manual de marca:** nenhum foi encontrado na pasta.
- **Terápico:** nenhuma menção, imagem ou arquivo na pasta. Uma busca na web (`Terápico plataforma Mercavejo`) também não trouxe resultado relevante. **Ficou de fora.**

---

## 1. Identidade

| Item | Valor | Fonte |
| --- | --- | --- |
| Nome | Mercavejo | `client/index.html` (`<title>`, JSON-LD `name`) |
| Razão social | Mercavejo Marketing Direto LTDA | dado fornecido no pedido (não consta no código) |
| Descritor | "Marketing & Estúdio" | `client/src/components/Footer.tsx` |
| Tipo | `MarketingAgency` | JSON-LD em `client/index.html` |
| Cidade | Catanduva - SP | `Footer.tsx`, JSON-LD (`addressLocality`) |
| Desde | "Desde 2009 transformando negócios" | `client/src/components/Hero.tsx` (badge) |
| Horário | Seg–Sex 08:00–18:00 | JSON-LD `openingHours` |

## 2. Frases de destaque (texto exato)

| Frase | Onde aparece |
| --- | --- |
| **"O Melhor do Marketing para seu Negócio"** | `Hero.tsx`, título H1 (com "Marketing" em dourado) |
| "Planejamos, criamos e executamos estratégias digitais que geram leads e aumentam sua receita. Com estúdio de podcast, tráfego pago e muito mais." | `Hero.tsx`, parágrafo |
| "Desde 2009 transformando negócios" | `Hero.tsx`, badge |
| "Transforme seu negócio com estratégias digitais que geram resultados reais." | `client/index.html`, og/twitter description |
| "Soluções estratégicas desenhadas para escalar seu negócio no ambiente digital." | `Services.tsx` |
| "Portfólio de Impacto" / "Transformando marcas através de design estratégico e gestão de alta performance." | `Portfolio.tsx` |
| "Empresas que confiam na Mercavejo" | `Clients.tsx` |
| "Estúdio Mercavejo" / "Exclusividade em Catanduva" | `Studio.tsx` |
| "A única agência da região com estrutura própria de gravação para elevar o nível do seu posicionamento." | `Studio.tsx` |
| "O Único Estúdio de Podcast Profissional em uma Agência de Marketing" | `client/src/pages/Podcast.tsx` |
| "Estamos prontos para elevar o nível do seu negócio." | `Contact.tsx` |
| "Feito com estratégia." | `Footer.tsx` (rodapé) |
| CTAs: "Solicite um Orçamento", "Conheça Nossos Serviços", "Fale Conosco" | `Hero.tsx`, `Header.tsx` |

**Slogan oficial:** não existe um slogan rotulado como tal. A frase mais forte e mais visível do site é o H1 **"O Melhor do Marketing para seu Negócio"**, que funciona como slogan de fato. Ver a decisão no BRIEF.md.

## 3. Serviços (títulos exatos, `client/src/components/Services.tsx`)

1. Consultoria especializada em Marketing
2. Administração das redes sociais
3. Marketing na Saúde (card em destaque)
4. Criação de artes, logotipos e vídeos
5. Edição e gravação de vídeos profissionais
6. Consultoria de Vendas
7. Configuração e lançamento de campanhas via Google ADS
8. Tráfego Pago
9. Criação de sites (Land Pages, E-commerce)

Além disso, há o **Estúdio de Podcast** (`Studio.tsx`, `pages/Podcast.tsx`), com estes textos: "Áudio Cristalino", "Vídeo em 4K", "Foco em Cortes" e "O Poder dos Cortes".

## 4. Prova: trabalhos e clientes reais

- **Portfólio (artes)**, em `Portfolio.tsx` com imagens em `client/public/images/`: Exonline, Optica Brasil, Sublime, Vox Fm (Design); Faveni, Netflex, Rio Fibra, Açougue Scoz (Social Media).
- **Clientes (logos)**, em `Clients.tsx`: Exonline, Fidelidade, Optica, Luciana, Riofibra, Netflex, Scoz, Vox.
- **Sites desenvolvidos**, em `WebsiteProjects.tsx` com capturas em `client/public/images/projects/`: Daniel Devitto Zákia, Café Com Zákia, MMRH (site e app), Mateus Casarini, C&C Vida e Negócio, Andre Borghi Advocacia.
- **Podcasts gravados no estúdio** ("Podcasts de Sucesso:", em `Studio.tsx`): Treina que sara, Antes da consulta, Café com Zakia, Sai do raso, Gente amiga.
- **Foto do estúdio:** `client/public/images/Estúdio.webp`.

**Não usados por falta de confiabilidade:** a seção `Testimonials.tsx` traz depoimentos ("Dr. Ricardo Almeida", "Marina Costa", "Carlos Eduardo") e números ("+200 Clientes Atendidos", "15+ Anos", "98% Satisfação", "+500% ROI Médio"), mas está **oculta no site** (`Home.tsx`: "Depoimentos oculto temporariamente"; commit `d1d8c9a chore: temporarily hide testimonials section`) e usa avatar genérico. Como não estão publicados, ficaram de fora. Os preços de pacotes também ficaram de fora: a seção foi removida do site (commit `6efde27`).

## 5. Cores

| Papel | Hex | Fonte |
| --- | --- | --- |
| Azul-marinho do logo (fundo do símbolo) | `#012C47` | pixel amostrado em `client/public/images/logo.png` |
| Dourado (accent) | `#D4B67B` | `logo.png` (peça dourada) e `#d4b67b` usado em todo o site |
| Azul primário do site | `#0F3A7D` | `Hero.tsx`, `Header.tsx`, `theme-color` em `index.html`, `ideas.md` |
| Azul das seções | `#20447D` | `Home.tsx` ("novo azul #20447D") |
| Azul-noite (faixa de clientes) | `#0A192F` | `Clients.tsx` |
| Branco | `#FFFFFF` | peças brancas do logo |
| Dourado hover | `#C9A36A` | `Hero.tsx` (hover do CTA) |

`ideas.md` resume a escolha: "Azul escuro (#0F3A7D) … confiança, profissionalismo" e "Amarelo claro (#d4b67b) … energia, criatividade, destaque de CTAs".

## 6. Tipografia

- **Poppins**, para display (800) e títulos (700): `client/index.html` (Google Fonts) e `client/src/index.css` (`.font-display` 800, `h1–h6` 700).
- **Inter**, para corpo (400–700): `index.css` (`body`).
- No vídeo, os arquivos `.woff2` vêm dos pacotes npm `@fontsource/poppins@5.3.0` e `@fontsource/inter@5.3.0` (licença SIL OFL, copiada em `assets/fonts/`).

## 7. Logo

- `client/public/images/logo.png` e `logo.webp` (1080×1920, símbolo centralizado sobre `#012C47`). É um monograma geométrico de 3 peças: uma forma branca em zigue-zague, um paralelogramo dourado inclinado a 60° e um triângulo branco.
- Não existe arquivo de wordmark. No site, o nome "Mercavejo" aparece digitado em texto (`Footer.tsx`).
- No vídeo, o símbolo foi **redesenhado em SVG** sobre as mesmas coordenadas (`assets/img/logo/mercavejo-simbolo.svg`), para animar cada peça. A sobreposição com o PNG original cobre 97% dos pixels; a diferença fica só no arredondamento das bordas (imagem de diferença gerada localmente em `build/review/logo-diff.png`, fora do git). O original foi copiado em `assets/img/logo/logo-original.png`.

## 8. Contatos e redes

| Canal | Valor | Fonte |
| --- | --- | --- |
| Site | mercavejo.com.br | `index.html` (canonical) |
| Telefone/WhatsApp | (17) 99624-0418 | `Footer.tsx`, `Contact.tsx`, JSON-LD |
| E-mail | clubemercavejo@gmail.com | `Footer.tsx`, JSON-LD |
| Instagram | instagram.com/mercavejo_consultoria | `Footer.tsx`, JSON-LD `sameAs` |
| Facebook | facebook.com/mercavejobrasilmarketing | `Footer.tsx`, JSON-LD `sameAs` |
