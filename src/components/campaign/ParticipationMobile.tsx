import styles from "./ParticipationMobile.module.css";
import { ArrowRight } from "lucide-react";
import { CenterSwipeCarousel } from "@/components/ui/CenterSwipeCarousel";
import { participationIntro, participationSteps } from "@/utils/campaign/participation";

/** Variantes explícitas permitem verificar as referências CSS durante os testes. */
const stepCardVariants = [
  styles.participationMobileParticipationCard1,
  styles.participationMobileParticipationCard2,
  styles.participationMobileParticipationCard3,
] as const;
/** Apresenta as etapas no carrossel mobile, preservando os gatilhos do tema automático. */
export function ParticipationMobile() {
  return (<section
    data-participation-section
    className={styles.participationMobileSection}
    data-ui="section shell campaign-section campaign-steps"
    aria-labelledby="participation-title"
  >
    <CenterSwipeCarousel
      className={styles.participationMobileStepsGrid}
      ariaLabel="Etapas para participar da campanha"
      focusTheme
    >
      <article data-ui="participation-mobile-cover" data-carousel-item className={styles.participationMobileCover}>
        <div data-ui="participation-mobile-cover-copy" className={styles.participationMobileCoverCopy}>
          <h2 id="participation-title">Como <span>participar?</span></h2>
          <p>{participationIntro.description}</p>
        </div>
        <span data-ui="participation-mobile-desktop-hint" className={styles.participationMobileDesktopHint}>
          Deslize e confira <ArrowRight size={17} />
        </span>
        <button data-ui="participation-mobile-mobile-hint" type="button" className={styles.participationMobileMobileHint} data-carousel-next>
          Deslize para ver como <ArrowRight size={17} />
        </button>
      </article>
      {participationSteps.map(({ title, description }, index) => (<article data-ui="participation-mobile-article"
        data-carousel-item
        className={[styles.participationMobileStepCardLayout, stepCardVariants[index]].join(" ")}
        key={title}
      >
        <div data-ui="participation-mobile-card-copy" className={styles.participationMobileCardCopy}>
          <h3>{title.split(["de 10 anos da Netbox", "números da sorte", "a campanha"][index])[0]}<span>{["de 10 anos da Netbox", "números da sorte", "a campanha"][index]}</span></h3>
          <p>{description}</p>
        </div>
      </article>))}
    </CenterSwipeCarousel>
  </section>);
}
