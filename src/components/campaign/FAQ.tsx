"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FAQ.module.css";
import stylesSectionHeading from "../ui/SectionHeading.module.css";
import stylesButton from "../ui/Button.module.css";
import Link from "next/link";
import { ChevronDown, ArrowRight, Eye, FileText } from "lucide-react";
import { LuEyeClosed } from "react-icons/lu";
import { campaign, faq } from "@/utils/campaign/campaign";
import { openFaqQuestion } from "@/utils/campaign/faqNavigation";
export function FAQ({ standalone = false }: {
  standalone?: boolean;
}) {
  const faqGridRef = useRef<HTMLDivElement>(null);
  const [areAllQuestionsOpen, setAreAllQuestionsOpen] = useState(false);

  useEffect(() => {
    /** Abre links diretos e os acessos vindos do painel do participante. */
    function openLinkedQuestion() {
      const question = document.getElementById(window.location.hash.slice(1));
      if (!(question instanceof HTMLDetailsElement) || !faqGridRef.current?.contains(question)) return;

      openFaqQuestion(question);
      question.scrollIntoView({ block: "start" });
    }

    openLinkedQuestion();
    window.addEventListener("hashchange", openLinkedQuestion);
    return () => window.removeEventListener("hashchange", openLinkedQuestion);
  }, []);

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
    className={styles.faqSection}
    data-ui="section shell campaign-section campaign-faq"
    id="duvidas"
  >
    <div className={stylesSectionHeading.sectionHeadingSectionHead} data-ui="section-head">
      <div>
        <h2>Dúvidas frequentes</h2>
        <p>Tire suas dúvidas sobre a promoção.</p>
      </div>
      <button data-ui="faq-toggle-button"
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
      {/* Perguntas carregadas da lista faq em @/utils/campaign/campaign. */}
      {faq.map(([q, a, id]) => (<details id={id} key={q} onToggle={updateAllQuestionsState}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.removeAttribute("data-faq-highlight");
          }
        }}
      >
        <summary>
          <span>{q}</span>
          <ChevronDown className={styles.faqGridToggle} size={18} aria-hidden="true" />
        </summary>
        <p>{a}</p>
      </details>))}
    </div>
    {/* Área de acesso ao regulamento oficial. */}
    <div className={styles.faqRegulationCard} data-ui="regulation-card" id="regulamento">
      <FileText />
      <div>
        <h3>Regulamento da promoção</h3>
        <p>
          Consulte o regulamento completo da campanha ou baixe o documento em PDF.
        </p>
      </div>
      <Link className={stylesButton.button} data-ui="button" href={campaign.legal.regulationUrl}>
        Ler regulamento <ArrowRight size={16} />
      </Link>
      <a className={stylesButton.buttonOutlineButton} data-ui="outline-button" href={campaign.legal.regulationPdfUrl} download>
        Baixar PDF
      </a>
    </div>
    {standalone && (<Link className={stylesButton.buttonTextLink} data-ui="text-link" href="/10-anos">
      Voltar à campanha
    </Link>)}
  </section>);
}
