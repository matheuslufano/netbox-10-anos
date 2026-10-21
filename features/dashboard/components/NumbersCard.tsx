import styles from "./NumbersCard.module.css";
import stylesButton from "../../../components/ui/Button.module.css";
import stylesNumbersGrid from "./NumbersGrid.module.css";
import type { Consultation } from "@/features/campaign/model/consult";
import { Info, ArrowRight } from "lucide-react";
import { LuckyNumberTicket } from "@/features/dashboard/components/LuckyNumberTicket";
/** Exibe até seis bilhetes, o estado sem números e o acesso à listagem completa. */
export function NumbersCard({ consultation, onShowAll }: {
  consultation: Consultation;
  onShowAll: () => void;
}) {
  return (<article className={styles.card} data-ui="numbers-card dashboard-card">
    <div className={styles.cardTitle} data-ui="card-title">
      <h2>Seus números da sorte</h2>
      {consultation.numeros.length > 0 && (<button onClick={onShowAll} className={stylesButton.textLink} data-ui="text-link">
        Ver todos <ArrowRight size={15} />
      </button>)}
    </div>
    {consultation.numeros.length ? (<div className={stylesNumbersGrid.numberGrid}>
      {consultation.numeros.slice(0, 6).map((n, i) => (<LuckyNumberTicket number={n} key={`${n}-${i}`} />))}
    </div>) : (<p className={styles.emptyNumbers}>
      {consultation.campanha.comecou === false
        ? "A campanha ainda não começou. Seus números da sorte serão exibidos aqui após o início e a validação das ações."
        : "Este CPF ainda não possui números da sorte. Eles aparecerão aqui após a validação de uma ação válida."}
    </p>)}
    <p className={styles.mutedNote}>
      <Info size={17} /> Números informados pelo serviço da campanha
      após a validação das ações.
    </p>
  </article>);
}
