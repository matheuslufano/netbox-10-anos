import styles from "./ClientPageBackground.module.css";
/** Camada decorativa de toda a página, sem interação ou conteúdo acessível. */
export function ClientPageBackground() {
  return (<div data-ui="client-page-background-root" className={styles.clientPageBackgroundRoot} aria-hidden="true">
    <span />
    <span />
    <span />
  </div>);
}
