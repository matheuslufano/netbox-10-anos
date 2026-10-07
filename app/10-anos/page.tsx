import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Ticket,
  ClipboardList,
  Gift,
  Plus,
} from "lucide-react";
import {
  Header,
  AnniversaryMark,
  CommercialBand,
  PrizeBanner,
  WinnersPreview,
  FAQ,
  HistoryBand,
  Logo,
} from "@/components/shared";
import { ConsultForm } from "@/components/consult-form";
import { ParticipationArtwork } from "@/components/participation-artwork";
import { CenterSwipeCarousel } from "@/components/center-swipe-carousel";
import { actions, campaign, dateBR } from "@/lib/campaign";

const actionPresentation = [
  {
    title: "Indique um amigo",
    description: "Quando sua indicação gerar um contrato elegível e ativado.",
    icon: "game-icons:three-friends",
  },
  {
    title: "Renovação com upgrade",
    description: "Renove e aproveite para melhorar seu plano.",
    icon: "carbon:upgrade",
  },
  {
    title: "Renovação do plano família",
    description: "Renove seu contrato residencial elegível.",
    icon: "ic:twotone-family-restroom",
  },
  {
    title: "Renovação do plano empresarial",
    description: "Renove o contrato elegível da sua empresa.",
    icon: "bxs:business",
  },
  {
    title: "Novo plano família",
    description: "Contrate um plano residencial participante.",
    icon: "keyline-icons:house-plus-sharp-fill",
  },
  {
    title: "Novo plano empresarial",
    description: "Contrate um plano empresarial participante.",
    icon: "ic:baseline-add-business",
  },
];

const participationSteps = [
  {
    title: "Participe da comemoração de 10 anos da Netbox",
    description: "Indique, renove, faça upgrade ou contrate a Netbox.",
    Icon: CircleCheck,
  },
  {
    title: "Acumule números da sorte",
    description:
      "Após a validação, cada ação gera a quantidade correspondente de números.",
    Icon: Ticket,
  },
  {
    title: "Acompanhe a campanha",
    description: "Consulte seus números e acompanhe os sorteios e resultados.",
    Icon: ClipboardList,
  },
];

