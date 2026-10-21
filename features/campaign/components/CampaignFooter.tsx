import styles from "./CampaignFooter.module.css";
import stylesLayout from "../../../components/ui/Layout.module.css";
import Link from "next/link";
import { campaign } from "@/features/campaign/model/campaign";
/** Renderiza os créditos e o acesso ao regulamento da campanha. */
export function CampaignFooter() {
  return (<footer className={styles.root} data-ui="site-footer">
    <div className={stylesLayout.shell} data-ui="shell">
      <span>© Netbox 10 Anos · {campaign.tagline}</span>
      <span>
        Pagina desenvolvida por <a href="https://matheuslufano.github.io/Meu-Portfolio/" target="_blank" rel="noopener noreferrer">Matheus Mota 🧑‍💻</a>
      </span>
      <Link href="/10-anos/regulamento">Regulamento</Link>
    </div>
  </footer>);
}
