import styles from "./Logo.module.css";
import Link from "next/link";
import Image from "next/image";
/** Exibe a marca institucional com retorno à campanha. */
export function Logo() {
  return (<Link className={styles.root} href="/10-anos" aria-label="Netbox, página inicial">
    <Image
      src="/images/netbox-10-anos/logo-netbox.png"
      alt="Netbox Fibra Óptica"
      width={120}
      height={49}
      priority
    />
  </Link>);
}
