import styles from "./CampaignHero.module.css";
import stylesAccessibility from "../ui/Accessibility.module.css";
import { CampaignBrand } from "@/components/campaign/CampaignBrand";
import { netboxContacts } from "@/utils/contacts/netboxContacts";
/** Apresenta a abertura com marcas e ofertas próprias para desktop e mobile. */
export function CampaignHero() {
  return (<section
    className={styles.campaignHeroRoot}
    data-ui="campaign-hero"
    id="inicio"
    aria-labelledby="campaign-hero-title"
  >
    <span data-ui="campaign-hero-circle" className={styles.campaignHeroCircle} aria-hidden="true" />
    <h1 data-ui="accessibility-sr-only" className={stylesAccessibility.accessibilitySrOnly} id="campaign-hero-title">
      Show de Prêmios Netbox 10 Anos
    </h1>
    <div data-ui="campaign-hero-inner" className={styles.campaignHeroInner}>
      <header data-ui="campaign-hero-brand" className={styles.campaignHeroBrand}>
        <div data-ui="campaign-hero-responsive-image" className={styles.campaignHeroResponsiveImage}>
          <CampaignBrand
            className={styles.campaignHeroLogo}
            src="/images/netbox-10-anos/LOG 3 SITE.png"
            darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
            alt="Conectando pessoas e construindo histórias."
            width={2172}
            height={724}
            sizes="(max-width: 700px) 100vw, 480px"
          />
        </div>
      </header>

      <div data-ui="campaign-hero-mobile" className={styles.campaignHeroMobile}>
        <span data-ui="campaign-hero-circle-mobile-layout" className={styles.campaignHeroCircleMobileLayout} aria-hidden="true" />
        <CampaignBrand
          className={styles.campaignHeroMobileLogo}
          src="/logos/LOG%201%20SITE.png"
          darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
          alt="Conectando pessoas e construindo histórias."
          width={489}
          height={204}
          sizes="(max-width: 700px) 54.3vw, 489px"
        />
        <div data-ui="campaign-hero-mobile-prize" className={styles.campaignHeroMobilePrize}>
          <span>CLIENTE NETBOX CONCORRE A</span>
          <strong>R$ 20 MIL REAIS</strong>
          <b>EM PRÊMIOS!</b>
        </div>
        <p data-ui="campaign-hero-mobile-message" className={styles.campaignHeroMobileMessage}>
          Contrate, indique ou renove seu plano e ganhe um número da sorte
          para participar do Show de Prêmios Netbox 10 Anos.
        </p>
        <p data-ui="campaign-hero-mobile-date" className={styles.campaignHeroMobileDate}>
          SORTEIO DIA 30 DE JANEIRO DE 2027, AO VIVO NO{" "}
          <a data-ui="campaign-hero-instagram"
            className={styles.campaignHeroInstagram}
            href={netboxContacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM DA NETBOX INTERNET
          </a>
        </p>
        <span data-ui="campaign-hero-mobile-accent-top-layout" className={styles.campaignHeroMobileAccentTopLayout} aria-hidden="true" />
        <span data-ui="campaign-hero-mobile-accent-bottom-layout" className={styles.campaignHeroMobileAccentBottomLayout} aria-hidden="true" />
      </div>

      <div data-ui="campaign-hero-offers" className={styles.campaignHeroOffers}>
        <div data-ui="campaign-hero-prize" className={styles.campaignHeroPrize}>
          <p>CLIENTE NETBOX CONCORRE A</p>
          <strong>R$ 20 MIL REAIS</strong>
          <b>EM PRÊMIOS!</b>
        </div>
        <p data-ui="campaign-hero-message" className={styles.campaignHeroMessage}>
          Contrate, indique ou renove seu plano e ganhe um número da sorte
          para participar do Show de Prêmios Netbox 10 Anos.
        </p>
      </div>

      <p data-ui="campaign-hero-date" className={styles.campaignHeroDate}>
        SORTEIO DIA 30 DE JANEIRO DE 2027, AO VIVO NO{" "}
        <a data-ui="campaign-hero-instagram"
          className={styles.campaignHeroInstagram}
          href={netboxContacts.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM DA NETBOX INTERNET
        </a>
      </p>


    </div>
  </section>);
}
