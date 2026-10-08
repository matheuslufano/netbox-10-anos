"use client";
import "./client-page.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Ticket,
  X,
  Info,
  CalendarDays,
  ArrowRight,
  UserRound,
} from "lucide-react";
import { useConsultation } from "@/components/consultation-provider";
import {
  Header,
  AnniversaryMark,
  CommercialBand,
  PrizeBanner,
  HelpBand,
} from "@/components/shared";
import { campaign, dateBR } from "@/lib/campaign";
function NumbersModal({
  numbers,
  onClose,
}: {
  numbers: string[];
  onClose: () => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prior = document.activeElement as HTMLElement;
    close.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>(
          "[data-modal] button",
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-modal
      >
        <button
          ref={close}
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar lista"
        >
          <X />
        </button>
        <h2 id="modal-title">Todos os seus números da sorte</h2>
        <p>
          {numbers.length}{" "}
          {numbers.length === 1 ? "número disponível" : "números disponíveis"}
        </p>
        <div className="number-grid">
          {numbers.map((n, i) => (
            <span key={`${n}-${i}`}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function ClientPage() {
  const { data } = useConsultation();
  const [modal, setModal] = useState(false);
  if (!data)
    return (
      <>
        <Header returnHome />
        <main className="shell empty-client client-page">
          <Ticket size={48} />
          <h1>Consulte seus números da sorte</h1>
          <p>Para abrir seu painel, informe seu CPF na página da campanha.</p>
          <Link className="button" href="/10-anos#consulta">
            Ir para a consulta <ArrowRight size={17} />
          </Link>
        </main>
      </>
    );
  const origins = Object.entries(data.por_origem);
  return (
    <>
      <Header returnHome />
      <main className="client-main client-main--full client-page">
        <section className="client-hero">
          <AnniversaryMark />
          <div className="client-hero__copy">
            <span className="client-hero__eyebrow">Netbox 10 anos</span>
            <h1>Parabéns por fazer parte dessa história!</h1>
            <p>
              Aqui você acompanha sua participação na promoção Netbox 10 Anos.
            </p>
          </div>
        </section>
        <section
          className="dashboard-card participant-card"
          aria-label="Dados do CPF consultado"
        >
          <span className="participant-card__icon" aria-hidden="true">
            <UserRound size={23} />
          </span>
          <div className="participant-card__identity">
            <small>Consulta realizada para</small>
            <strong>{data.nome}</strong>
          </div>
          <div className="participant-card__document">
            <small>CPF consultado</small>
            <strong>{data.cpf}</strong>
          </div>
        </section>
        <div className="dashboard-top">
          <article className="dashboard-card balance-card">
            <span className="balance-icon">
              <Ticket size={52} />
            </span>
            <div>
              <h2>Você já acumulou</h2>
              <strong>{data.total}</strong>
              <b>{data.total === 1 ? "número da sorte" : "números da sorte"}</b>
              <p>na promoção Netbox 10 Anos.</p>
              <small>
                Consulta realizada em{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                  timeZone: "America/Araguaina",
                }).format(new Date(data.consultedAt))}
              </small>
            </div>
          </article>
          <article className="dashboard-card numbers-card">
            <div className="card-title">
              <h2>Seus números da sorte</h2>
              {data.numeros.length > 0 && (
                <button onClick={() => setModal(true)} className="text-link">
                  Ver todos <ArrowRight size={15} />
                </button>
              )}
            </div>
            {data.numeros.length ? (
              <div className="number-grid">
                {data.numeros.slice(0, 6).map((n, i) => (
                  <span key={`${n}-${i}`}>{n}</span>
                ))}
              </div>
            ) : (
              <p className="empty-numbers">
                Nenhum número da sorte disponível nesta consulta.
              </p>
            )}
            <p className="muted-note">
              <Info size={17} /> Números informados pelo serviço da campanha
              após a validação das ações.
            </p>
          </article>
        </div>
        {data.inconsistent && (
          <div className="inconsistency" role="alert">
            <strong>Os dados desta consulta estão inconsistentes.</strong>
            <p>
              O total informado ({data.total}) difere da quantidade de números
              recebidos ({data.numeros.length}). Nenhum número foi acrescentado
              ou removido.
            </p>
            <Link href="/10-anos#consulta" className="outline-button">
              Tentar novamente
            </Link>
          </div>
        )}
        <CommercialBand />
        <div className="dashboard-lower">
          <section className="dashboard-card origin-card">
            <h2>Resumo da participação</h2>
            <p>Quantidades agregadas por origem informadas pelo serviço.</p>
            {origins.length ? (
              <div className="origin-list">
                {origins.map(([key, value]) => (
                  <div className="origin-row" key={key}>
                    <span>
                      <Ticket size={19} />
                      {campaign.origins[key] || key.replace(/_/g, " ")}
                    </span>
                    <span>
                      {value.acoes} {value.acoes === 1 ? "ação" : "ações"}
                    </span>
                    <strong>
                      {value.numeros}{" "}
                      {value.numeros === 1 ? "número" : "números"}
                    </strong>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhuma origem informada.</p>
            )}
            <small>O histórico detalhado depende de integração futura.</small>
          </section>
          <div className="summary-column">
            <PrizeBanner compact />
            <section className="dashboard-card campaign-summary">
              <h2>
                <CalendarDays /> Resumo da campanha
              </h2>
              <dl>
                <div>
                  <dt>Período</dt>
                  <dd>
                    {dateBR(data.campanha.inicio)} a {dateBR(data.campanha.fim)}
                  </dd>
                </div>
                <div>
                  <dt>Premiação prevista</dt>
                  <dd>10 prêmios de R$ 2.000 via Pix</dd>
                </div>
                <div>
                  <dt>Participação</dt>
                  <dd>Indicação, renovação, upgrade e novos contratos</dd>
                </div>
                <div>
                  <dt>Público</dt>
                  <dd>Clientes PF e PJ, conforme elegibilidade</dd>
                </div>
              </dl>
              <Link href="/10-anos/regulamento" className="outline-button">
                Ver regulamento <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        </div>
        <HelpBand />
      </main>
      {modal && (
        <NumbersModal numbers={data.numeros} onClose={() => setModal(false)} />
      )}
    </>
  );
}
