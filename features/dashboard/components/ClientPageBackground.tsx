import styles from "./ClientPageBackground.module.css";
/** Camada decorativa de toda a página, sem interação ou conteúdo acessível. */
export function ClientPageBackground() {
  return (<div className={styles.root} aria-hidden="true">
    <span />
    <span />
    <span />
  </div>);
}
