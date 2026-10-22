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
import { CampaignFooter } from "@/features/campaign/components/CampaignFooter";
import { netboxContacts } from "@/features/contacts/model/netboxContacts";
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
      <main className={styles.root}>
        <div className={styles.decorativeGlow} aria-hidden="true" />

        <article className={styles.content} data-ui="shell">
          <header className={styles.hero}>
            <div className={styles.heroIcon} aria-hidden="true">
              <ShieldCheck size={34} strokeWidth={1.8} />
            </div>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Privacidade e proteção de dados</p>
              <h1>Política de Privacidade</h1>
              <p className={styles.lead}>
                Saiba de forma simples como seus dados são utilizados durante a
                consulta de participação na campanha Netbox 10 Anos.
              </p>
              <p className={styles.updatedAt}>
                Última atualização: 22 de outubro de 2026
              </p>
            </div>
          </header>

          
          <aside className={styles.summary} aria-label="Resumo de privacidade">
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


          <div className={styles.topicGrid}>
            {privacyTopics.map(({ title, description, Icon }) => (
              <section className={styles.topicCard} key={title}>
                <div className={styles.topicIcon} aria-hidden="true">
                  <Icon size={23} />
                </div>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </section>
            ))}
          </div>

          <section className={styles.rightsCard}>
            <div className={styles.rightsIcon} aria-hidden="true">
              <UserRoundCheck size={30} />
            </div>
            <div className={styles.rightsCopy}>
              <p className={styles.eyebrow}>Seus direitos</p>
              <h2>Precisa de ajuda com seus dados?</h2>
              <p>
                Solicite informações, correções ou esclarecimentos pelos canais
                oficiais da Netbox. Nenhum sistema elimina integralmente os
                riscos inerentes ao uso da internet, mas tratamos cada consulta
                com as medidas de segurança adequadas.
              </p>
            </div>
            <a className={styles.contactButton} href={netboxContacts.email}>
              <Mail aria-hidden="true" size={18} />
              Falar com a Netbox
            </a>
          </section>

          <Link className={styles.backLink} href="/10-anos">
            <ArrowLeft aria-hidden="true" size={18} />
            Voltar à campanha
          </Link>
        </article>
      </main>
      <CampaignFooter />
    </>
  );
}
