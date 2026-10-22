import styles from "./BalanceCard.module.css";
import type { Consultation } from "@/utils/campaign/consult";
import { Ticket } from "lucide-react";
/** Exibe o total de números informado pela consulta, com concordância singular e plural. */
export function BalanceCard({ consultation }: {
  consultation: Consultation;
}) {
  return (<article className={styles.balanceCardSurface} data-ui="dashboard-card">
    <span data-ui="balance-card-balance-icon" className={styles.balanceCardBalanceIcon}>
      <Ticket size={52} />
    </span>
    <div>
      <h2>Você já acumulou</h2>
      <strong>{consultation.total}</strong>
      <b>{consultation.total === 1 ? "número da sorte" : "números da sorte"}</b>
      <p>na promoção Netbox 10 Anos.</p>
    </div>
  </article>);
}
