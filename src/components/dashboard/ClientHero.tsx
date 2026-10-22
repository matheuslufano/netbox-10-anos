import styles from "./ClientHero.module.css";
import { CampaignBrand } from "@/components/campaign/CampaignBrand";
/** Apresenta a mensagem de participação e a marca correspondente ao tema. */
export function ClientHero() {
  return (<section className={styles.clientHeroRoot} data-ui="client-hero">
    <CampaignBrand
      className={styles.clientHeroBrand}
      src="/images/netbox-10-anos/LOG%203%20SITE.png"
      darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
      alt="Show de Prêmios Netbox 10 Anos. Conectando pessoas e construindo histórias."
      width={2172}
      height={724}
      sizes="(max-width: 640px) 84vw, (max-width: 1100px) 42vw, 480px"
    />
    <div data-ui="client-hero-copy" className={styles.clientHeroCopy}>
      <span data-ui="client-hero-eyebrow" className={styles.clientHeroEyebrow}>Netbox 10 anos</span>
      <h1>Parabéns por fazer parte dessa história!</h1>
      <p>
        Aqui você acompanha sua participação na promoção Netbox 10 Anos.
      </p>
    </div>
  </section>);
}
