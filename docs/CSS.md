# CSS e componentes

## Caminho de leitura

Abra a rota em `src/app/`, siga o import da tela em `src/components/pages/` e abra o componente da seção. O CSS Module correspondente fica ao lado do TSX. Não existe mais um arquivo global de campanha ou dashboard acumulando regras de várias telas.

## Relação entre interface e estilos

| Interface | Estilos |
| --- | --- |
| [AdminLockedPage.tsx](../src/components/pages/admin/AdminLockedPage.tsx) | [AdminLockedPage.module.css](../src/components/pages/admin/AdminLockedPage.module.css) |
| [CampaignPage.tsx](../src/components/pages/campaign/CampaignPage.tsx) | [CampaignPage.module.css](../src/components/pages/campaign/CampaignPage.module.css) |
| [CampaignActions.tsx](../src/components/campaign/CampaignActions.tsx) | [CampaignActions.module.css](../src/components/campaign/CampaignActions.module.css) |
| [CampaignBrand.tsx](../src/components/campaign/CampaignBrand.tsx) | [CampaignBrand.module.css](../src/components/campaign/CampaignBrand.module.css) |
| [CampaignFooter.tsx](../src/components/campaign/CampaignFooter.tsx) | [CampaignFooter.module.css](../src/components/campaign/CampaignFooter.module.css) |
| [CampaignHero.tsx](../src/components/campaign/CampaignHero.tsx) | [CampaignHero.module.css](../src/components/campaign/CampaignHero.module.css) |
| [CommercialBand.tsx](../src/components/campaign/CommercialBand.tsx) | [CommercialBand.module.css](../src/components/campaign/CommercialBand.module.css) |
| [ConsultForm.tsx](../src/components/campaign/ConsultForm.tsx) | [ConsultForm.module.css](../src/components/campaign/ConsultForm.module.css) |
| [FAQ.tsx](../src/components/campaign/FAQ.tsx) | [FAQ.module.css](../src/components/campaign/FAQ.module.css) |
| [HistoryBand.tsx](../src/components/campaign/HistoryBand.tsx) | [HistoryBand.module.css](../src/components/campaign/HistoryBand.module.css) |
| [ParticipationDesktop.tsx](../src/components/campaign/ParticipationDesktop.tsx) | [ParticipationDesktop.module.css](../src/components/campaign/ParticipationDesktop.module.css) |
| [ParticipationMobile.tsx](../src/components/campaign/ParticipationMobile.tsx) | [ParticipationMobile.module.css](../src/components/campaign/ParticipationMobile.module.css) |
| [PrivacyNote.tsx](../src/components/campaign/PrivacyNote.tsx) | [PrivacyNote.module.css](../src/components/campaign/PrivacyNote.module.css) |
| [PrizeBanner.tsx](../src/components/campaign/PrizeBanner.tsx) | [PrizeBanner.module.css](../src/components/campaign/PrizeBanner.module.css) |
| [WinnersPreview.tsx](../src/components/campaign/WinnersPreview.tsx) | [WinnersPreview.module.css](../src/components/campaign/WinnersPreview.module.css) |
| [ConsultationProvider.tsx](../src/context/campaign/ConsultationProvider.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |
| [RegulationPage.tsx](../src/components/pages/campaign/RegulationPage.tsx) | [RegulationPage.module.css](../src/components/pages/campaign/RegulationPage.module.css) |
| [PrivacyPolicyPage.tsx](../src/components/pages/campaign/PrivacyPolicyPage.tsx) | [PrivacyPolicyPage.module.css](../src/components/pages/campaign/PrivacyPolicyPage.module.css) |
| [WinnersPage.tsx](../src/components/pages/campaign/WinnersPage.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |
| [HeaderContactLinks.tsx](../src/components/contacts/HeaderContactLinks.tsx) | [HeaderContactLinks.module.css](../src/components/contacts/HeaderContactLinks.module.css) |
| [ClientPage.tsx](../src/components/pages/dashboard/ClientPage.tsx) | [ClientPage.module.css](../src/components/pages/dashboard/ClientPage.module.css) |
| [BalanceCard.tsx](../src/components/dashboard/BalanceCard.tsx) | [BalanceCard.module.css](../src/components/dashboard/BalanceCard.module.css) |
| [ClientHero.tsx](../src/components/dashboard/ClientHero.tsx) | [ClientHero.module.css](../src/components/dashboard/ClientHero.module.css) |
| [ClientPageBackground.tsx](../src/components/dashboard/ClientPageBackground.tsx) | [ClientPageBackground.module.css](../src/components/dashboard/ClientPageBackground.module.css) |
| [HelpBand.tsx](../src/components/dashboard/HelpBand.tsx) | [HelpBand.module.css](../src/components/dashboard/HelpBand.module.css) |
| [LuckyNumberTicket.tsx](../src/components/dashboard/LuckyNumberTicket.tsx) | [LuckyNumberTicket.module.css](../src/components/dashboard/LuckyNumberTicket.module.css) |
| [NumbersCard.tsx](../src/components/dashboard/NumbersCard.tsx) | [NumbersCard.module.css](../src/components/dashboard/NumbersCard.module.css) |
| [NumbersModal.tsx](../src/components/dashboard/NumbersModal.tsx) | [NumbersModal.module.css](../src/components/dashboard/NumbersModal.module.css) |
| [ParticipantCard.tsx](../src/components/dashboard/ParticipantCard.tsx) | [ParticipantCard.module.css](../src/components/dashboard/ParticipantCard.module.css) |
| [DemoAdminPage.tsx](../src/components/pages/demo/DemoAdminPage.tsx) | [DemoAdminPage.module.css](../src/components/pages/demo/DemoAdminPage.module.css) |
| [Header.tsx](../src/components/layout/Header.tsx) | [Header.module.css](../src/components/layout/Header.module.css) |
| [Logo.tsx](../src/components/layout/Logo.tsx) | [Logo.module.css](../src/components/layout/Logo.module.css) |
| [CenterSwipeCarousel.tsx](../src/components/ui/CenterSwipeCarousel.tsx) | Usa componentes/receitas compartilhados; não possui regras visuais exclusivas. |

Os reexports `src/app/**/page.tsx` não precisam de CSS próprio. `src/app/layout.tsx` usa apenas `globals.css` para configurar o documento e as fontes. O contexto de consulta não renderiza interface própria. `CenterSwipeCarousel` recebe a classe do seu chamador e cuida somente da interação; os estilos dos cartões pertencem a `CampaignActions` e `ParticipationMobile`. `WinnersPage` apenas compõe o cabeçalho, a seção de ganhadores e as receitas compartilhadas.

## Receitas compartilhadas

- `src/components/ui/Button.module.css`: botões primário, contornado, claro e link textual.
- `src/components/ui/Layout.module.css`: largura de conteúdo, espaçamento de seção e subpáginas.
- `src/components/ui/Card.module.css`: base visual de cartões.
- `src/components/ui/SectionHeading.module.css`: título e descrição de seção.
- `src/components/ui/Accessibility.module.css`: conteúdo exclusivo para leitores de tela.
- `src/components/ui/Typography.module.css`: rótulo curto compartilhado.
- `src/components/dashboard/NumbersGrid.module.css`: grade compartilhada entre resumo e modal.

São receitas de CSS, não componentes TSX vazios. Regras de contexto, como o botão dentro da faixa de ajuda, ficam no CSS da faixa, e não no arquivo genérico de botões.

## Uma classe no JSX, composição no CSS

```tsx
import styles from "./ParticipantCard.module.css";

<article className={styles.participantCardSurface}>...</article>
```

```css
.participantCardSurface {
  composes: cardDashboardCard from "../ui/Card.module.css";
  composes: participantCardRoot;
}
```

A classe `participantCardRoot` contém as regras específicas do participante; `participantCardSurface` combina essa classe com a base compartilhada. Os nomes gerados no HTML são detalhes do CSS Modules. Para alterar o visual, edite o arquivo fonte correspondente.

## Contextos entre componentes

Os atributos `data-ui` são hooks explícitos para as adaptações entre componentes já existentes. Não são classes utilitárias: identificam contextos estáveis, como `client-page`, `dashboard-card` ou `button`. Os nomes históricos foram conservados nesses hooks para preservar a especificidade e a seleção da interface durante a migração.

No CSS Module, `:global([data-ui~="client-page"])` acessa o contexto externo e `.participantCardRoot` continua local ao componente. Use esse recurso apenas quando uma adaptação de contexto exigir; prefira regras locais e variáveis CSS para funcionalidades novas. Não adicione classes globais com nomes do componente nem tente consultar o hash gerado pelo CSS Modules em JavaScript.

## Tema, responsividade e animações

- O tema visual usa `body[data-theme="dark"]`; `data-theme-mode="dark"` mantém a escolha manual. O carrossel mobile preserva o comportamento de tema automático da participação.
- Tokens de vidro da campanha ficam em `CampaignPage.module.css`; os tokens do painel e modal ficam em `ClientPage.module.css`, no contexto do body da rota para alcançar o modal externo ao main.
- `ClientHero`, `CommercialBand` e `HelpBand` compartilham `--client-section-shadow` no painel.
- Os estados do carrossel usam `data-carousel-item`, `data-centered`, `data-carousel-next` e `data-participation-section`, independentes dos nomes de classe.
- Breakpoints, hover, fallbacks e keyframes ficam no CSS Module responsável. Keyframes reutilizados por mais de um módulo são escopados em cada consumidor.
- As condições `prefers-reduced-motion` e `@supports` foram mantidas. A ordem dos blocos que ainda se sobrepõem foi conservada: não reorganize regras apenas por largura sem verificar a cascata.

## CSS global

`src/styles/globals.css` contém o import do Tailwind, tokens da marca, box-sizing, documento, fontes, títulos, foco, links, estados desabilitados, preferências de movimento e o tema global. Não contém estilos de campanha, formulário, cabeçalho, dashboard ou demonstração.

## Como validar uma alteração

Execute `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test` e `npm.cmd run build`. O teste de CSS verifica imports e chaves estáticas que o TypeScript não valida. As classes calculadas dos cartões mobile também precisam ser conferidas ao alterar seus nomes.

Uma compilação aprovada não comprova aparência. Confira o componente afetado no navegador, em claro/escuro e desktop/mobile, incluindo foco, hover, carrossel e modal quando aplicável.

## Nomes locais e inspeção no DevTools

Use nomes que identifiquem o componente e a finalidade: `footerRoot`, `navigationList`, `socialLink`, `consultFormInput` e `participantCardSurface`. Mantenha as referências TSX e os `composes` sincronizados ao renomear. As receitas compartilhadas também usam nomes descritivos, como `layoutShell` e `cardDashboardCard`.

Os elementos estruturais e controles têm hooks estáveis `data-ui`. Procure, por exemplo, `[data-ui~="site-footer"]`, `[data-ui~="footer-contact-toggle"]`, `[data-ui~="footer-contact-actions"]`, `[data-ui~="social-link"]`, `[data-ui~="participation-desktop"]` e `[data-ui~="center-swipe-carousel"]`. Os hooks anteriores foram preservados; o atributo pode conter vários tokens, portanto use `~=`. Componentes de marca e carrossel sempre incluem seu hook, mesmo quando o chamador não informa `styleHooks`.
