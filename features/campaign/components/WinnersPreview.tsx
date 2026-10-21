import styles from "./WinnersPreview.module.css";
import stylesSectionHeading from "../../../components/ui/SectionHeading.module.css";
import stylesButton from "../../../components/ui/Button.module.css";
import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";
/** Exibe o estado de ganhadores ainda não publicados, sem criar participantes fictícios. */
export function WinnersPreview() {
  return (<section className={styles.section} data-ui="section shell campaign-section" id="ganhadores">
    <div className={stylesSectionHeading.sectionHead} data-ui="section-head">
      <div>
        <h2>Ganhadores</h2>
        <p>Acompanhe os ganhadores da promoção Netbox 10 Anos.</p>
      </div>
      <Link className={stylesButton.outlineButton} data-ui="outline-button" href="/10-anos/ganhadores">
        Ver todos os ganhadores <ArrowRight size={16} />
      </Link>
    </div>
    <div className={styles.winnerGrid}>
      {Array.from({ length: 4 }, (_, i) => (<article className={styles.winnerCard} data-ui="winner-card" key={i}>
        <span className={styles.avatar}>
          <UsersRound />
        </span>
        <div>
          <strong>Em breve</strong>
          <p>Aguardando os próximos sorteios.</p>
        </div>
      </article>))}
    </div>
  </section>);
}
