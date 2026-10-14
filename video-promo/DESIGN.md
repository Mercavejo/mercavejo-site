# DESIGN.md — Sistema visual do vídeo

Derivado do logo e do CSS do site (ver BRAND.md). Não há manual de marca; este arquivo é a "verdade de design" das cenas.

## Conceito

**"A peça dourada abre caminho."** O paralelogramo dourado do símbolo (inclinado a 60°) é o motivo visual de todo o vídeo. Ele entra no gancho para montar o logo, vira lâmina de transição entre as cenas, sublinha palavras-chave e volta ao centro para fechar a assinatura. Os diagonais de todas as transições usam o mesmo ângulo de 60° do símbolo.

## Paleta (uma cor de destaque)

| Token | Hex | Uso |
| --- | --- | --- |
| `--navy` | `#012C47` | fundo-base (o mesmo do logo); abre e fecha o vídeo |
| `--blue` | `#0F3A7D` | painel de ritmo (cena de serviços) |
| `--blue-2` | `#20447D` | painel de ritmo, sombras de profundidade |
| `--ink` | `#0A192F` | fundo da faixa de clientes e vinheta |
| `--gold` | `#D4B67B` | único accent: palavras-chave, lâminas, CTA |
| `--gold-deep` | `#C9A36A` | sombra/variação do dourado |
| `--white` | `#FFFFFF` | texto principal sobre azul (peças brancas do logo) |

O texto fica branco ou dourado sobre azul e navy (`#012C47`) sobre dourado. Todas as combinações passam de WCAG AA para texto grande.

## Tipografia (fontes do site, `.woff2` locais)

- **Display:** Poppins 900/800, em caixa alta para impacto, com tracking −0,04em nos tamanhos grandes.
- **Rótulos e apoio:** Inter 600/700, em versal com tracking +0,18em para rótulos (≥ 34 px).
- **Tamanhos para o feed:** títulos ≥ 96 px (palavra-herói de 150 a 230 px), apoio ≥ 34 px.

## Grade e safe zone (1080×1920)

- Margem lateral de 80 px. O conteúdo importante fica entre **y=220 e y=1600**.
- Acima de 220 e abaixo de 1600 só entram decorativos: glow, grão, linhas e texto-fantasma.

## Camadas por cena

- **Fundo:** cor sólida + glow radial (dourado ou azul, 18–30%) + texto-fantasma gigante (6–10%) com deriva lenta.
- **Meio:** a mensagem (palavra, lista, foto, mural).
- **Frente:** réguas douradas que desenham em `scaleX`, contador/índice, faixas de paralelogramo.
- **Global:** grão de filme (`grain-overlay` do catálogo) e vinheta, por cima de tudo.

## Movimento

- 128 BPM: beat = 0,46875 s, compasso = 1,875 s. **Toda chegada importante acontece num beat.**
- Entradas de impacto: escala 1,6→1 com `expo.out` e tremor de 3 frames (receita `headline-slam` do catálogo).
- Eases variados por cena: `expo.out`, `back.out(1.7)`, `power4.inOut`, `steps` (nos glitches).
- Saídas rápidas (`power4.in`, 0,2–0,3 s) que deixam a lâmina dourada assumir o corte.
- Ambiente: glows respiram, texto-fantasma deriva, grão sempre ativo. Nenhum decorativo fica estático.

## Não fazer

- Gradiente linear de tela cheia sobre fundo escuro (faz banding em H.264); usar radial.
- Texto em gradiente, neon, ciano/roxo.
- Inventar números, clientes, depoimentos ou serviços.
