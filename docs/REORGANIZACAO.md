# Relatório da reorganização

> Histórico da migração anterior para CSS Modules. A estrutura vigente está no [README](../README.md); a migração posterior para `src` está em [ALTERACOES-SRC.md](ALTERACOES-SRC.md). Os caminhos antigos abaixo descrevem aquele momento.

## Resultado e estrutura final

O projeto foi reorganizado por funcionalidade, mantendo app/ na raiz e as URLs existentes. 36 CSS Modules substituem as folhas genéricas de componentes e telas. O CSS global passou de 2005 para 117 linhas. Não foram adicionadas dependências, nem alterados assets, ambiente, contratos da API ou o proxy administrativo.

```text
app/                              Rotas, layout raiz, endpoint, fonts e globals.css
components/layout/                Header, Logo e seus CSS Modules
components/ui/                    CenterSwipeCarousel e receitas de estilo
features/campaign/                CampaignPage, RegulationPage e WinnersPage
  components/                     Seções visuais e seus CSS Modules
  context/                        ConsultationProvider
  model/                          campaign, participation e consult
  services/                       consultationService
features/contacts/                components e model dos canais oficiais
features/dashboard/               ClientPage, componentes e seus CSS Modules
features/demo/                    DemoAdminPage e model/demoFixtures
features/admin/                   AdminLockedPage e model/adminTypes
public/                           Recursos preservados
tests/                            Contratos, serviço e CSS
docs/                             CSS.md, CAMPANHA.md e este relatório
```

## Auditoria CSS

As folhas originais foram lidas e analisadas em árvore CSS. A migração inicial identificou 227 ramos de seletores sem correspondência no JSX atual, como sidebar, hero antigo, histórico de origens, resumo de campanha não renderizado e modificadores antigos. Foram eliminadas também 40 declarações que já eram sobrescritas para o mesmo seletor, propriedade e condição. Regras contextuais de receitas compartilhadas foram devolvidas aos componentes responsáveis.

| Origem | Linhas originais | Destino/decisão |
| --- | --- | --- |
| `app/globals.css` | 2005 | Tokens/reset/documento em app/globals.css; componentes distribuídos entre layout, UI, campanha e dashboard. |
| `app/dashboard.css` | 895 | ClientPage, ClientHero, cartões, NumbersModal, HelpBand e receitas comuns de cartão/grade. |
| `app/demo.css` | 1 | DemoAdminPage.module.css. |
| `app/artwork.css` | 69 | ClientHero, PrizeBanner e HistoryBand; seletores sem consumidores foram descartados. |
| `app/campaign-sections.css` | 144 | CampaignActions.module.css. |
| `app/hero-polish.css` | 177 | Regras da antiga interface .hero, sem elemento correspondente, removidas. |
| `app/header-contacts.css` | 92 | Header.module.css e HeaderContactLinks.module.css. |
| `app/10-anos/campaign-glass.css` | 1811 | CampaignPage e os módulos das seções, cabeçalho e formulário afetados. |
| `app/10-anos/participation-desktop.css` | 627 | ParticipationDesktop.module.css, com modificadores e animações. |
| `app/cliente/10-anos/client-page.css` | 1086 | ClientPage e os módulos individuais do banner, cartões, modal, fundo e ajuda. |
| `components/campaign-brand.css` | 120 | CampaignBrand.module.css. |
| `components/lucky-number-ticket.css` | 36 | LuckyNumberTicket.module.css. |

As 11 folhas antigas externas a globals.css foram removidas após a redistribuição. Valores de cor, espaços, bordas, sombras, artes, breakpoints, transições e keyframes foram conservados na migração. A preferência global de reduzir movimento foi posicionada após a regra padrão de scroll para não ser sobrescrita.

A especificidade dos contextos existentes foi preservada por hooks data-ui. O estilo principal é local ao CSS Module; a composição de bases ocorre em composes. JavaScript usa data-theme, data-carousel-item e data-centered, sem depender de classes geradas. Ainda existem seletores contextuais extensos para manter a cascata antiga; eles agora ficam no componente responsável e devem ser simplificados com comparação visual nas próximas alterações.

