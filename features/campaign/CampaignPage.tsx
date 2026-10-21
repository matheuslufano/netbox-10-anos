import styles from "./CampaignPage.module.css";
import stylesCampaignHero from "./components/CampaignHero.module.css";
import { CampaignFooter } from "@/features/campaign/components/CampaignFooter";
import { ParticipationMobile } from "@/features/campaign/components/ParticipationMobile";
import { CampaignActions } from "@/features/campaign/components/CampaignActions";
import { CampaignHero } from "@/features/campaign/components/CampaignHero";
import { Header } from "@/components/layout/Header";
import { CommercialBand } from "@/features/campaign/components/CommercialBand";
import { PrizeBanner } from "@/features/campaign/components/PrizeBanner";
import { WinnersPreview } from "@/features/campaign/components/WinnersPreview";
import { FAQ } from "@/features/campaign/components/FAQ";
import { HistoryBand } from "@/features/campaign/components/HistoryBand";
import { ConsultForm } from "@/features/campaign/components/ConsultForm";
import { ParticipationDesktop } from "@/features/campaign/components/ParticipationDesktop";
/** Compõe a campanha pública sem concentrar regras ou estilos das suas seções. */
export default function CampaignPage() {
  return (
    <>
      <Header />
      <main className={styles.root} data-ui="campaign-page">
        <div className={styles.opening}>
          <CampaignHero />
          <div className={styles.consultationWrap} data-ui="shell">
            <ConsultForm />
          </div>

          <div className={styles.rewardFlow} data-ui="campaign-reward-flow">
            <span className={styles.rewardCircle} aria-hidden="true" />
            <CampaignActions />

            <div className={styles.prizeWrap} data-ui="shell">
              <PrizeBanner />
            </div>
          </div>
        </div>
        <div className={styles.participationAnchor} id="como-participar" />
        <ParticipationDesktop />
        <ParticipationMobile />
        <CommercialBand />
        <HistoryBand />
        <div className={styles.supportFlow} data-ui="campaign-support-flow">
          <span className={stylesCampaignHero.circle} aria-hidden="true" />
          <WinnersPreview />
          <FAQ />
        </div>
        <CampaignFooter />
      </main>
    </>
  );
}
