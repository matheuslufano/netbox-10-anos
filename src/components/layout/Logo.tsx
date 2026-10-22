import styles from "./Logo.module.css";
import Link from "next/link";
import Image from "next/image";
/** Exibe a marca institucional com retorno à campanha. */
export function Logo() {
  return (
    <Link
      className={styles.logoRoot}
      href="/10-anos"
      aria-label="Netbox, página inicial"
    >
      <Image
        src="/images/logo/logo-netbox.png"
        alt="Netbox Fibra Óptica"
        width={135}
        height={65}
        priority
      />
    </Link>
  );
}
