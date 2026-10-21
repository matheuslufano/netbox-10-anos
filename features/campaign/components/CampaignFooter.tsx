
import styles from "./CampaignFooter.module.css";
import stylesLayout from "../../../components/ui/Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import { CgArrowRightO } from "react-icons/cg";

const PORTFOLIO_URL =
  "https://matheuslufano.github.io/Meu-Portfolio/";

export function CampaignFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.root} data-ui="site-footer">
      {/* Seção principal: links institucionais */}
      <div className={styles.footerMain}>
        <div className={stylesLayout.shell} data-ui="shell">
          <nav
            className={styles.footerLinks}
            aria-label="Links institucionais"
          >
            <Link href="/10-anos/regulamento">
              Regulamento
            </Link>

            <Link href="/politica-de-privacidade">
              Política de Privacidade
            </Link>

            <Link href="/contato">
              Contato
            </Link>
          </nav>
        </div>
      </div>

      {/* Seção inferior: copyright e créditos */}

<div className={styles.footerBottom}>
  <div className={stylesLayout.shell} data-ui="shell">
    <div className={styles.footerBottomContent}>
      <span className={styles.copyright}>
        © {currentYear} Netbox - 10 anos. Todos os direitos reservados a Netbox Internet Ltda.
      </span>

      <span className={styles.footerCredit}>
        Site desenvolvido por{" "}
        <span className={styles.portfolioWrapper}>
          <a
            className={styles.portfolioLink}
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            @Matheus Mota 🧑‍💻
          </a>

          <a
            className={styles.portfolioPreview}
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              className={styles.portfolioImage}
              src="/images/matheus/portfolio-preview.png"
              alt=""
              width={320}
              height={180}
            />

            <span className={styles.previewContent}>
              <strong>Matheus Mota</strong>
              <span>Desenvolvedor Web · UI/UX</span>
              <span className={styles.previewAction}>
                Conheça meu portfólio import <CgArrowRightO />
              </span>
            </span>
          </a>
        </span>
      </span>
    </div>
  </div>
</div>

    </footer>
  );
}