## Componentes e exceções

O mapa completo TSX → CSS Module está em [CSS.md](CSS.md). Rotas de reexportação, contexto sem interface, WinnersPage (somente composição) e CenterSwipeCarousel (somente interação e classe recebida) não recebem folhas vazias. As receitas de botão, contêiner, cartão, título, rótulo, acessibilidade e grade são compartilhadas sem criar componentes TSX artificiais.

shared.tsx foi dividido em Header, Logo, CommercialBand, PrizeBanner, WinnersPreview, FAQ, HelpBand, HistoryBand e PrivacyNote. AnniversaryMark e ParticipationArtwork foram retirados após confirmar ausência de consumidores; os recursos de imagem não foram removidos.

## Validação executada

- npm.cmd run lint: aprovado, sem erros ou avisos.
- npm.cmd run typecheck: aprovado.
- npm.cmd test: 10 testes aprovados; as chamadas do serviço usam fetch simulado.
- npm.cmd run build: aprovado com Turbopack, TypeScript e geração das rotas.
- git diff --check: aprovado.
- /: HTTP 307 para /10-anos.
- /10-anos, /cliente/10-anos, /10-anos/ganhadores, /10-anos/regulamento e /demo/admin/10-anos: HTTP 200.
- Folhas CSS referenciadas pelas cinco páginas: HTTP 200; sem classes undefined no HTML verificado.
- /admin/10-anos: HTTP 403, preservando a proteção.
- POST /api/campanha/consulta com CPF vazio: HTTP 400 e invalid_cpf, sem consultar o endpoint externo.
- Auditoria de animações: os keyframes referenciados ficam no mesmo CSS Module consumidor.

## Limitações e trabalho preservado

Nenhum navegador conectado estava disponível: não foi realizada comparação de screenshots nem teste de cliques, carrossel, troca de tema ou modal. O HTML inicial do painel mostra o estado sem consulta; a interface preenchida requer uma consulta ou uma sessão de teste no navegador. O build, os testes e as respostas HTTP não comprovam equivalência visual.

Os ajustes locais anteriores de sombras, lazy loading, rolagem e documentação foram incorporados. .env.local, assets e configurações de integração foram preservados. Regulamento, PDF, destinos comerciais e regras oficiais continuam com as pendências anteriores. Não houve commit, push ou deploy.

## Arquivos adicionados e modificados

As linhas abaixo correspondem ao estado final. Em arquivos novos/migrados, o intervalo cobre o conteúdo entregue; em arquivos mantidos, mostra os hunks efetivamente modificados. O impacto e a validação de cada grupo seguem as seções anteriores.

