import styles from "./HistoryBand.module.css";
import stylesTypography from "../ui/Typography.module.css";
import { Rocket, MapPin, UsersRound, BadgeCheck, HeartHandshake } from "lucide-react";
import { campaign } from "@/utils/campaign/campaign";
export function HistoryBand() {
  return (<section data-ui="history-band-root" className={styles.historyBandRoot}>
    <div data-ui="history-band-decoration" className={styles.historyBandDecoration} aria-hidden="true">
      <span data-ui="history-band-rocket" className={styles.historyBandRocket}>
        <Rocket size={76} strokeWidth={1.25} />
      </span>
    </div>
    <div className={styles.historyBandHistoryInnerLayout} data-ui="shell history-inner">
      <div>
        <span className={stylesTypography.typographyEyebrow} data-ui="eyebrow">NOSSA HISTÓRIA</span>
        <h2>10 anos conectando o Tocantins.</h2>
        <p>
          Mais do que internet, a Netbox sempre acreditou na força das
          pessoas, das cidades e das histórias que se conectam todos os dias.
        </p>
      </div>
      {/* Indicadores institucionais alimentados por campaign.institutional. */}
      <div data-ui="history-band-history-stats" className={styles.historyBandHistoryStats}>
        <p>
          <MapPin /> <b>{campaign.institutional.cities}</b> cidades conectadas
        </p>
        <p>
          <UsersRound /> <b>{campaign.institutional.clients}</b> clientes
        </p>
        <p>
          <BadgeCheck /> Internet de verdade
        </p>
        <p>
          <HeartHandshake /> Amizade que conecta
        </p>
        <small>Indicadores institucionais pendentes de confirmação.</small>
      </div>
    </div>
  </section>);
}
