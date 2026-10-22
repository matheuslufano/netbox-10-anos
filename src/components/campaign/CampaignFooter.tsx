
"use client";

import styles from "./CampaignFooter.module.css";
import stylesLayout from "../ui/Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import { CgArrowRightO } from "react-icons/cg";
import { contactChannels } from "@/components/contacts/HeaderContactLinks";
import { useState } from "react";

const PORTFOLIO_URL =
  "https://matheuslufano.github.io/Meu-Portfolio/";

export function CampaignFooter() {
  const currentYear = new Date().getFullYear();
  const [contactsOpen, setContactsOpen] = useState(false);

  return (
    <footer className={styles.footerRoot} data-ui="site-footer">
      {/* Seção principal: links institucionais */}
      <div data-ui="footer-main" className={styles.footerMain}>
        <div className={stylesLayout.layoutShell} data-ui="shell">
          <nav data-ui="footer-links"
            className={styles.footerLinks}
            aria-label="Links institucionais"
          >
            <div data-ui="footer-institutional-row" className={styles.footerInstitutionalRow}>
              <Link data-ui="footer-institutional-link" href="/10-anos/regulamento">Regulamento</Link>

              <Link data-ui="footer-institutional-link" href="/politica-de-privacidade">
                Política de Privacidade
              </Link>

              <button data-ui="footer-contact-toggle"
                className={styles.footerContactToggle}
                type="button"
                aria-expanded={contactsOpen}
                aria-controls="footer-contact-actions"
                onClick={() => setContactsOpen((isOpen) => !isOpen)}
              >
                Contato
              </button>
            </div>

            {contactsOpen && (
              <div data-ui="footer-contact-actions"
                id="footer-contact-actions"
                className={styles.footerContactActions}
                role="group"
                aria-label="Contatos da Netbox"
              >
                {contactChannels.map(({ label, href, Icon }) => (
                  <a data-ui="social-link"
                    className={styles.socialLink}
                    key={href}
                    href={href}
                    aria-label={label}
                    title={label}
                    target={href.startsWith("https://") ? "_blank" : undefined}
                    rel={
                      href.startsWith("https://")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Seção inferior: copyright e créditos */}
      <div data-ui="footer-bottom" className={styles.footerBottom}>
        <div className={stylesLayout.layoutShell} data-ui="shell">
          <div data-ui="footer-bottom-content" className={styles.footerBottomContent}>
            <span data-ui="footer-copyright" className={styles.footerCopyright}>
              © {currentYear} Netbox - 10 anos. Todos os direitos reservados a
              Netbox Internet Ltda.
            </span>

            <span data-ui="footer-credit" className={styles.footerCredit}>
              Site desenvolvido por{" "}
              <span data-ui="footer-portfolio-wrapper" className={styles.footerPortfolioWrapper}>
                <a data-ui="footer-portfolio-link"
                  className={styles.footerPortfolioLink}
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Matheus Mota 🧑‍💻
                </a>

                <a data-ui="footer-portfolio-preview"
                  className={styles.footerPortfolioPreview}
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    className={styles.footerPortfolioImage}
                    src="/images/matheus/portfolio-preview.png"
                    alt=""
                    width={320}
                    height={180}
                  />

                  <span data-ui="footer-preview-content" className={styles.footerPreviewContent}>
                    <strong>Matheus Mota</strong>
                    <span>Desenvolvedor Web · UI/UX</span>
                    <span data-ui="footer-preview-action" className={styles.footerPreviewAction}>
                      Conheça meu portfólio <CgArrowRightO />
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
