import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { CampaignFooter } from "@/components/campaign/CampaignFooter";
import { campaign } from "@/utils/campaign/campaign";
import { regulation } from "@/utils/campaign/regulation";
import styles from "./RegulationPage.module.css";

/** Exibe a transcrição completa da V1 e o PDF original, sem exigir autenticação. */
export default function RegulationPage() {
  return (
    <>
      <Header returnHome />
      <main className={styles.regulationPageContent} data-ui="shell regulation-page">
        <header className={styles.pageHeading}>
          {/* <FileText size={44} aria-hidden="true" /> */}
          <p className={styles.eyebrow}>Show de Prêmios Netbox 10 Anos</p>
          <h1>Regulamento da promoção</h1>
          <p>Leia o conteúdo completo abaixo ou baixe o documento em PDF.</p>
          <div className={styles.actions}>
            <a className={styles.downloadButton} href={campaign.legal.regulationPdfUrl} download>
              <Download size={18} aria-hidden="true" /> Baixar regulamento em PDF
            </a>
            {/* <Link className={styles.backLink} href="/10-anos">
              <ArrowLeft size={18} aria-hidden="true" /> Voltar à campanha
            </Link> */}
          </div>
        </header>
        <nav className={styles.contents} aria-label="Seções do regulamento">
          <h2>Neste regulamento</h2>
          <ol>
            {regulation.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
            ))}
          </ol>
        </nav>
        <article className={styles.document} aria-label={regulation.title}>
          <h2 className={styles.documentTitle}>{regulation.title}</h2>
          <section className={styles.promoter} aria-labelledby="empresa-promotora">
            <h3 id="empresa-promotora">EMPRESA PROMOTORA</h3>
            {regulation.promoter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
          {regulation.sections.map((section) => (
            <section className={styles.documentSection} key={section.id} aria-labelledby={section.id}>
              <h3 id={section.id}>{section.title}</h3>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>
          ))}
        </article>
      </main>
      <CampaignFooter />
    </>
  );
}
