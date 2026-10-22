import styles from "./Logo.module.css";
import Link from "next/link";
import Image from "next/image";
/** Preserva a proporção da arte original; next/image fornece as resoluções responsivas. */
export function Logo() {
  return (
    <Link
      className={styles.logoRoot}
      href="/10-anos"
      aria-label="Netbox, página inicial"
    >
      <Image
        className={styles.logoImage}
        src="/images/logo/logo-netbox.png"
        alt="Netbox — Internet de verdade"
        width={3746}
        height={1378}
        sizes="(max-width: 640px) 148px, 160px"
        preload
      />
    </Link>
  );
}
