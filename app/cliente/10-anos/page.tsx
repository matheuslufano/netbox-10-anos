"use client";
import "./client-page.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Ticket,
  X,
  Info,
  ArrowRight,
} from "lucide-react";
import { useConsultation } from "@/components/consultation-provider";
import { CampaignBrand } from "@/components/campaign-brand";
import {
  Header,
  CommercialBand,
  HelpBand,
} from "@/components/shared";
import { ParticipantCard } from "@/components/participant-card";
import { ClientPageBackground } from "@/components/client-page-background";
import { LuckyNumberTicket } from "@/components/lucky-number-ticket";
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
            <LuckyNumberTicket number={n} key={`${n}-${i}`} />
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
        <ClientPageBackground />
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
  return (
    <>
      <Header returnHome />
      <ClientPageBackground />
      <main className="client-main client-main--full client-page">
        <section className="client-hero">
          <CampaignBrand
            className="client-hero__brand"
            src="/images/netbox-10-anos/LOG%203%20SITE.png"
            darkSrc="/images/logo/netbox-10-anos-branco-56d580337904.png"
            alt="Show de Prêmios Netbox 10 Anos. Conectando pessoas e construindo histórias."
            width={2172}
            height={724}
            sizes="(max-width: 640px) 84vw, (max-width: 1100px) 42vw, 480px"
          />
          <div className="client-hero__copy">
            <span className="client-hero__eyebrow">Netbox 10 anos</span>
            <h1>Parabéns por fazer parte dessa história!</h1>
            <p>
              Aqui você acompanha sua participação na promoção Netbox 10 Anos.
            </p>
          </div>
        </section>
        <div className="dashboard-top">
          <ParticipantCard consultation={data} />
          <article className="dashboard-card balance-card">
            <span className="balance-icon">
              <Ticket size={52} />
            </span>
            <div>
              <h2>Você já acumulou</h2>
              <strong>{data.total}</strong>
              <b>{data.total === 1 ? "número da sorte" : "números da sorte"}</b>
              <p>na promoção Netbox 10 Anos.</p>
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
                  <LuckyNumberTicket number={n} key={`${n}-${i}`} />
                ))}
              </div>
            ) : (
              <p className="empty-numbers">
                {data.campanha.comecou === false
                  ? "A campanha ainda não começou. Seus números da sorte serão exibidos aqui após o início e a validação das ações."
                  : "Este CPF ainda não possui números da sorte. Eles aparecerão aqui após a validação de uma ação válida."}
              </p>
            )}
            <p className="muted-note">
              <Info size={17} /> Números informados pelo serviço da campanha
              após a validação das ações.
            </p>
          </article>
        </div>
        <CommercialBand />
        <div className="dashboard-lower">
        </div>
        <HelpBand />
      </main>
      {modal && (
        <NumbersModal numbers={data.numeros} onClose={() => setModal(false)} />
      )}
    </>
  );
}
