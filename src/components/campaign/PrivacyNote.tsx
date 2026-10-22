import styles from "./PrivacyNote.module.css";
import { ShieldCheck } from "lucide-react";
/** Informa a finalidade de uso dos dados no formulário de consulta. */
export function PrivacyNote() {
  return (<span data-ui="privacy-note-root" className={styles.privacyNoteRoot}>
    <ShieldCheck size={19} /> Seus dados são usados apenas para a consulta da
    campanha.
  </span>);
}
