# CSS e componentes

## Caminho de leitura

Abra a rota em `app/`, siga o import da tela em `features/` e abra o componente da seção. O CSS Module correspondente fica ao lado do TSX. Não existe mais um arquivo global de campanha ou dashboard acumulando regras de várias telas.

## Relação entre interface e estilos

| Interface | Estilos |
| --- | --- |
| [AdminLockedPage.tsx](../features/admin/AdminLockedPage.tsx) | [AdminLockedPage.module.css](../features/admin/AdminLockedPage.module.css) |
| [CampaignPage.tsx](../features/campaign/CampaignPage.tsx) | [CampaignPage.module.css](../features/campaign/CampaignPage.module.css) |
| [CampaignActions.tsx](../features/campaign/components/CampaignActions.tsx) | [CampaignActions.module.css](../features/campaign/components/CampaignActions.module.css) |
| [CampaignBrand.tsx](../features/campaign/components/CampaignBrand.tsx) | [CampaignBrand.module.css](../features/campaign/components/CampaignBrand.module.css) |
| [CampaignFooter.tsx](../features/campaign/components/CampaignFooter.tsx) | [CampaignFooter.module.css](../features/campaign/components/CampaignFooter.module.css) |
| [CampaignHero.tsx](../features/campaign/components/CampaignHero.tsx) | [CampaignHero.module.css](../features/campaign/components/CampaignHero.module.css) |
| [CommercialBand.tsx](../features/campaign/components/CommercialBand.tsx) | [CommercialBand.module.css](../features/campaign/components/CommercialBand.module.css) |
| [ConsultForm.tsx](../features/campaign/components/ConsultForm.tsx) | [ConsultForm.module.css](../features/campaign/components/ConsultForm.module.css) |
| [FAQ.tsx](../features/campaign/components/FAQ.tsx) | [FAQ.module.css](../features/campaign/components/FAQ.module.css) |
| [HistoryBand.tsx](../features/campaign/components/HistoryBand.tsx) | [HistoryBand.module.css](../features/campaign/components/HistoryBand.module.css) |
| [ParticipationDesktop.tsx](../features/campaign/components/ParticipationDesktop.tsx) | [ParticipationDesktop.module.css](../features/campaign/components/ParticipationDesktop.module.css) |
| [ParticipationMobile.tsx](../features/campaign/components/ParticipationMobile.tsx) | [ParticipationMobile.module.css](../features/campaign/components/ParticipationMobile.module.css) |
| [PrivacyNote.tsx](../features/campaign/components/PrivacyNote.tsx) | [PrivacyNote.module.css](../features/campaign/components/PrivacyNote.module.css) |
| [PrizeBanner.tsx](../features/campaign/components/PrizeBanner.tsx) | [PrizeBanner.module.css](../features/campaign/components/PrizeBanner.module.css) |
| [WinnersPreview.tsx](../features/campaign/components/WinnersPreview.tsx) | [WinnersPreview.module.css](../features/campaign/components/WinnersPreview.module.css) |
| [ConsultationProvider.tsx](../features/campaign/context/ConsultationProvider.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |
| [RegulationPage.tsx](../features/campaign/RegulationPage.tsx) | [RegulationPage.module.css](../features/campaign/RegulationPage.module.css) |
| [WinnersPage.tsx](../features/campaign/WinnersPage.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |
| [HeaderContactLinks.tsx](../features/contacts/components/HeaderContactLinks.tsx) | [HeaderContactLinks.module.css](../features/contacts/components/HeaderContactLinks.module.css) |
| [ClientPage.tsx](../features/dashboard/ClientPage.tsx) | [ClientPage.module.css](../features/dashboard/ClientPage.module.css) |
| [BalanceCard.tsx](../features/dashboard/components/BalanceCard.tsx) | [BalanceCard.module.css](../features/dashboard/components/BalanceCard.module.css) |
| [ClientHero.tsx](../features/dashboard/components/ClientHero.tsx) | [ClientHero.module.css](../features/dashboard/components/ClientHero.module.css) |
| [ClientPageBackground.tsx](../features/dashboard/components/ClientPageBackground.tsx) | [ClientPageBackground.module.css](../features/dashboard/components/ClientPageBackground.module.css) |
| [HelpBand.tsx](../features/dashboard/components/HelpBand.tsx) | [HelpBand.module.css](../features/dashboard/components/HelpBand.module.css) |
| [LuckyNumberTicket.tsx](../features/dashboard/components/LuckyNumberTicket.tsx) | [LuckyNumberTicket.module.css](../features/dashboard/components/LuckyNumberTicket.module.css) |
| [NumbersCard.tsx](../features/dashboard/components/NumbersCard.tsx) | [NumbersCard.module.css](../features/dashboard/components/NumbersCard.module.css) |
| [NumbersModal.tsx](../features/dashboard/components/NumbersModal.tsx) | [NumbersModal.module.css](../features/dashboard/components/NumbersModal.module.css) |
| [ParticipantCard.tsx](../features/dashboard/components/ParticipantCard.tsx) | [ParticipantCard.module.css](../features/dashboard/components/ParticipantCard.module.css) |
| [DemoAdminPage.tsx](../features/demo/DemoAdminPage.tsx) | [DemoAdminPage.module.css](../features/demo/DemoAdminPage.module.css) |
| [Header.tsx](../components/layout/Header.tsx) | [Header.module.css](../components/layout/Header.module.css) |
| [Logo.tsx](../components/layout/Logo.tsx) | [Logo.module.css](../components/layout/Logo.module.css) |
| [CenterSwipeCarousel.tsx](../components/ui/CenterSwipeCarousel.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |

Os reexports `app/**/page.tsx` não precisam de CSS próprio. `app/layout.tsx` usa apenas `globals.css` para configurar o documento e as fontes. O contexto de consulta não renderiza interface própria. `CenterSwipeCarousel` recebe a classe do seu chamador e cuida somente da interação; os estilos dos cartões pertencem a `CampaignActions` e `ParticipationMobile`. `WinnersPage` apenas compõe o cabeçalho, a seção de ganhadores e as receitas compartilhadas.

## Receitas compartilhadas

- `components/ui/Button.module.css`: botões primário, contornado, claro e link textual.
- `components/ui/Layout.module.css`: largura de conteúdo, espaçamento de seção e subpáginas.
- `components/ui/Card.module.css`: base visual de cartões.
- `components/ui/SectionHeading.module.css`: título e descrição de seção.
- `components/ui/Accessibility.module.css`: conteúdo exclusivo para leitores de tela.
- `components/ui/Typography.module.css`: rótulo curto compartilhado.
- `features/dashboard/components/NumbersGrid.module.css`: grade compartilhada entre resumo e modal.

São receitas de CSS, não componentes TSX vazios. Regras de contexto, como o botão dentro da faixa de ajuda, ficam no CSS da faixa, e não no arquivo genérico de botões.

## Uma classe no JSX, composição no CSS

```tsx
import styles from "./ParticipantCard.module.css";

<article className={styles.card}>...</article>
```

```css
.card {
  composes: dashboardCard from "../../../components/ui/Card.module.css";
  composes: root;
}
```

A classe `root` contém as regras específicas do participante; `card` combina essa classe com a base compartilhada. Os nomes gerados no HTML são detalhes do CSS Modules. Para alterar o visual, edite o arquivo fonte correspondente.

## Contextos entre componentes

Os atributos `data-ui` são hooks explícitos para as adaptações entre componentes já existentes. Não são classes utilitárias: identificam contextos estáveis, como `client-page`, `dashboard-card` ou `button`. Os nomes históricos foram conservados nesses hooks para preservar a especificidade e a seleção da interface durante a migração.

No CSS Module, `:global([data-ui~="client-page"])` acessa o contexto externo e `.root` continua local ao componente. Use esse recurso apenas quando uma adaptação de contexto exigir; prefira regras locais e variáveis CSS para funcionalidades novas. Não adicione classes globais com nomes do componente nem tente consultar o hash gerado pelo CSS Modules em JavaScript.

## Tema, responsividade e animações

- O tema visual usa `body[data-theme="dark"]`; `data-theme-mode="dark"` mantém a escolha manual. O carrossel mobile preserva o comportamento de tema automático da participação.
- Tokens de vidro da campanha ficam em `CampaignPage.module.css`; os tokens do painel e modal ficam em `ClientPage.module.css`, no contexto do body da rota para alcançar o modal externo ao main.
- `ClientHero`, `CommercialBand` e `HelpBand` compartilham `--client-section-shadow` no painel.
- Os estados do carrossel usam `data-carousel-item`, `data-centered`, `data-carousel-next` e `data-participation-section`, independentes dos nomes de classe.
- Breakpoints, hover, fallbacks e keyframes ficam no CSS Module responsável. Keyframes reutilizados por mais de um módulo são escopados em cada consumidor.
- As condições `prefers-reduced-motion` e `@supports` foram mantidas. A ordem dos blocos que ainda se sobrepõem foi conservada: não reorganize regras apenas por largura sem verificar a cascata.

## CSS global

`app/globals.css` contém o import do Tailwind, tokens da marca, box-sizing, documento, fontes, títulos, foco, links, estados desabilitados, preferências de movimento e o tema global. Não contém estilos de campanha, formulário, cabeçalho, dashboard ou demonstração.

## Como validar uma alteração

Execute `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test` e `npm.cmd run build`. O teste de CSS verifica imports e chaves estáticas que o TypeScript não valida. As classes calculadas dos cartões mobile também precisam ser conferidas ao alterar seus nomes.

Uma compilação aprovada não comprova aparência. Confira o componente afetado no navegador, em claro/escuro e desktop/mobile, incluindo foco, hover, carrossel e modal quando aplicável.
