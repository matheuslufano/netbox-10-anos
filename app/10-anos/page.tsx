import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Ticket,
  ClipboardList,
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
import { actions, campaign, dateBR } from "@/lib/campaign";
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
        <section className="section shell campaign-section campaign-actions" id="acoes">
          <div className="section-head">
            <div>
              <h2>Como ganhar números da sorte?</h2>
              <p>
                Cada ação válida gera uma quantidade específica de números da
                sorte.
              </p>
            </div>
          </div>
          <div className="action-grid">
            {actions.map((a) => (
              <article className="action-card" key={a.title}>
                <a.icon size={38} />
                <h3>{a.title}</h3>
                <strong>
                  {a.amount} {a.amount === 1 ? "número" : "números"}
                  <br /> da sorte
                </strong>
                <p>{a.description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="shell campaign-prize-wrap">
          <PrizeBanner />
        </div>
        <section className="section shell campaign-section campaign-steps" id="como-participar">
          <div className="section-head">
            <div>
              <h2>Como participar?</h2>
              <p>É simples começar a acumular seus números da sorte.</p>
            </div>
          </div>
          <div className="steps-grid">
            {[
              [
                "Faça uma ação elegível",
                "Indique, renove, faça upgrade ou contrate a Netbox.",
                CircleCheck,
              ],
              [
                "Acumule números da sorte",
                "Após a validação, cada ação gera a quantidade correspondente de números.",
                Ticket,
              ],
              [
                "Acompanhe a campanha",
                "Consulte seus números e acompanhe os sorteios e resultados.",
                ClipboardList,
              ],
            ].map(([title, description, Icon], i) => (
              <article className="step-card" key={String(title)}>
                <span className="step-number">{i + 1}</span>
                <Icon size={35} />
                <h3>{String(title)}</h3>
                <p>{String(description)}</p>
                {i < 2 && <ArrowRight className="step-arrow" />}
              </article>
            ))}
          </div>
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
