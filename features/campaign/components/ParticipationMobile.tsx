import styles from "./ParticipationMobile.module.css";
import { ArrowRight } from "lucide-react";
import { CenterSwipeCarousel } from "@/components/ui/CenterSwipeCarousel";
import { participationIntro, participationSteps } from "@/features/campaign/model/participation";
/** Apresenta as etapas no carrossel mobile, preservando os gatilhos do tema automático. */
export function ParticipationMobile() {
  return (<section
    data-participation-section
    className={styles.section}
    data-ui="section shell campaign-section campaign-steps"
    aria-labelledby="participation-title"
  >
    <CenterSwipeCarousel
      className={styles.stepsGrid}
      ariaLabel="Etapas para participar da campanha"
      focusTheme
    >
      <article data-carousel-item className={styles.cover}>
        <div className={styles.coverCopy}>
          <h2 id="participation-title">Como <span>participar?</span></h2>
          <p>{participationIntro.description}</p>
        </div>
        <span className={styles.desktopHint}>
          Deslize e confira <ArrowRight size={17} />
        </span>
        <button type="button" className={styles.mobileHint} data-carousel-next>
          Deslize para ver como <ArrowRight size={17} />
        </button>
      </article>
      {participationSteps.map(({ title, description }, index) => (<article
        data-carousel-item
        className={[styles.stepCardLayout, styles[`participationCard${index + 1}`]].join(" ")}
        key={title}
      >
        <div className={styles.cardCopy}>
          <h3>{title.split(["de 10 anos da Netbox", "números da sorte", "a campanha"][index])[0]}<span>{["de 10 anos da Netbox", "números da sorte", "a campanha"][index]}</span></h3>
          <p>{description}</p>
        </div>
      </article>))}
    </CenterSwipeCarousel>
  </section>);
}
