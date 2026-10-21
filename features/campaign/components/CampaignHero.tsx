import styles from "./CampaignHero.module.css";
import stylesAccessibility from "../../../components/ui/Accessibility.module.css";
import { CampaignBrand } from "@/features/campaign/components/CampaignBrand";
import { netboxContacts } from "@/features/contacts/model/netboxContacts";
/** Apresenta a abertura com marcas e ofertas próprias para desktop e mobile. */
export function CampaignHero() {
  return (<section
    className={styles.root}
    data-ui="campaign-hero"
    id="inicio"
    aria-labelledby="campaign-hero-title"
  >
    <span className={styles.circle} aria-hidden="true" />
    <h1 className={stylesAccessibility.srOnly} id="campaign-hero-title">
      Show de Prêmios Netbox 10 Anos
    </h1>
    <div className={styles.inner}>
      <header className={styles.brand}>
        <div className={styles.responsiveImage}>
          <CampaignBrand
            className={styles.logo}
            src="/images/netbox-10-anos/LOG 3 SITE.png"
            darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
            alt="Conectando pessoas e construindo histórias."
            width={2172}
            height={724}
            sizes="(max-width: 700px) 100vw, 480px"
          />
        </div>
      </header>

      <div className={styles.mobile}>
        <span className={styles.circleMobileLayout} aria-hidden="true" />
        <CampaignBrand
          className={styles.mobileLogo}
          src="/logos/LOG%201%20SITE.png"
          darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
          alt="Conectando pessoas e construindo histórias."
          width={489}
          height={204}
          sizes="(max-width: 700px) 54.3vw, 489px"
        />
        <div className={styles.mobilePrize}>
          <span>CLIENTE NETBOX CONCORRE A</span>
          <strong>R$ 20 MIL REAIS</strong>
          <b>EM PRÊMIOS!</b>
        </div>
        <p className={styles.mobileMessage}>
          Contrate, indique ou renove seu plano e ganhe um número da sorte
          para participar do Show de Prêmios Netbox 10 Anos.
        </p>
        <p className={styles.mobileDate}>
          SORTEIO DIA 30 DE JANEIRO DE 2027, AO VIVO NO{" "}
          <a
            className={styles.instagram}
            href={netboxContacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM DA NETBOX INTERNET
          </a>
        </p>
        <span className={styles.mobileAccentTopLayout} aria-hidden="true" />
        <span className={styles.mobileAccentBottomLayout} aria-hidden="true" />
      </div>

      <div className={styles.offers}>
        <div className={styles.prize}>
          <p>CLIENTE NETBOX CONCORRE A</p>
          <strong>R$ 20 MIL REAIS</strong>
          <b>EM PRÊMIOS!</b>
        </div>
        <p className={styles.message}>
          Contrate, indique ou renove seu plano e ganhe um número da sorte
          para participar do Show de Prêmios Netbox 10 Anos.
        </p>
      </div>

      <p className={styles.date}>
        SORTEIO DIA 30 DE JANEIRO DE 2027, AO VIVO NO{" "}
        <a
          className={styles.instagram}
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
