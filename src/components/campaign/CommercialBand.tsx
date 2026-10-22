"use client";
import styles from "./CommercialBand.module.css";
import stylesButton from "../ui/Button.module.css";
import { ArrowRight, Target } from "lucide-react";
import { commercialActions } from "@/utils/campaign/campaign";
/** Exibe as ações comerciais e sinaliza apenas cliques com destino configurado. */
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
          className={stylesButton.button} data-ui="button"
          href={a.href}
          aria-disabled={a.href === "#"}
          onClick={(e) => {
            if (a.href === "#")
              e.preventDefault();
            else
              track(a.key);
          }}
        >
          {a.cta} <ArrowRight size={15} />
        </a>
        {a.href === "#" && <small>Destino comercial pendente</small>}
      </article>))}
    </div>
  </section>);
}
