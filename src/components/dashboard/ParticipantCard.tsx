import styles from "./ParticipantCard.module.css";
import { UserRound } from "lucide-react";
import { dateBR } from "@/utils/campaign/campaign";
import type { Consultation } from "@/utils/campaign/consult";
type ParticipantCardProps = {
  consultation: Consultation;
};
/** Exibe a identificação e os metadados disponíveis, preservando o CPF mascarado. */
export function ParticipantCard({ consultation }: ParticipantCardProps) {
  const consultedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Araguaina",
  }).format(new Date(consultation.consultedAt));
  return (<article className={styles.participantCardSurface} data-ui="dashboard-card participant-card" aria-labelledby="participant-title">
    <header data-ui="participant-card-heading" className={styles.participantCardHeading}>
      <span data-ui="participant-card-icon" className={styles.participantCardIcon} aria-hidden="true">
        <UserRound size={23} />
      </span>
      <h2 id="participant-title">Dados do participante</h2>
    </header>
    <dl data-ui="participant-card-details" className={styles.participantCardDetails}>
      <div>
        <dt>Nome</dt>
        <dd>{consultation.nome || "Não informado"}</dd>
      </div>
      <div>
        <dt>CPF consultado</dt>
        <dd>{consultation.cpf}</dd>
      </div>
      <div>
        <dt>Consulta realizada em</dt>
        <dd>{consultedAt}</dd>
      </div>
      <div>
        <dt>Período da campanha</dt>
        <dd>{dateBR(consultation.campanha.inicio)} a {dateBR(consultation.campanha.fim)}</dd>
      </div>
      {consultation.campanha.comecou !== undefined && (<div>
        <dt>Início da campanha</dt>
        <dd>{consultation.campanha.comecou ? "Campanha iniciada" : "Aguardando início"}</dd>
      </div>)}
    </dl>
  </article>);
}
