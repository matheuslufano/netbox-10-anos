import styles from "./ParticipationDesktop.module.css";
import Image from "next/image";
import { CampaignBrand } from "@/features/campaign/components/CampaignBrand";
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
  return (<section className={styles.section} data-ui="section" aria-labelledby="participation-desktop-title">
    <Image
      className={styles.background}
      src="/images/background/Rastros%20Neon%20Laranja%20no%20Vazio.png"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
    />
    <div className={styles.inner}>
      <div className={styles.hero}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
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
        <div className={styles.visual}>
          <CampaignBrand
            className={styles.anniversary}
            src="/images/netbox-10-anos/LOG%201%20SITE.png"
            alt=""
            width={489}
            height={205}
            sizes="(max-width: 900px) 36vw, 40vw"
          />
        </div>
      </div>

      <ol className={styles.steps}>
        {participationSteps.map(({ title, description, icon: Icon }, index) => (<li className={styles.step} key={title}>
          <div className={styles.content}>
            <span className={styles.icon} aria-hidden="true">
              <Icon size={42} strokeWidth={1.7} />
            </span>
            <div className={styles.stepCopy}>
              <h3 className={styles.stepTitle}>
                <span>{index + 1}.</span> {title}
              </h3>
              <p className={styles.stepDescription}>
                {description}
              </p>
            </div>
          </div>
          {index === participationSteps.length - 1 && (<a className={styles.consult} href="#consulta">
            Consultar CPF <ArrowRight size={17} aria-hidden="true" />
          </a>)}
          {index < participationSteps.length - 1 && (<ChevronRight className={styles.next} size={30} aria-hidden="true" />)}
        </li>))}
      </ol>
    </div>
  </section>);
}
