"use client";
import styles from "./CommercialBand.module.css";
import { ArrowRight, Target } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { commercialActions } from "@/utils/campaign/campaign";
/** Leva ao WhatsApp oficial e preserva o evento de acompanhamento comercial. */
export function CommercialBand() {
  // Evento que permite rastrear cliques comerciais no restante do site.
  function track(action: string) {
    window.dispatchEvent(new CustomEvent("netbox:commercial-click", { detail: { action } }));
  }
  return (<section className={styles.commercialBandCampaignCommercialLayout} data-ui="commercial-band">
    <div className={styles.commercialBandCommercialGridLayout} data-ui="shell">
      <div data-ui="commercial-band-commercial-intro" className={styles.commercialBandCommercialIntro}>
        <Target size={72} />
        <div>
          <h2>
            Quer ganhar mais <em>números da sorte?</em>
          </h2>
          <p>Aproveite as oportunidades e participe.</p>

        </div>
      </div>
      {/* Cartões gerados a partir de commercialActions, em @/utils/campaign/campaign. */}
      {commercialActions.map((a) => (<article className={styles.commercialBandCommercialCard} data-ui="commercial-card" key={a.key}>
        <a.icon size={35} />
        <h3>{a.title}</h3>
        <strong>{a.amount}</strong>
        <a
          className={styles.commercialButton} data-ui="button"
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${a.cta} — falar com a Netbox pelo WhatsApp (abre em nova aba)`}
          onClick={() => track(a.key)}
        >
          <span className={styles.commercialButtonLabel}>{a.cta}</span>
          <span className={styles.commercialButtonIcons} aria-hidden="true">
            <ArrowRight className={styles.commercialButtonArrow} size={15} />
            <FaWhatsapp className={styles.commercialButtonWhatsapp} size={18} />
          </span>
        </a>
      </article>))}
    </div>
  </section>);
}
