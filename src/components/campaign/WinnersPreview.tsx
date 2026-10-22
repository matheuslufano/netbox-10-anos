import styles from "./WinnersPreview.module.css";
import stylesSectionHeading from "../ui/SectionHeading.module.css";
import stylesButton from "../ui/Button.module.css";
import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";
/** Exibe o estado de ganhadores ainda não publicados, sem criar participantes fictícios. */
export function WinnersPreview() {
  return (<section className={styles.winnersPreviewSection} data-ui="section shell campaign-section" id="ganhadores">
    <div className={stylesSectionHeading.sectionHeadingSectionHead} data-ui="section-head">
      <div>
        <h2>Ganhadores</h2>
        <p>Acompanhe os ganhadores da promoção Netbox 10 Anos.</p>
      </div>
      <Link className={stylesButton.buttonOutlineButton} data-ui="outline-button" href="/10-anos/ganhadores">
        Ver todos os ganhadores <ArrowRight size={16} />
      </Link>
    </div>
    <div data-ui="winners-preview-winner-grid" className={styles.winnersPreviewWinnerGrid}>
      {Array.from({ length: 4 }, (_, i) => (<article className={styles.winnersPreviewWinnerCard} data-ui="winner-card" key={i}>
        <span data-ui="winners-preview-avatar" className={styles.winnersPreviewAvatar}>
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
