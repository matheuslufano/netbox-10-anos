"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Gift,
  Target,
  MessageCircle,
  FileText,
  MapPin,
  UsersRound,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";
import { campaign, commercialActions, faq } from "@/lib/campaign";
export function Logo() {
  return (
    <Link className="logo" href="/10-anos" aria-label="Netbox, página inicial">
      <Image
        src="/images/netbox-10-anos/logo-netbox.png"
        alt="Netbox Fibra Óptica"
        width={120}
        height={49}
        priority
      />
    </Link>
  );
}
export function Header({ client = false, returnHome = false }: { client?: boolean; returnHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const items = client
    ? [
        ["Início", "/10-anos"],
        ["Internet", "/10-anos#acoes"],
        ["Serviços", "/10-anos#acoes"],
        ["Aplicativo", "/10-anos"],
        ["Blog", "/10-anos"],
        ["10 Anos", "/cliente/10-anos"],
      ]
    : [
        ["Início", "#inicio"],
        ["Como participar", "#como-participar"],
        ["Prêmios", "#premios"],
        ["Ganhadores", "#ganhadores"],
        ["Dúvidas", "#duvidas"],
        ["Regulamento", "#regulamento"],
      ];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
        <nav
          id="site-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          {items.map(([label, href]) => (
            <Link
              key={label}
              href={returnHome && href.startsWith("#") ? `/10-anos${href}` : href}
              className={label === "10 Anos" ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        {client ? (
          <span className="header-location">
            <MapPin size={16} /> Paraíso do Tocantins
          </span>
        ) : (
          <a
            className="button small header-cta"
            href={returnHome ? "/10-anos#consulta" : "#consulta"}
            onClick={() =>
              setTimeout(() => document.getElementById("cpf")?.focus(), 350)
            }
          >
            Consultar meus números
          </a>
        )}
      </div>
    </header>
  );
}
export function AnniversaryMark() {
  return (
    <div className="anniversary">
      <div className="anniversary-ten">
        10
        <Rocket className="anniversary-rocket" />
      </div>
      <div className="anniversary-years">ANOS</div>
      <div className="anniversary-brand">netbox</div>
      <p>
        Conectando pessoas
        <br />e construindo histórias.
      </p>
    </div>
  );
}
export function CommercialBand() {
  function track(action: string) {
    window.dispatchEvent(
      new CustomEvent("netbox:commercial-click", { detail: { action } }),
    );
  }
  return (
    <section className="commercial-band campaign-commercial">
      <div className="shell commercial-grid">
        <div className="commercial-intro">
          <Target size={72} />
          <div>
            <h2>
              Quer ganhar mais <em>números da sorte?</em>
            </h2>
            <p>Aproveite as oportunidades e participe.</p>
            <a
              href={campaign.commercial.renewal || "#"}
              className="text-link"
              onClick={(e) => {
                if (campaign.commercial.renewal === "#") e.preventDefault();
                else track("renewal");
              }}
            >
              Renovação sem upgrade
            </a>
          </div>
        </div>
        {commercialActions.map((a) => (
          <article className="commercial-card" key={a.key}>
            <a.icon size={35} />
            <h3>{a.title}</h3>
            <strong>{a.amount}</strong>
            <a
              className="button"
              href={a.href}
              aria-disabled={a.href === "#"}
              onClick={(e) => {
                if (a.href === "#") e.preventDefault();
                else track(a.key);
              }}
            >
              {a.cta} <ArrowRight size={15} />
            </a>
            {a.href === "#" && <small>Destino comercial pendente</small>}
          </article>
        ))}
      </div>
    </section>
  );
}
export function PrizeBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id={compact ? undefined : "premios"}
      className={compact ? "prize-banner compact" : "prize-banner"}
    >
      <div className="prize-copy">
        <span className="eyebrow">Prêmios</span>
        <h2>
          10 sorteios de <strong>R$ 2.000</strong> via Pix
        </h2>
        <p>Serão 10 sorteios, com R$ 2.000 via Pix em cada um, para celebrar com quem faz parte dessa história.</p>
        <span className="prize-total">R$ 20 mil <span>em prêmios no total</span></span>
      </div>
      <div className="prize-art" aria-label="Dez sorteios de dois mil reais via Pix">
        <Gift size={compact ? 100 : 190} strokeWidth={1.4} />
      </div>
    </section>
  );
}
export function WinnersPreview() {
  return (
    <section className="section shell campaign-section campaign-winners" id="ganhadores">
      <div className="section-head">
        <div>
          <h2>Ganhadores</h2>
          <p>Acompanhe os ganhadores da promoção Netbox 10 Anos.</p>
        </div>
        <Link className="outline-button" href="/10-anos/ganhadores">
          Ver todos os ganhadores <ArrowRight size={16} />
        </Link>
      </div>
      <div className="winner-grid">
        {Array.from({ length: 4 }, (_, i) => (
          <article className="winner-card" key={i}>
            <span className="avatar">
              <UsersRound />
            </span>
            <div>
              <strong>Em breve</strong>
              <p>Aguardando os próximos sorteios.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FAQ({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="section shell campaign-section campaign-faq" id="duvidas">
      <div className="section-head">
        <div>
          <h2>Dúvidas frequentes</h2>
          <p>Tire suas dúvidas sobre a promoção.</p>
        </div>
      </div>
      <div className="faq-grid">
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <div className="regulation-card" id="regulamento">
        <FileText />
        <div>
          <h3>Regulamento da promoção</h3>
          <p>
            O regulamento oficial ainda não está disponível. O PDF de
            alinhamento não é o regulamento.
          </p>
        </div>
        <Link className="button" href="/10-anos/regulamento">
          Ler regulamento <ArrowRight size={16} />
        </Link>
        <button
          className="outline-button"
          disabled
          title="PDF oficial pendente"
        >
          Baixar PDF
        </button>
      </div>
      {standalone && (
        <Link className="text-link" href="/10-anos">
          Voltar à campanha
        </Link>
      )}
    </section>
  );
}
export function HelpBand() {
  return (
    <div className="help-band">
      <MessageCircle size={42} />
      <div>
        <h3>Ainda tem dúvidas?</h3>
        <p>
          Confira as perguntas mais frequentes sobre a promoção Netbox 10 Anos.
        </p>
      </div>
      <Link className="button" href="/10-anos#duvidas">
        Ver dúvidas frequentes <ArrowRight size={16} />
      </Link>
    </div>
  );
}
export function HistoryBand() {
  return (
    <section className="history-band">
      <div className="shell history-inner">
        <div>
          <span className="eyebrow">NOSSA HISTÓRIA</span>
          <h2>10 anos conectando o Tocantins.</h2>
          <p>
            Mais do que internet, a Netbox sempre acreditou na força das
            pessoas, das cidades e das histórias que se conectam todos os dias.
          </p>
          <a
            className="outline-button"
            href={campaign.commercial.history}
            onClick={(e) => {
              if (campaign.commercial.history === "#") e.preventDefault();
            }}
          >
            Conheça a nossa história <ArrowRight size={16} />
          </a>
        </div>
        <div className="history-stats">
          <p>
            <MapPin /> <b>{campaign.institutional.cities}</b> cidades conectadas
          </p>
          <p>
            <UsersRound /> <b>{campaign.institutional.clients}</b> clientes
          </p>
          <p>
            <BadgeCheck /> Internet de verdade
          </p>
          <p>
            <HeartHandshake /> Amizade que conecta
          </p>
          <small>Indicadores institucionais pendentes de confirmação.</small>
        </div>
      </div>
    </section>
  );
}
export function PrivacyNote() {
  return (
    <span className="privacy-note">
      <ShieldCheck size={19} /> Seus dados são usados apenas para a consulta da
      campanha.
    </span>
  );
}
