import "./campaign-glass.css";
import "./participation-desktop.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Header,
  CommercialBand,
  PrizeBanner,
  WinnersPreview,
  FAQ,
  HistoryBand,
} from "@/components/shared";
import { ConsultForm } from "@/components/consult-form";
import { CenterSwipeCarousel } from "@/components/center-swipe-carousel";
import { ParticipationDesktop } from "@/components/participation-desktop";
import { actions, campaign, dateBR } from "@/lib/campaign";
import { participationIntro, participationSteps } from "@/lib/participation";

export default function CampaignPage() {
  return (
    <>
      <Header />
      <main className="campaign-page">
        <section className="campaign-hero" id="inicio" aria-labelledby="campaign-hero-title">
          <div className="campaign-hero__inner">
            <header className="campaign-hero__brand">
              <picture className="campaign-hero__responsive-image">
                <source
                  media="(max-width: 700px)"
                  srcSet="/images/netbox-10-anos/BANNER%20SITE%20mobile-%2010%20ANOS.png"
                />
                <Image
                  className="campaign-hero__logo"
                  src="/images/netbox-10-anos/LOG 3 SITE.png"
                  alt="Show de Prêmios Netbox 10 Anos: R$ 20 mil em prêmios, com sorteio em 30 de janeiro de 2027."
                  width={2172}
                  height={724}
                  sizes="(max-width: 700px) 100vw, 480px"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <h1 id="campaign-hero-title">Conectando pessoas e construindo histórias</h1>
            </header>

            <div className="campaign-hero__offers">
              <div className="campaign-hero__prize">
                <p>CLIENTE NETBOX CONCORRE A</p>
                <strong>R$ 20 MIL REAIS</strong>
                <b>EM PRÊMIOS!</b>
              </div>
              <p className="campaign-hero__message">
                Contrate, indique ou renove seu plano e ganhe um número da sorte
                para participar do Show de Prêmios Netbox 10 Anos.
              </p>
            </div>

            <p className="campaign-hero__date">
              SORTEIO DIA 30 DE JANEIRO DE 2027, AO VIVO NO INSTAGRAM DA NETBOX INTERNET
            </p>

            <div className="campaign-hero__actions">
              <a className="button" href="#acoes">Quero participar</a>
              <a className="light-button" href="#consulta">Consultar meus números</a>
            </div>
          </div>
        </section>
        <div className="shell consult-wrap">
          <ConsultForm />
        </div>

        <div className="campaign-reward-flow">
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
        </div>
        <div id="como-participar" />
        <ParticipationDesktop />
        <section
          className="section shell campaign-section campaign-steps campaign-steps--mobile"
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
                <p>{participationIntro.description}</p>
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