export default function CampaignPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="shell hero-inner">
            <div className="hero-copy">
              <AnniversaryMark />
              <h1>
                10 anos conectando histórias.
                <br />
                <span>
                  Agora, cada nova <em>conexão</em> pode <em>valer prêmios.</em>
                </span>
              </h1>
              <div className="hero-prize">
                <strong>R$ 20 MIL EM PIX</strong>
                <span>10 prêmios de R$ 2.000</span>
              </div>
              <p>
                Indique, renove, faça upgrade ou contrate a Netbox. Cada ação
                elegível e validada gera números da sorte para participar da
                campanha.
              </p>
              <div className="hero-buttons">
                <a className="button" href="#acoes">
                  <Gift size={18} /> Quero participar
                </a>
                <a className="light-button" href="#consulta">
                  Consultar meus números
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="shell consult-wrap">
          <ConsultForm />
        </div>

        <section
          className="section shell campaign-section campaign-actions"
          id="acoes"
          aria-labelledby="campaign-actions-title"
        >
          <header className="section-head campaign-actions__header">
            <div>
              <span className="campaign-actions__eyebrow">
                Sua conexão vale mais
              </span>
              <h2 id="campaign-actions-title">Como ganhar números da sorte?</h2>
              <p>
                Cada ação válida gera uma quantidade específica de números da
                sorte.
              </p>
            </div>
          </header>

          <CenterSwipeCarousel
            className="campaign-actions__grid"
            ariaLabel="Ações que geram números da sorte"
          >
            {actions.map((action, index) => {
              // Preserva a mesma ordem de actions do componente original.
              const presentation = actionPresentation[index] ?? {
                title: action.title,
                description: "Conforme as condições da campanha.",
                icon: "mdi:ticket-confirmation-outline",
              };
              const [prefix, name] = presentation.icon.split(":");
              const iconUrl = `https://api.iconify.design/${prefix}/${name}.svg`;

              return (
                <article className="campaign-actions__item" key={action.title}>
                  <div className="campaign-actions__ticket">
                    <svg
                      className="campaign-actions__art"
                      viewBox="0 0 160 360"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        className="campaign-actions__outer"
                        d="M0 18 Q18 18 18 0 H30 Q34 8 38 0 H46 Q50 8 54 0 H62 Q66 8 70 0 H78 Q82 8 86 0 H94 Q98 8 102 0 H110 Q114 8 118 0 H126 Q130 8 134 0 H142 Q142 18 160 18 V342 Q142 342 142 360 H134 Q130 352 126 360 H118 Q114 352 110 360 H102 Q98 352 94 360 H86 Q82 352 78 360 H70 Q66 352 62 360 H54 Q50 352 46 360 H38 Q34 352 30 360 H18 Q18 342 0 342 Z"
                      />
                      <path
                        className="campaign-actions__inner"
                        d="M14 26 Q26 26 26 14 H134 Q134 26 146 26 V274 Q134 274 134 286 H26 Q26 274 14 274 Z"
                      />
                    </svg>

                    <div className="campaign-actions__ticket-panel">
                      {/* SVG externo do Iconify; dispensa componente cliente. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="campaign-actions__icon"
                        src={iconUrl}
                        alt=""
                        aria-hidden="true"
                        width={34}
                        height={34}
                        loading="lazy"
                        decoding="async"
                      />
                      <h3 className="campaign-actions__title">
                        {presentation.title}
                      </h3>
                      <div className="campaign-actions__reward">
                        <span className="campaign-actions__amount">
                          <Plus
                            className="campaign-actions__amount-plus"
                            aria-hidden="true"
                          />
                          <strong className="campaign-actions__quantity">
                            {action.amount}
                          </strong>
                        </span>
                        <span className="campaign-actions__label">
                          {action.amount === 1 ? "número" : "números"}
                          <br />
                          da sorte
                        </span>
                      </div>
                      <p className="campaign-actions__description">
                        {presentation.description}
                      </p>
                    </div>
                    <div
                      className="campaign-actions__divider"
                      aria-hidden="true"
                    />
                    <div
                      className="campaign-actions__barcode"
                      aria-hidden="true"
                    >
                      <span />
                    </div>
                  </div>
                </article>
              );
            })}
          </CenterSwipeCarousel>
          <p className="campaign-actions__note">
            Os números da sorte são gerados após a validação da ação, conforme
            as condições da campanha.
          </p>
        </section>

        <div className="shell campaign-prize-wrap">
          <PrizeBanner />
        </div>
        <section
          className="section shell campaign-section campaign-steps"
          id="como-participar"
        >
          <div className="section-head">
            <div>
              <h2>Como participar?</h2>
              <p>É simples começar a acumular seus números da sorte.</p>
            </div>
          </div>
          <CenterSwipeCarousel
            className="steps-grid"
            ariaLabel="Etapas para participar da campanha"
            itemSelector=".participation-slide"
          >
            <article className="participation-cover participation-slide">
              <Logo />
              <div className="participation-cover__anniversary" aria-hidden="true">
                <span>10</span>
                <b>anos</b>
                <small>Conexões que constroem grandes histórias</small>
              </div>
              <div className="participation-cover__copy">
                <h3>Como <span>participar?</span></h3>
                <p>É simples começar a acumular seus números da sorte.</p>
              </div>
              <span className="participation-cover__hint">
                Deslize e confira <ArrowRight size={17} />
              </span>
            </article>
            {participationSteps.map(({ title, description, Icon }, index) => (
              <article className={`step-card participation-card participation-card--${index + 1} participation-slide`} key={title}>
                <span className="step-number">{index + 1}</span>
                <Icon size={35} />
                <h3>{title.split(["de 10 anos da Netbox", "números da sorte", "a campanha"][index])[0]}<span>{["de 10 anos da Netbox", "números da sorte", "a campanha"][index]}</span></h3>
                <p>{description}</p>
                <ParticipationArtwork step={index + 1} />
                {index < participationSteps.length - 1 && (
                  <ArrowRight className="step-arrow" />
                )}
              </article>
            ))}
          </CenterSwipeCarousel>
        </section>
        <CommercialBand />
        <HistoryBand />
        <WinnersPreview />
        <FAQ />
        <footer className="site-footer">
          <div className="shell">
            <span>© Netbox 10 Anos · {campaign.tagline}</span>
            <span>
              Período de consulta: {dateBR(campaign.period.inicio)} a{" "}
              {dateBR(campaign.period.fim)}
            </span>
            <Link href="/10-anos/regulamento">Regulamento</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
