import styles from "./PrizeBanner.module.css";
import stylesTypography from "../../../components/ui/Typography.module.css";
import Image from "next/image";
import { Gift } from "lucide-react";
/** Apresenta os valores e a arte dos prêmios na versão completa ou compacta. */
export function PrizeBanner({ compact = false }: {
  compact?: boolean;
}) {
  return (<section
    id={compact ? undefined : "premios"}
    className={compact ? styles.compactLayout : styles.root}
    data-ui={compact ? "prize-banner compact" : "prize-banner"}
  >
    <div className={styles.prizeCopy}>
      <span className={stylesTypography.eyebrow} data-ui="eyebrow">Prêmio no pix</span>
      {!compact && (<Image
        className={styles.illustrationMobileLayout}
        src="/images/netbox-10-anos/Cashback%20PIX%20com%20Notas%20de%20100%20Reais.png"
        alt="Notas de cem reais ao redor de um símbolo Pix"
        width={1421}
        height={1107}
        sizes="(max-width: 700px) 48vw, 190px"
      />)}
      <h2>
        10 sorteios de <strong>R$ 2.000</strong>
      </h2>
      <p>Serão 10 sorteios, com R$ 2.000 via Pix em cada um, para celebrar com quem faz parte dessa história.</p>
      <span className={styles.prizeTotal}>R$ 20 mil <span>em prêmios no total</span></span>
    </div>
    {compact ? (<div className={styles.prizeArt} aria-label="Dez sorteios de dois mil reais via Pix">
      <Gift size={100} strokeWidth={1.4} />
    </div>) : (<div className={styles.prizeArt}>
      <Image
        className={styles.illustration}
        src="/images/netbox-10-anos/Cashback%20PIX%20com%20Notas%20de%20100%20Reais.png"
        alt="Notas de cem reais ao redor de um símbolo Pix"
        width={1421}
        height={1107}
        sizes="(max-width: 760px) 90vw, (max-width: 1100px) 42vw, 520px"
      />
    </div>)}
  </section>);
}
