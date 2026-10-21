import styles from "./CampaignActions.module.css";
import { CenterSwipeCarousel } from "@/components/ui/CenterSwipeCarousel";
import { actions } from "@/features/campaign/model/campaign";
/** Exibe as ações e suas quantidades de números em grade ou carrossel mobile. */
export function CampaignActions() {
  return (
    <section
      className={styles.section}
      data-ui="section shell campaign-section campaign-actions"
      id="acoes"
      aria-labelledby="campaign-actions-title"
    >
      <header className={styles.headerLayout} data-ui="section-head">
        <div>
          <h2 id="campaign-actions-title">Como ganhar números da sorte?</h2>
          <p>
            Cada ação válida gera uma quantidade específica de números da sorte.
          </p>
        </div>
      </header>

      <CenterSwipeCarousel
        className={styles.grid}
        ariaLabel="Ações que geram números da sorte"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <article
              data-carousel-item
              className={styles.item}
              key={action.title}
            >
              <div className={styles.ticket} data-ui="campaign-actions__ticket">
                <div className={styles.ticketPanel}>
                  <Icon className={styles.icon} aria-hidden="true" />
                  <h3 className={styles.title}>{action.title}</h3>
                  <div className={styles.reward}>
                    <span className={styles.label}>Ganhe</span>
                    <strong className={styles.quantity}>
                      {action.amount}{" "}
                      {action.amount === 1 ? "número" : "números"}
                      <br />
                      da sorte
                    </strong>
                  </div>
                  <p className={styles.description}>{action.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </CenterSwipeCarousel>
    </section>
  );
}
