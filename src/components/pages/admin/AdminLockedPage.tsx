import styles from "./AdminLockedPage.module.css";
import { LockKeyhole } from "lucide-react";
export default function AdminPage() { return <main data-ui="admin-locked-page-root" className={styles.adminLockedPageRoot}><LockKeyhole size={54} /><h1>Administração bloqueada</h1><p>Esta área exige autenticação e integração administrativa oficial. Nenhum dado ou operação administrativa está disponível.</p></main>; }
