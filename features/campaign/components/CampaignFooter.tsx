
"use client";

import styles from "./CampaignFooter.module.css";
import stylesLayout from "../../../components/ui/Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import { CgArrowRightO } from "react-icons/cg";
import { contactChannels } from "@/features/contacts/components/HeaderContactLinks";
import { useState } from "react";

const PORTFOLIO_URL =
  "https://matheuslufano.github.io/Meu-Portfolio/";

export function CampaignFooter() {
  const currentYear = new Date().getFullYear();
  const [contactsOpen, setContactsOpen] = useState(false);

  return (
    <footer className={styles.root} data-ui="site-footer">
      {/* Seção principal: links institucionais */}
      <div className={styles.footerMain}>
        <div className={stylesLayout.shell} data-ui="shell">
          <nav
            className={styles.footerLinks}
            aria-label="Links institucionais"
          >
            <div className={styles.institutionalRow}>
              <Link href="/10-anos/regulamento">Regulamento</Link>

              <Link href="/politica-de-privacidade">
                Política de Privacidade
              </Link>

              <button
                className={styles.contactToggle}
                type="button"
                aria-expanded={contactsOpen}
                aria-controls="footer-contact-actions"
                onClick={() => setContactsOpen((isOpen) => !isOpen)}
              >
                Contato
              </button>
            </div>

            {contactsOpen && (
              <div
                id="footer-contact-actions"
                className={styles.contactActions}
                role="group"
                aria-label="Contatos da Netbox"
              >
                {contactChannels.map(({ label, href, Icon }) => (
                  <a
                    className={styles.contactButton}
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
      <div className={styles.footerBottom}>
        <div className={stylesLayout.shell} data-ui="shell">
          <div className={styles.footerBottomContent}>
            <span className={styles.copyright}>
              © {currentYear} Netbox - 10 anos. Todos os direitos reservados a
              Netbox Internet Ltda.
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
