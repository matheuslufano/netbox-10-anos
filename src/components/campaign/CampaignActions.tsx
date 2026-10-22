import styles from "./CampaignActions.module.css";
import { CenterSwipeCarousel } from "@/components/ui/CenterSwipeCarousel";
import { actions } from "@/utils/campaign/campaign";
/** Exibe as ações e suas quantidades de números em grade ou carrossel mobile. */
export function CampaignActions() {
  return (
    <section
      className={styles.campaignActionsSection}
      data-ui="section shell campaign-section campaign-actions"
      id="acoes"
      aria-labelledby="campaign-actions-title"
    >
      <header className={styles.campaignActionsHeaderLayout} data-ui="section-head">
        <div>
          <h2 id="campaign-actions-title">Como ganhar números da sorte?</h2>
          <p>
            Cada ação válida gera uma quantidade específica de números da sorte.
          </p>
        </div>
      </header>

      <CenterSwipeCarousel
        className={styles.campaignActionsGrid}
        ariaLabel="Ações que geram números da sorte"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <article data-ui="campaign-actions-item"
              data-carousel-item
              className={styles.campaignActionsItem}
              key={action.title}
            >
              <div className={styles.campaignActionsTicket} data-ui="campaign-actions__ticket">
                <div data-ui="campaign-actions-ticket-panel" className={styles.campaignActionsTicketPanel}>
                  <Icon className={styles.campaignActionsIcon} aria-hidden="true" />
                  <h3 data-ui="campaign-actions-title" className={styles.campaignActionsTitle}>{action.title}</h3>
                  <div data-ui="campaign-actions-reward" className={styles.campaignActionsReward}>
                    <span data-ui="campaign-actions-label" className={styles.campaignActionsLabel}>Ganhe</span>
                    <strong data-ui="campaign-actions-quantity" className={styles.campaignActionsQuantity}>
                      {action.amount}{" "}
                      {action.amount === 1 ? "número" : "números"}
                      <br />
                      da sorte
                    </strong>
                  </div>
                  <p data-ui="campaign-actions-description" className={styles.campaignActionsDescription}>{action.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </CenterSwipeCarousel>
    </section>
  );
}