| Arquivo | Tipo | Linhas finais | Alteração/impacto |
| --- | --- | --- | --- |
| [AGENTS.md](../AGENTS.md) | Modificado | 10–23 | Convenções definitivas de arquitetura e CSS, preservando orientações existentes. |
| [CLAUDE.md](../CLAUDE.md) | Modificado | 2–3 | Convenções definitivas de arquitetura e CSS, preservando orientações existentes. |
| [README.md](../README.md) | Modificado | remoção junto à linha 1; 3–12; 16; 20; 22; 24; 26–32; 34–53; 55; 57; 59; 61; 63; 65–67; 69; 71–80; 82; 84; 86–90; 92; 94; 96; 98 | Interface separada por responsabilidade e associada aos estilos locais. |
| [app/10-anos/ganhadores/page.tsx](../app/10-anos/ganhadores/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/10-anos/page.tsx](../app/10-anos/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/10-anos/regulamento/page.tsx](../app/10-anos/regulamento/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/admin/10-anos/page.tsx](../app/admin/10-anos/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/api/campanha/consulta/route.ts](../app/api/campanha/consulta/route.ts) | Modificado | 2 | Somente o import do modelo de validação foi atualizado. |
| [app/cliente/10-anos/page.tsx](../app/cliente/10-anos/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/demo/admin/10-anos/page.tsx](../app/demo/admin/10-anos/page.tsx) | Modificado | 1 | Rota preservada; composição delegada à funcionalidade. |
| [app/globals.css](../app/globals.css) | Modificado | 1; 3–10; 20; 24; 29–30; 35; 43–44; 47–49; 51–52; 55; 60–61; 65; 70–71; 74–75; 79; 84; remoção junto à linha 87; remoção junto à linha 88; remoção junto à linha 92; remoção junto à linha 94; 98–99; remoção junto à linha 105; 108–110; remoção junto à linha 112; 114–115 | Reset, tokens, documento, tipografia e preferências globais. |
| [app/layout.tsx](../app/layout.tsx) | Modificado | 1; 4; 29 | Imports globais e contexto atualizados; fontes e idioma preservados. |
| [package.json](../package.json) | Modificado | 5; 11 | Tipo ES Module e comando typecheck. Sem novas dependências. |
| [tests/consult.test.mjs](../tests/consult.test.mjs) | Modificado | 3 | Validação do contrato, serviço ou referências CSS. |
| [tsconfig.json](../tsconfig.json) | Modificado | 9 | Permite imports .ts usados pelo serviço e pelos testes nativos. |
| [components/layout/Header.module.css](../components/layout/Header.module.css) | Adicionado/migrado | 1–435 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/layout/Header.tsx](../components/layout/Header.tsx) | Adicionado/migrado | 1–115 | Interface separada por responsabilidade e associada aos estilos locais. |
| [components/layout/Logo.module.css](../components/layout/Logo.module.css) | Adicionado/migrado | 1–24 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/layout/Logo.tsx](../components/layout/Logo.tsx) | Adicionado/migrado | 1–15 | Interface separada por responsabilidade e associada aos estilos locais. |
| [components/ui/Accessibility.module.css](../components/ui/Accessibility.module.css) | Adicionado/migrado | 1–13 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/ui/Button.module.css](../components/ui/Button.module.css) | Adicionado/migrado | 1–101 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/ui/Card.module.css](../components/ui/Card.module.css) | Adicionado/migrado | 1–23 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/ui/CenterSwipeCarousel.tsx](../components/ui/CenterSwipeCarousel.tsx) | Adicionado/migrado | 1–139 | Interação por atributos data, independente dos nomes de CSS. |
| [components/ui/Layout.module.css](../components/ui/Layout.module.css) | Adicionado/migrado | 1–40 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/ui/SectionHeading.module.css](../components/ui/SectionHeading.module.css) | Adicionado/migrado | 1–51 | Estilos locais, estados, temas e condições responsivas do componente. |
| [components/ui/Typography.module.css](../components/ui/Typography.module.css) | Adicionado/migrado | 1–8 | Estilos locais, estados, temas e condições responsivas do componente. |
| [docs/CAMPANHA.md](../docs/CAMPANHA.md) | Adicionado/migrado | 1–95 | Documentação da estrutura, dos comportamentos ou da migração. |
| [docs/CSS.md](../docs/CSS.md) | Adicionado/migrado | 1–98 | Documentação da estrutura, dos comportamentos ou da migração. |
| [features/admin/AdminLockedPage.module.css](../features/admin/AdminLockedPage.module.css) | Adicionado/migrado | 1–20 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/admin/AdminLockedPage.tsx](../features/admin/AdminLockedPage.tsx) | Adicionado/migrado | 1–3 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/admin/model/adminTypes.ts](../features/admin/model/adminTypes.ts) | Adicionado/migrado | 1–27 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [features/campaign/CampaignPage.module.css](../features/campaign/CampaignPage.module.css) | Adicionado/migrado | 1–212 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/CampaignPage.tsx](../features/campaign/CampaignPage.tsx) | Adicionado/migrado | 1–48 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/RegulationPage.module.css](../features/campaign/RegulationPage.module.css) | Adicionado/migrado | 1–30 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/RegulationPage.tsx](../features/campaign/RegulationPage.tsx) | Adicionado/migrado | 1–25 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/WinnersPage.tsx](../features/campaign/WinnersPage.tsx) | Adicionado/migrado | 1–6 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/CampaignActions.module.css](../features/campaign/components/CampaignActions.module.css) | Adicionado/migrado | 1–373 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/CampaignActions.tsx](../features/campaign/components/CampaignActions.tsx) | Adicionado/migrado | 1–49 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/CampaignBrand.module.css](../features/campaign/components/CampaignBrand.module.css) | Adicionado/migrado | 1–103 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/CampaignBrand.tsx](../features/campaign/components/CampaignBrand.tsx) | Adicionado/migrado | 1–58 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/CampaignFooter.module.css](../features/campaign/components/CampaignFooter.module.css) | Adicionado/migrado | 1–41 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/CampaignFooter.tsx](../features/campaign/components/CampaignFooter.tsx) | Adicionado/migrado | 1–16 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/CampaignHero.module.css](../features/campaign/components/CampaignHero.module.css) | Adicionado/migrado | 1–449 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/CampaignHero.tsx](../features/campaign/components/CampaignHero.tsx) | Adicionado/migrado | 1–94 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/CommercialBand.module.css](../features/campaign/components/CommercialBand.module.css) | Adicionado/migrado | 1–462 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/CommercialBand.tsx](../features/campaign/components/CommercialBand.tsx) | Adicionado/migrado | 1–46 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/ConsultForm.module.css](../features/campaign/components/ConsultForm.module.css) | Adicionado/migrado | 1–249 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/ConsultForm.tsx](../features/campaign/components/ConsultForm.tsx) | Adicionado/migrado | 1–93 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/FAQ.module.css](../features/campaign/components/FAQ.module.css) | Adicionado/migrado | 1–372 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/FAQ.tsx](../features/campaign/components/FAQ.tsx) | Adicionado/migrado | 1–52 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/HistoryBand.module.css](../features/campaign/components/HistoryBand.module.css) | Adicionado/migrado | 1–289 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/HistoryBand.tsx](../features/campaign/components/HistoryBand.tsx) | Adicionado/migrado | 1–39 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/ParticipationDesktop.module.css](../features/campaign/components/ParticipationDesktop.module.css) | Adicionado/migrado | 1–411 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/ParticipationDesktop.tsx](../features/campaign/components/ParticipationDesktop.tsx) | Adicionado/migrado | 1–88 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/ParticipationMobile.module.css](../features/campaign/components/ParticipationMobile.module.css) | Adicionado/migrado | 1–522 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/ParticipationMobile.tsx](../features/campaign/components/ParticipationMobile.tsx) | Adicionado/migrado | 1–42 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/PrivacyNote.module.css](../features/campaign/components/PrivacyNote.module.css) | Adicionado/migrado | 1–65 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/PrivacyNote.tsx](../features/campaign/components/PrivacyNote.tsx) | Adicionado/migrado | 1–9 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/PrizeBanner.module.css](../features/campaign/components/PrizeBanner.module.css) | Adicionado/migrado | 1–442 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/PrizeBanner.tsx](../features/campaign/components/PrizeBanner.tsx) | Adicionado/migrado | 1–43 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/components/WinnersPreview.module.css](../features/campaign/components/WinnersPreview.module.css) | Adicionado/migrado | 1–117 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/campaign/components/WinnersPreview.tsx](../features/campaign/components/WinnersPreview.tsx) | Adicionado/migrado | 1–30 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/campaign/context/ConsultationProvider.tsx](../features/campaign/context/ConsultationProvider.tsx) | Adicionado/migrado | 1–16 | Estado temporário compartilhado da consulta. |
| [features/campaign/model/campaign.ts](../features/campaign/model/campaign.ts) | Adicionado/migrado | 1–148 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [features/campaign/model/consult.ts](../features/campaign/model/consult.ts) | Adicionado/migrado | 1–96 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [features/campaign/model/participation.ts](../features/campaign/model/participation.ts) | Adicionado/migrado | 1–25 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [features/campaign/services/consultationService.ts](../features/campaign/services/consultationService.ts) | Adicionado/migrado | 1–42 | Comunicação HTTP isolada da apresentação. |
| [features/contacts/components/HeaderContactLinks.module.css](../features/contacts/components/HeaderContactLinks.module.css) | Adicionado/migrado | 1–80 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/contacts/components/HeaderContactLinks.tsx](../features/contacts/components/HeaderContactLinks.tsx) | Adicionado/migrado | 1–31 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/contacts/model/netboxContacts.ts](../features/contacts/model/netboxContacts.ts) | Adicionado/migrado | 1–7 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [features/dashboard/ClientPage.module.css](../features/dashboard/ClientPage.module.css) | Adicionado/migrado | 1–318 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/ClientPage.tsx](../features/dashboard/ClientPage.tsx) | Adicionado/migrado | 1–51 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/BalanceCard.module.css](../features/dashboard/components/BalanceCard.module.css) | Adicionado/migrado | 1–145 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/BalanceCard.tsx](../features/dashboard/components/BalanceCard.tsx) | Adicionado/migrado | 1–19 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/ClientHero.module.css](../features/dashboard/components/ClientHero.module.css) | Adicionado/migrado | 1–293 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/ClientHero.tsx](../features/dashboard/components/ClientHero.tsx) | Adicionado/migrado | 1–23 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/ClientPageBackground.module.css](../features/dashboard/components/ClientPageBackground.module.css) | Adicionado/migrado | 1–58 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/ClientPageBackground.tsx](../features/dashboard/components/ClientPageBackground.tsx) | Adicionado/migrado | 1–9 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/HelpBand.module.css](../features/dashboard/components/HelpBand.module.css) | Adicionado/migrado | 1–130 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/HelpBand.tsx](../features/dashboard/components/HelpBand.tsx) | Adicionado/migrado | 1–19 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/LuckyNumberTicket.module.css](../features/dashboard/components/LuckyNumberTicket.module.css) | Adicionado/migrado | 1–23 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/LuckyNumberTicket.tsx](../features/dashboard/components/LuckyNumberTicket.tsx) | Adicionado/migrado | 1–78 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/NumbersCard.module.css](../features/dashboard/components/NumbersCard.module.css) | Adicionado/migrado | 1–72 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/NumbersCard.tsx](../features/dashboard/components/NumbersCard.tsx) | Adicionado/migrado | 1–31 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/NumbersGrid.module.css](../features/dashboard/components/NumbersGrid.module.css) | Adicionado/migrado | 1–96 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/NumbersModal.module.css](../features/dashboard/components/NumbersModal.module.css) | Adicionado/migrado | 1–86 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/NumbersModal.tsx](../features/dashboard/components/NumbersModal.tsx) | Adicionado/migrado | 1–66 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/dashboard/components/ParticipantCard.module.css](../features/dashboard/components/ParticipantCard.module.css) | Adicionado/migrado | 1–103 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/dashboard/components/ParticipantCard.tsx](../features/dashboard/components/ParticipantCard.tsx) | Adicionado/migrado | 1–45 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/demo/DemoAdminPage.module.css](../features/demo/DemoAdminPage.module.css) | Adicionado/migrado | 1–148 | Estilos locais, estados, temas e condições responsivas do componente. |
| [features/demo/DemoAdminPage.tsx](../features/demo/DemoAdminPage.tsx) | Adicionado/migrado | 1–132 | Interface separada por responsabilidade e associada aos estilos locais. |
| [features/demo/model/demoFixtures.ts](../features/demo/model/demoFixtures.ts) | Adicionado/migrado | 1–55 | Conteúdo, contratos ou regras de negócio preservados no domínio. |
| [tests/consultation-service.test.mjs](../tests/consultation-service.test.mjs) | Adicionado/migrado | 1–46 | Validação do contrato, serviço ou referências CSS. |
| [tests/styles.test.mjs](../tests/styles.test.mjs) | Adicionado/migrado | 1–44 | Validação do contrato, serviço ou referências CSS. |
| [docs/REORGANIZACAO.md](REORGANIZACAO.md) | Adicionado | 1–208 | Relatório completo, inventário e evidências de validação. |

