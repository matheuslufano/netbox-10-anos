"use client";

import { useRef, useState } from "react";
import styles from "./FAQ.module.css";
import stylesSectionHeading from "../../../components/ui/SectionHeading.module.css";
import stylesButton from "../../../components/ui/Button.module.css";
import Link from "next/link";
import { ChevronDown, ArrowRight, Eye, FileText } from "lucide-react";
import { LuEyeClosed } from "react-icons/lu";
import { faq } from "@/features/campaign/model/campaign";
export function FAQ({ standalone = false }: {
  standalone?: boolean;
}) {
  const faqGridRef = useRef<HTMLDivElement>(null);
  const [areAllQuestionsOpen, setAreAllQuestionsOpen] = useState(false);

  /** Mantém o rótulo do controle sincronizado com a abertura individual das perguntas. */
  function updateAllQuestionsState() {
    const questions = Array.from(
      faqGridRef.current?.querySelectorAll("details") ?? [],
    );

    setAreAllQuestionsOpen(
      questions.length > 0 && questions.every((question) => question.open),
    );
  }

  /** Abre ou fecha todas as perguntas sem interferir no acionamento individual. */
  function toggleAllQuestions() {
    const shouldOpenQuestions = !areAllQuestionsOpen;

    faqGridRef.current?.querySelectorAll("details").forEach((question) => {
      question.open = shouldOpenQuestions;
    });
    setAreAllQuestionsOpen(shouldOpenQuestions);
  }

  return (<section
    className={styles.section}
    data-ui="section shell campaign-section campaign-faq"
    id="duvidas"
  >
    <div className={stylesSectionHeading.sectionHead} data-ui="section-head">
      <div>
        <h2>Dúvidas frequentes</h2>
        <p>Tire suas dúvidas sobre a promoção.</p>
      </div>
      <button
        aria-controls="perguntas-frequentes"
        aria-expanded={areAllQuestionsOpen}
        aria-label={areAllQuestionsOpen ? "Fechar todas as perguntas" : "Abrir todas as perguntas"}
        className={styles.faqToggleButton}
        onClick={toggleAllQuestions}
        title={areAllQuestionsOpen ? "Fechar todas as perguntas" : "Abrir todas as perguntas"}
        type="button"
      >
        {areAllQuestionsOpen
          ? <LuEyeClosed aria-hidden="true" size={20} style={{ color: "#292928" }} />
          : <Eye aria-hidden="true" size={20} style={{ color: "#292928" }} />}
      </button>
    </div>
    <div
      className={styles.faqGrid}
      data-ui="faq-grid"
      id="perguntas-frequentes"
      ref={faqGridRef}
    >
      {/* Perguntas carregadas da lista faq em @/features/campaign/model/campaign. */}
      {faq.map(([q, a]) => (<details key={q} onToggle={updateAllQuestionsState}>
        <summary>
          <span>{q}</span>
          <ChevronDown className={styles.faqGridToggle} size={18} aria-hidden="true" />
        </summary>
        <p>{a}</p>
      </details>))}
    </div>
    {/* Área de acesso ao regulamento oficial. */}
    <div className={styles.regulationCard} data-ui="regulation-card" id="regulamento">
      <FileText />
      <div>
        <h3>Regulamento da promoção</h3>
        <p>
          O regulamento oficial ainda não está disponível. O PDF de
          alinhamento não é o regulamento.
        </p>
      </div>
      <Link className={stylesButton.button} data-ui="button" href="/10-anos/regulamento">
        Ler regulamento <ArrowRight size={16} />
      </Link>
      <button className={stylesButton.outlineButton} data-ui="outline-button" disabled title="PDF oficial pendente">
        Baixar PDF
      </button>
    </div>
    {standalone && (<Link className={stylesButton.textLink} data-ui="text-link" href="/10-anos">
      Voltar à campanha
    </Link>)}
  </section>);
}
