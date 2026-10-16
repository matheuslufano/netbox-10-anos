"use client";
// ============================================================================
// IMPORTAÇÕES — Next.js, React, ícones e dados compartilhados
// ============================================================================
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Menu,
  ChevronDown,
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
  Moon,
  Sun,
} from "lucide-react";
import { campaign, commercialActions, faq } from "@/lib/campaign";
import { HeaderContactLinks } from "@/components/header-contact-links";
// ============================================================================
// LOGOTIPO / IDENTIDADE VISUAL — imagem e link para a campanha
// ============================================================================
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
// ============================================================================
// CABEÇALHO — menu responsivo, navegação, tema, contatos e consulta
// ============================================================================
export function Header({ client = false, returnHome = false }: { client?: boolean; returnHome?: boolean }) {
  // Controle da abertura do menu no mobile.
  const [open, setOpen] = useState(false);
  // Estado visual do botão de tema.
  const [darkTheme, setDarkTheme] = useState(false);
  // Mantém o ícone do tema sincronizado com as classes do <body>.
  useEffect(() => {
    const syncTheme = () => {
      const selectedMode = document.body.dataset.themeMode;
      setDarkTheme(
        selectedMode === "dark" || document.body.classList.contains("participation-focus"),
      );
    };
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    syncTheme();
    return () => observer.disconnect();
  }, []);
  // Links exibidos no cabeçalho: área do cliente ou campanha pública.
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
    <header className={client ? "site-header site-header--client" : "site-header site-header--with-contacts"}>
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
          {!client && <HeaderContactLinks onNavigate={() => setOpen(false)} />}
        </nav>
        {!client && (
          <div className="header-tools">
            <button
              className="header-theme-toggle"
              type="button"
              aria-label={darkTheme ? "Desligar tema escuro" : "Ligar tema escuro"}
              aria-pressed={darkTheme}
              title={darkTheme ? "Desligar tema escuro" : "Ligar tema escuro"}
              onClick={() => {
                const nextTheme = !document.body.classList.contains("participation-focus");
                if (nextTheme) {
                  document.body.dataset.themeMode = "dark";
                  document.body.classList.add("participation-focus");
                } else {
                  delete document.body.dataset.themeMode;
                  document.body.classList.remove("participation-focus");
                  window.dispatchEvent(new Event("netbox:theme-auto-resume"));
                }
                setDarkTheme(nextTheme);
              }}
            >
              {darkTheme ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <HeaderContactLinks />
          </div>
        )}
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
// ============================================================================
// MARCA COMEMORATIVA — símbolo tipográfico dos 10 anos
// ============================================================================
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
// ============================================================================
// AÇÕES COMERCIAIS — renovação e formas de ganhar números
// ============================================================================
export function CommercialBand() {
  // Evento que permite rastrear cliques comerciais no restante do site.
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

          </div>
        </div>
        {/* Cartões gerados a partir de commercialActions, em @/lib/campaign. */}
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
// ============================================================================
// PRÊMIOS — valores, texto e arte (versões normal e compacta)
// ============================================================================
export function PrizeBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id={compact ? undefined : "premios"}
      className={compact ? "prize-banner compact" : "prize-banner"}
    >
      <div className="prize-copy">
        <span className="eyebrow">Prêmio no pix</span>
        {!compact && (
          <Image
            className="prize-banner__illustration prize-banner__illustration--mobile"
            src="/images/netbox-10-anos/Cashback%20PIX%20com%20Notas%20de%20100%20Reais.png"
            alt="Notas de cem reais ao redor de um símbolo Pix"
            width={1421}
            height={1107}
            sizes="(max-width: 700px) 48vw, 190px"
          />
        )}
        <h2>
          10 sorteios de <strong>R$ 2.000</strong>
        </h2>
        <p>Serão 10 sorteios, com R$ 2.000 via Pix em cada um, para celebrar com quem faz parte dessa história.</p>
        <span className="prize-total">R$ 20 mil <span>em prêmios no total</span></span>
      </div>
      {compact ? (
        <div className="prize-art" aria-label="Dez sorteios de dois mil reais via Pix">
          <Gift size={100} strokeWidth={1.4} />
        </div>
      ) : (
        <div className="prize-art">
          <Image
            className="prize-banner__illustration"
            src="/images/netbox-10-anos/Cashback%20PIX%20com%20Notas%20de%20100%20Reais.png"
            alt="Notas de cem reais ao redor de um símbolo Pix"
            width={1421}
            height={1107}
            sizes="(max-width: 760px) 90vw, (max-width: 1100px) 42vw, 520px"
          />
        </div>
      )}
    </section>
  );
}
// ============================================================================
// GANHADORES — cartões de prévia e acesso à listagem
// ============================================================================
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
// ============================================================================
// DÚVIDAS E REGULAMENTO — perguntas, respostas e links
// ============================================================================
/** Lista dúvidas em acordeões nativos, com indicador visual de abertura no mobile. */
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
        {/* Perguntas carregadas da lista faq em @/lib/campaign. */}
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>
              <span>{q}</span>
              <ChevronDown className="faq-grid__toggle" size={18} aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      {/* Área de acesso ao regulamento oficial. */}
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
// ============================================================================
// AJUDA — faixa de acesso às dúvidas frequentes
// ============================================================================
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
// ============================================================================
// HISTÓRIA DA NETBOX — texto institucional e indicadores
// ============================================================================
/** Apresenta a história e os indicadores, com um foguete apenas decorativo. */
export function HistoryBand() {
  return (
    <section className="history-band">
      <div className="history-band__decoration" aria-hidden="true">
        <span className="history-band__rocket">
          <Rocket size={76} strokeWidth={1.25} />
        </span>
      </div>
      <div className="shell history-inner">
        <div>
          <span className="eyebrow">NOSSA HISTÓRIA</span>
          <h2>10 anos conectando o Tocantins.</h2>
          <p>
            Mais do que internet, a Netbox sempre acreditou na força das
            pessoas, das cidades e das histórias que se conectam todos os dias.
          </p>
        </div>
        {/* Indicadores institucionais alimentados por campaign.institutional. */}
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
// ============================================================================
// PRIVACIDADE — mensagem de proteção dos dados
// ============================================================================
export function PrivacyNote() {
  return (
    <span className="privacy-note">
      <ShieldCheck size={19} /> Seus dados são usados apenas para a consulta da
      campanha.
    </span>
  );
}
