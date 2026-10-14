"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  FilePlus2,
  Smartphone,
  Ticket,
  UserRound,
} from "lucide-react";

const participationSteps = [
  {
    title: "Seja cliente Netbox",
    description: "Clientes ativos já participam da campanha.",
    details:
      "Clientes ativos entram na campanha conforme os critérios de elegibilidade. O cadastro e a validação das ações determinam os números que aparecem na consulta.",
    icon: UserRound,
  },
  {
    title: "Faça uma ação válida",
    description: "Indique, renove, faça upgrade ou contrate um plano.",
    details:
      "Você pode indicar um amigo, renovar, fazer upgrade ou contratar um plano. Cada ação precisa ser validada; uma indicação conta quando gera um contrato elegível e ativado.",
    icon: FilePlus2,
  },
  {
    title: "Acumule números da sorte",
    description:
      "Cada ação validada gera números para participar dos sorteios.",
    details:
      "A campanha informa 1 número por contrato ativo, 5 por indicação convertida e 2 por renovação elegível ou novo contrato. Os números são disponibilizados após a validação.",
    icon: Ticket,
  },
  {
    title: "Acompanhe pelo app",
    description: "Consulte seus números e veja os resultados da campanha.",
    details:
      "Informe seu CPF na consulta de participação para conferir os números acumulados. Acompanhe também os resultados e as atualizações oficiais da campanha.",
    icon: Smartphone,
  },
] as const;

/** Exibe as etapas da campanha com uma explicação por vez no desktop. */
export function ParticipationDesktop() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section
      className="section participation-desktop"
      aria-labelledby="participation-desktop-title"
    >
      <div className="participation-desktop__inner">
        <div className="participation-desktop__hero">
          <div className="participation-desktop__intro">
            <span className="participation-desktop__eyebrow">
              Como participar
            </span>
            <h2 id="participation-desktop-title">
              Como participar
              <span>do sorteio de 10 anos</span>
            </h2>
            <p>
              Acumule números da sorte ao contratar, renovar, indicar
              <br className="participation-desktop__wide-break" /> ou acompanhar
              a campanha pelo app Netbox.
            </p>
          </div>
          <div className="participation-desktop__visual">
            <Image
              className="participation-desktop__anniversary"
              src="/images/netbox-10-anos/LOG%201%20SITE.png"
              alt=""
              width={489}
              height={205}
              sizes="(max-width: 900px) 36vw, 40vw"
            />
          </div>
        </div>

        <ol className="participation-desktop__steps">
          {participationSteps.map(({ title, description, icon: Icon }, index) => {
            const isExpanded = expandedStep === index;

            return (
              <li
                className="participation-desktop__step"
                data-expanded={isExpanded}
                key={title}
              >
                <button
                  id={`participation-step-${index}`}
                  className="participation-desktop__summary"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={isExpanded ? "participation-step-details" : undefined}
                  onClick={() =>
                    setExpandedStep((currentStep) =>
                      currentStep === index ? null : index,
                    )
                  }
                >
                  <span className="participation-desktop__icon" aria-hidden="true">
                    <Icon size={42} strokeWidth={1.7} />
                  </span>
                  <span className="participation-desktop__step-copy">
                    <span className="participation-desktop__step-title">
                      <span>{index + 1}.</span> {title}
                    </span>
                    <span className="participation-desktop__step-description">
                      {description}
                    </span>
                  </span>
                  <span className="participation-desktop__expand" aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>
                {index < participationSteps.length - 1 && (
                  <ChevronRight
                    className="participation-desktop__next"
                    size={30}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>

        {expandedStep !== null && (
          <div
            id="participation-step-details"
            className="participation-desktop__expanded"
            role="region"
            aria-labelledby={`participation-step-${expandedStep}`}
          >
            <div>
              <span className="participation-desktop__expanded-label">
                Etapa {expandedStep + 1}
              </span>
              <h3>{participationSteps[expandedStep].title}</h3>
            </div>
            <p>{participationSteps[expandedStep].details}</p>
          </div>
        )}

        <a className="participation-desktop__cta" href="#consulta">
          Consultar meus números <ArrowRight size={25} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
