import styles from "./NumbersCard.module.css";
import stylesButton from "../ui/Button.module.css";
import stylesNumbersGrid from "./NumbersGrid.module.css";
import type { Consultation } from "@/utils/campaign/consult";
import { Info, ArrowRight } from "lucide-react";
import { LuckyNumberTicket } from "@/components/dashboard/LuckyNumberTicket";
/** Exibe até seis bilhetes, o estado sem números e o acesso à listagem completa. */
export function NumbersCard({ consultation, onShowAll }: {
  consultation: Consultation;
  onShowAll: () => void;
}) {
  return (<article className={styles.numbersCardSurface} data-ui="numbers-card dashboard-card">
    <div className={styles.numbersCardTitle} data-ui="card-title">
      <h2>Seus números da sorte</h2>
      {consultation.numeros.length > 0 && (<button onClick={onShowAll} className={stylesButton.buttonTextLink} data-ui="text-link">
        Ver todos <ArrowRight size={15} />
      </button>)}
    </div>
    {consultation.numeros.length ? (<div data-ui="numbers-grid-number-grid" className={stylesNumbersGrid.numbersGridNumberGrid}>
      {consultation.numeros.slice(0, 6).map((n, i) => (<LuckyNumberTicket number={n} key={`${n}-${i}`} />))}
    </div>) : (<p data-ui="numbers-card-empty-numbers" className={styles.numbersCardEmptyNumbers}>
      {consultation.campanha.comecou === false
        ? "A campanha ainda não começou. Seus números da sorte serão exibidos aqui após o início e a validação das ações."
        : "Este CPF ainda não possui números da sorte. Eles aparecerão aqui após a validação de uma ação válida."}
    </p>)}
    <p data-ui="numbers-card-muted-note" className={styles.numbersCardMutedNote}>
      <Info size={17} /> Números informados pelo serviço da campanha
      após a validação das ações.
    </p>
  </article>);
}
