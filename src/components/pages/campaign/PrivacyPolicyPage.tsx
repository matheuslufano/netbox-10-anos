import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Database,
  HardDrive,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { CampaignFooter } from "@/components/campaign/CampaignFooter";
import { netboxContacts } from "@/utils/contacts/netboxContacts";
import styles from "./PrivacyPolicyPage.module.css";

const privacyTopics = [
  {
    title: "Dados utilizados na consulta",
    Icon: Database,
    description:
      "Ao consultar sua participação, o CPF informado é validado e enviado ao servidor da campanha para localizar os dados associados à promoção, como identificação do participante, saldo e números da sorte.",
  },
  {
    title: "Finalidade do tratamento",
    Icon: Target,
    description:
      "Os dados são utilizados exclusivamente para validar a participação, apresentar as informações da campanha e proteger a consulta contra entradas inválidas ou uso indevido.",
  },
  {
    title: "Armazenamento e compartilhamento",
    Icon: HardDrive,
    description:
      "O resultado permanece somente no contexto da aba atual. Para obter a resposta, o servidor pode consultar os sistemas autorizados responsáveis pelos dados da campanha.",
  },
  {
    title: "Segurança",
    Icon: LockKeyhole,
    description:
      "Adotamos medidas técnicas para reduzir a exposição dos dados, incluindo validação do CPF no servidor e ausência de informações pessoais na URL.",
  },
] as const;

/** Apresenta o aviso de privacidade específico da campanha Netbox 10 Anos. */
export default function PrivacyPolicyPage() {
  return (
    <>
      <Header returnHome />
      <main data-ui="privacy-policy-page-root" className={styles.privacyPolicyPageRoot}>
        <div data-ui="privacy-policy-page-decorative-glow" className={styles.privacyPolicyPageDecorativeGlow} aria-hidden="true" />

        <article className={styles.privacyPolicyPageContent} data-ui="shell">
          <header data-ui="privacy-policy-page-hero" className={styles.privacyPolicyPageHero}>
            <div data-ui="privacy-policy-page-hero-icon" className={styles.privacyPolicyPageHeroIcon} aria-hidden="true">
              <ShieldCheck size={34} strokeWidth={1.8} />
            </div>
            <div data-ui="privacy-policy-page-hero-copy" className={styles.privacyPolicyPageHeroCopy}>
              <p data-ui="privacy-policy-page-eyebrow" className={styles.privacyPolicyPageEyebrow}>Privacidade e proteção de dados</p>
              <h1>Política de Privacidade</h1>
              <p data-ui="privacy-policy-page-lead" className={styles.privacyPolicyPageLead}>
                Saiba de forma simples como seus dados são utilizados durante a
                consulta de participação na campanha Netbox 10 Anos.
              </p>
              <p data-ui="privacy-policy-page-updated-at" className={styles.privacyPolicyPageUpdatedAt}>
                Última atualização: 22 de outubro de 2026
              </p>
            </div>
          </header>

          
          <aside data-ui="privacy-policy-page-summary" className={styles.privacyPolicyPageSummary} aria-label="Resumo de privacidade">
          <strong>Privacidade em resumo</strong>

          <ul>
            <li>
              <Check aria-hidden="true" />
              <span>CPF utilizado somente para a consulta</span>
            </li>

            <li>
              <Check aria-hidden="true" />
              <span>Nenhum CPF gravado na URL ou no navegador</span>
            </li>

            <li>
              <Check aria-hidden="true" />
              <span>Resultado mantido apenas na aba atual</span>
            </li>
          </ul>
          </aside>


          <div data-ui="privacy-policy-page-topic-grid" className={styles.privacyPolicyPageTopicGrid}>
            {privacyTopics.map(({ title, description, Icon }) => (
              <section data-ui="privacy-policy-page-topic-card" className={styles.privacyPolicyPageTopicCard} key={title}>
                <div data-ui="privacy-policy-page-topic-icon" className={styles.privacyPolicyPageTopicIcon} aria-hidden="true">
                  <Icon size={23} />
                </div>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </section>
            ))}
          </div>

          <section data-ui="privacy-policy-page-rights-card" className={styles.privacyPolicyPageRightsCard}>
            <div data-ui="privacy-policy-page-rights-icon" className={styles.privacyPolicyPageRightsIcon} aria-hidden="true">
              <UserRoundCheck size={30} />
            </div>
            <div data-ui="privacy-policy-page-rights-copy" className={styles.privacyPolicyPageRightsCopy}>
              <p data-ui="privacy-policy-page-eyebrow" className={styles.privacyPolicyPageEyebrow}>Seus direitos</p>
              <h2>Precisa de ajuda com seus dados?</h2>
              <p>
                Solicite informações, correções ou esclarecimentos pelos canais
                oficiais da Netbox. Nenhum sistema elimina integralmente os
                riscos inerentes ao uso da internet, mas tratamos cada consulta
                com as medidas de segurança adequadas.
              </p>
            </div>
            <a data-ui="privacy-policy-page-contact-button" className={styles.privacyPolicyPageContactButton} href={netboxContacts.email}>
              <Mail aria-hidden="true" size={18} />
              Falar com a Netbox
            </a>
          </section>

          <Link className={styles.privacyPolicyPageBackLink} href="/10-anos">
            <ArrowLeft aria-hidden="true" size={18} />
            Voltar à campanha
          </Link>
        </article>
      </main>
      <CampaignFooter />
    </>
  );
}
