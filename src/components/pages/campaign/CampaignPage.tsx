import styles from "./CampaignPage.module.css";
import stylesCampaignHero from "../../campaign/CampaignHero.module.css";
import { CampaignFooter } from "@/components/campaign/CampaignFooter";
import { ParticipationMobile } from "@/components/campaign/ParticipationMobile";
import { CampaignActions } from "@/components/campaign/CampaignActions";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { Header } from "@/components/layout/Header";
import { CommercialBand } from "@/components/campaign/CommercialBand";
import { PrizeBanner } from "@/components/campaign/PrizeBanner";
import { WinnersPreview } from "@/components/campaign/WinnersPreview";
import { FAQ } from "@/components/campaign/FAQ";
import { HistoryBand } from "@/components/campaign/HistoryBand";
import { ConsultForm } from "@/components/campaign/ConsultForm";
import { ParticipationDesktop } from "@/components/campaign/ParticipationDesktop";
/** Compõe a campanha pública sem concentrar regras ou estilos das suas seções. */
export default function CampaignPage() {
  return (
    <>
      <Header />
      <main className={styles.campaignPageRoot} data-ui="campaign-page">
        <div data-ui="campaign-page-opening" className={styles.campaignPageOpening}>
          <CampaignHero />
          <div className={styles.campaignPageConsultationWrap} data-ui="shell">
            <ConsultForm />
          </div>

          <div className={styles.campaignPageRewardFlow} data-ui="campaign-reward-flow">
            <span data-ui="campaign-page-reward-circle" className={styles.campaignPageRewardCircle} aria-hidden="true" />
            <CampaignActions />

            <div className={styles.campaignPagePrizeWrap} data-ui="shell">
              <PrizeBanner />
            </div>
          </div>
        </div>
        <div data-ui="campaign-page-participation-anchor" className={styles.campaignPageParticipationAnchor} id="como-participar" />
        <ParticipationDesktop />
        <ParticipationMobile />
        <CommercialBand />
        <HistoryBand />
        <div className={styles.campaignPageSupportFlow} data-ui="campaign-support-flow">
          <span data-ui="campaign-hero-circle" className={stylesCampaignHero.campaignHeroCircle} aria-hidden="true" />
          <WinnersPreview />
          <FAQ />
        </div>
        <CampaignFooter />
      </main>
    </>
  );
}