## Origens removidas ou migradas

As linhas originais usam o snapshot do início da tarefa, incluindo os ajustes locais anteriores. Os caminhos removidos abaixo não recebem links para arquivos inexistentes. Quando há correspondência direta, o destino real é clicável.

| Origem | Destino/decisão | Linhas removidas na origem |
| --- | --- | --- |
| `app/10-anos/campaign-glass.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–1811 |
| `app/10-anos/participation-desktop.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–627 |
| `app/artwork.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–69 |
| `app/campaign-sections.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–144 |
| `app/cliente/10-anos/client-page.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–1086 |
| `app/dashboard.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–895 |
| `app/demo.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–1 |
| `app/header-contacts.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–92 |
| `app/hero-polish.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–177 |
| `components/campaign-brand.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–120 |
| `components/campaign-brand.tsx` | [features/campaign/components/CampaignBrand.tsx](../features/campaign/components/CampaignBrand.tsx) | Originais 1–71 |
| `components/center-swipe-carousel.tsx` | [components/ui/CenterSwipeCarousel.tsx](../components/ui/CenterSwipeCarousel.tsx) | Originais 1–167 |
| `components/client-page-background.tsx` | [features/dashboard/components/ClientPageBackground.tsx](../features/dashboard/components/ClientPageBackground.tsx) | Originais 1–10 |
| `components/consult-form.tsx` | [features/campaign/components/ConsultForm.tsx](../features/campaign/components/ConsultForm.tsx) | Originais 1–115 |
| `components/consultation-provider.tsx` | [features/campaign/context/ConsultationProvider.tsx](../features/campaign/context/ConsultationProvider.tsx) | Originais 1–18 |
| `components/header-contact-links.tsx` | [features/contacts/components/HeaderContactLinks.tsx](../features/contacts/components/HeaderContactLinks.tsx) | Originais 1–34 |
| `components/lucky-number-ticket.css` | Redistribuído para CSS Modules; consulte a auditoria abaixo. | Originais 1–36 |
| `components/lucky-number-ticket.tsx` | [features/dashboard/components/LuckyNumberTicket.tsx](../features/dashboard/components/LuckyNumberTicket.tsx) | Originais 1–80 |
| `components/participant-card.tsx` | [features/dashboard/components/ParticipantCard.tsx](../features/dashboard/components/ParticipantCard.tsx) | Originais 1–51 |
| `components/participation-artwork.tsx` | Componente sem consumidores e sem regras CSS ativas; imagens preservadas. | Originais 1–32 |
| `components/participation-desktop.tsx` | [features/campaign/components/ParticipationDesktop.tsx](../features/campaign/components/ParticipationDesktop.tsx) | Originais 1–112 |
| `components/shared.tsx` | [components/layout/Logo.tsx](../components/layout/Logo.tsx), [components/layout/Header.tsx](../components/layout/Header.tsx), [features/campaign/components/CommercialBand.tsx](../features/campaign/components/CommercialBand.tsx), [features/campaign/components/PrizeBanner.tsx](../features/campaign/components/PrizeBanner.tsx), [features/campaign/components/WinnersPreview.tsx](../features/campaign/components/WinnersPreview.tsx), [features/campaign/components/FAQ.tsx](../features/campaign/components/FAQ.tsx), [features/dashboard/components/HelpBand.tsx](../features/dashboard/components/HelpBand.tsx), [features/campaign/components/HistoryBand.tsx](../features/campaign/components/HistoryBand.tsx), [features/campaign/components/PrivacyNote.tsx](../features/campaign/components/PrivacyNote.tsx) | Originais 1–424 |
| `lib/admin-types.ts` | [features/admin/model/adminTypes.ts](../features/admin/model/adminTypes.ts) | Originais 1–27 |
| `lib/campaign.ts` | [features/campaign/model/campaign.ts](../features/campaign/model/campaign.ts) | Originais 1–147 |
| `lib/consult.ts` | [features/campaign/model/consult.ts](../features/campaign/model/consult.ts) | Originais 1–92 |
| `lib/netbox-contacts.ts` | [features/contacts/model/netboxContacts.ts](../features/contacts/model/netboxContacts.ts) | Originais 1–7 |
| `lib/participation.ts` | [features/campaign/model/participation.ts](../features/campaign/model/participation.ts) | Originais 1–25 |
