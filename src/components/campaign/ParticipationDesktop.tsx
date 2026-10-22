import styles from "./ParticipationDesktop.module.css";
import Image from "next/image";
import { CampaignBrand } from "@/components/campaign/CampaignBrand";
import { ArrowRight, ChevronRight, FilePlus2, Smartphone, Ticket, UserRound } from "lucide-react";
const participationSteps = [
  {
    title: "Sou cliente Netbox",
    description: "Clientes ativos já participam da campanha",
    icon: UserRound,
  },
  {
    title: "Faça uma ação válida",
    description: "Indique, renove, ou contrate um plano",
    icon: FilePlus2,
  },
  {
    title: "Acumule números da sorte",
    description: "Cada ação validada gera números para participar dos sorteios",
    icon: Ticket,
  },
  {
    title: "Acompanhe pelo site",
    description: "Consulte seus números e veja os resultados da campanha",
    icon: Smartphone,
  },
] as const;
/** Exibe quatro etapas estáticas da campanha, com acesso à consulta por CPF. */
export function ParticipationDesktop() {
  return (<section className={styles.participationDesktopSection} data-ui="section participation-desktop" aria-labelledby="participation-desktop-title">
    <Image
      className={styles.participationDesktopBackground}
      src="/images/background/Rastros%20Neon%20Laranja%20no%20Vazio.png"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
    />
    <div data-ui="participation-desktop-inner" className={styles.participationDesktopInner}>
      <div data-ui="participation-desktop-hero" className={styles.participationDesktopHero}>
        <div data-ui="participation-desktop-intro" className={styles.participationDesktopIntro}>
          <span data-ui="participation-desktop-eyebrow" className={styles.participationDesktopEyebrow}>
            10 anos de Netbox
          </span>
          <h2 id="participation-desktop-title">
            Como participar
            <span>do sorteio de 10 anos</span>
          </h2>
          <p>
            Acumule números da sorte ao contratar, renovar, indicar um novo cliente e <br />
            acompanhe a campanha pelo nosso site
          </p>
        </div>
        <div data-ui="participation-desktop-visual" className={styles.participationDesktopVisual}>
          <CampaignBrand
            className={styles.participationDesktopAnniversary}
            src="/images/netbox-10-anos/LOG%201%20SITE.png"
            alt=""
            width={489}
            height={205}
            sizes="(max-width: 900px) 36vw, 40vw"
          />
        </div>
      </div>

      <ol data-ui="participation-desktop-steps" className={styles.participationDesktopSteps}>
        {participationSteps.map(({ title, description, icon: Icon }, index) => (<li data-ui="participation-desktop-step" className={styles.participationDesktopStep} key={title}>
          <div data-ui="participation-desktop-content" className={styles.participationDesktopContent}>
            <span data-ui="participation-desktop-icon" className={styles.participationDesktopIcon} aria-hidden="true">
              <Icon size={42} strokeWidth={1.7} />
            </span>
            <div data-ui="participation-desktop-step-copy" className={styles.participationDesktopStepCopy}>
              <h3 data-ui="participation-desktop-step-title" className={styles.participationDesktopStepTitle}>
                <span>{index + 1}.</span> {title}
              </h3>
              <p data-ui="participation-desktop-step-description" className={styles.participationDesktopStepDescription}>
                {description}
              </p>
            </div>
          </div>
          {index === participationSteps.length - 1 && (<a data-ui="participation-desktop-consult" className={styles.participationDesktopConsult} href="#consulta">
            Consultar CPF <ArrowRight size={17} aria-hidden="true" />
          </a>)}
          {index < participationSteps.length - 1 && (<ChevronRight className={styles.participationDesktopNext} size={30} aria-hidden="true" />)}
        </li>))}
      </ol>
    </div>
  </section>);
}
