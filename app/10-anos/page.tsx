import "./campaign-glass.css";
import Link from "next/link";
import {
  ArrowRight,
  Gift,
} from "lucide-react";
import {
  Header,
  AnniversaryMark,
  CommercialBand,
  PrizeBanner,
  WinnersPreview,
  FAQ,
  HistoryBand,
} from "@/components/shared";
import { ConsultForm } from "@/components/consult-form";
import { CenterSwipeCarousel } from "@/components/center-swipe-carousel";
import { actions, campaign, dateBR } from "@/lib/campaign";

const participationSteps = [
  {
    title: "Participe da comemoração de 10 anos da Netbox",
    description: "Indique, renove, faça upgrade ou contrate a Netbox.",
  },
  {
    title: "Acumule números da sorte",
    description:
      "Após a validação, cada ação gera a quantidade correspondente de números.",
  },
  {
    title: "Acompanhe a campanha",
    description: "Consulte seus números e acompanhe os sorteios e resultados.",
  },
];

export default function CampaignPage() {
  return (
    <>
      <Header />
      <main className="campaign-page">
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
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <article className="campaign-actions__item" key={action.title}>
                  <div className="campaign-actions__ticket">
                    <div className="campaign-actions__ticket-panel">
                      <Icon className="campaign-actions__icon" aria-hidden="true" />
                      <h3 className="campaign-actions__title">
                        {action.title}
                      </h3>
                      <div className="campaign-actions__reward">
                        <span className="campaign-actions__label">Ganhe</span>
                        <strong className="campaign-actions__quantity">
                          {action.amount} {action.amount === 1 ? "número" : "números"}
                          <br />
                          da sorte
                        </strong>
                      </div>
                      <p className="campaign-actions__description">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </CenterSwipeCarousel>
        </section>

        <div className="shell campaign-prize-wrap">
          <PrizeBanner />
        </div>
        <section
          className="section shell campaign-section campaign-steps"
          id="como-participar"
          aria-labelledby="participation-title"
        >
          <CenterSwipeCarousel
            className="steps-grid"
            ariaLabel="Etapas para participar da campanha"
            itemSelector=".participation-slide"
            focusTheme
          >
            <article className="participation-cover participation-slide">
              <div className="participation-cover__copy">
                <h2 id="participation-title">Como <span>participar?</span></h2>
                <p>É simples começar a acumular seus números da sorte.</p>
              </div>
              <span className="participation-cover__hint participation-cover__hint--desktop">
                Deslize e confira <ArrowRight size={17} />
              </span>
              <button
                type="button"
                className="participation-cover__hint participation-cover__hint--mobile"
                data-carousel-next
              >
                Deslize para ver como <ArrowRight size={17} />
              </button>
            </article>
            {participationSteps.map(({ title, description }, index) => (
              <article className={`step-card participation-card participation-card--${index + 1} participation-slide`} key={title}>
                <h3>{title.split(["de 10 anos da Netbox", "números da sorte", "a campanha"][index])[0]}<span>{["de 10 anos da Netbox", "números da sorte", "a campanha"][index]}</span></h3>
                <p>{description}</p>
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
