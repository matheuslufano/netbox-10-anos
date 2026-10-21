import styles from "./CampaignBrand.module.css";
import Image from "next/image";
type CampaignBrandProps = {
  className: string;
  /** Contexto visual do componente pai, independente do nome gerado pelo CSS Module. */
  styleHooks?: string;
  src: string;
  /** Arte opcional para o tema escuro; usa a mesma área reservada à arte clara. */
  darkSrc?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
};
/** Exibe as variantes da marca; o carregamento lazy evita antecipar as artes ocultas. */
export function CampaignBrand({
  className,
  styleHooks,
  src,
  darkSrc,
  alt,
  width,
  height,
  sizes,
}: CampaignBrandProps) {
  return (
    <div
      className={[styles.root, darkSrc ? styles.customDark : "", className]
        .filter(Boolean)
        .join(" ")}
      data-ui={styleHooks}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        className={styles.light}
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
      />
      {darkSrc ? (
        <Image
          className={styles.darkImage}
          src={darkSrc}
          alt=""
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
        />
      ) : (
        <div className={styles.dark} aria-hidden="true">
          <span className={styles.badge}>SHOW DE PRÊMIOS</span>
          <div className={styles.art}>
            <Image
              src="/logos/Logo%20NETBOX%2010%20com%20foguete.png"
              alt=""
              width={2172}
              height={724}
              sizes={sizes}
              loading="lazy"
            />
            <span className={styles.years}>anos</span>
          </div>
          <span className={styles.tagline}>
            Conectando pessoas e construindo histórias.
          </span>
        </div>
      )}
    </div>
  );
}
