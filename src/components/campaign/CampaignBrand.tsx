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
      className={[styles.campaignBrandRoot, darkSrc ? styles.campaignBrandCustomDark : "", className]
        .filter(Boolean)
        .join(" ")}
      data-ui={["campaign-brand", styleHooks].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        className={styles.campaignBrandLight}
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
      />
      {darkSrc ? (
        <Image
          className={styles.campaignBrandDarkImage}
          src={darkSrc}
          alt=""
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
        />
      ) : (
        <div data-ui="campaign-brand-dark" className={styles.campaignBrandDark} aria-hidden="true">
          <span data-ui="campaign-brand-badge" className={styles.campaignBrandBadge}>SHOW DE PRÊMIOS</span>
          <div data-ui="campaign-brand-art" className={styles.campaignBrandArt}>
            <Image
              src="/logos/Logo%20NETBOX%2010%20com%20foguete.png"
              alt=""
              width={2172}
              height={724}
              sizes={sizes}
              loading="lazy"
            />
            <span data-ui="campaign-brand-years" className={styles.campaignBrandYears}>anos</span>
          </div>
          <span data-ui="campaign-brand-tagline" className={styles.campaignBrandTagline}>
            Conectando pessoas e construindo histórias.
          </span>
        </div>
      )}
    </div>
  );
}
