import Image from "next/image";
import "./campaign-brand.css";

type CampaignBrandProps = {
  className: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  eager?: boolean;
};

/** Preserva a arte clara e usa a marca original com legendas legíveis no tema escuro. */
export function CampaignBrand({
  className,
  src,
  alt,
  width,
  height,
  sizes,
  eager = false,
}: CampaignBrandProps) {
  return (
    <div
      className={`campaign-brand ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        className="campaign-brand__light"
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
      />
      <div className="campaign-brand__dark" aria-hidden="true">
        <span className="campaign-brand__badge">SHOW DE PRÊMIOS</span>
        <div className="campaign-brand__art">
          <Image
            src="/logos/Logo%20NETBOX%2010%20com%20foguete.png"
            alt=""
            width={2172}
            height={724}
            sizes={sizes}
            loading={eager ? "eager" : undefined}
          />
          <span className="campaign-brand__years">anos</span>
        </div>
        <span className="campaign-brand__tagline">Conectando pessoas e construindo histórias.</span>
      </div>
    </div>
  );
}
