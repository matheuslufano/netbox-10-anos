import styles from "./LuckyNumberTicket.module.css";
import { useId } from "react";
import { Rocket, Star } from "lucide-react";
type LuckyNumberTicketProps = {
  number: string;
};
// Todas as camadas usam a mesma escala, evitando recortes desalinhados ao redimensionar.
const ticketOutline = "M16 0H224A16 16 0 0 0 240 16V28a4 4 0 0 0 0 8v14a4 4 0 0 0 0 8v14a4 4 0 0 0 0 8V92A16 16 0 0 0 224 108H16A16 16 0 0 0 0 92V80a4 4 0 0 0 0-8V58a4 4 0 0 0 0-8V36a4 4 0 0 0 0-8V16A16 16 0 0 0 16 0Z";
const ticketInset = "M23.324 9H216.676A25 25 0 0 0 231 23.324V84.676A25 25 0 0 0 216.676 99H23.324A25 25 0 0 0 9 84.676V23.324A25 25 0 0 0 23.324 9Z";
const perforations = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 108];
/** Bilhete vetorial de rifa com papel claro, moldura dupla e canhoto perfurado. */
export function LuckyNumberTicket({ number }: LuckyNumberTicketProps) {
  const instanceId = useId();
  const maskId = `${instanceId}-mask`;
  const insetId = `${instanceId}-inset`;
  const paperId = `${instanceId}-paper`;
  const titleId = `${instanceId}-title`;
  const numberSize = number.length > 6 ? Math.max(14, 216 / number.length) : 36;
  return (<svg
    className={styles.root}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 108"
    width="240"
    height="108"
    role="img"
    aria-labelledby={titleId}
  >
    <title id={titleId}>{`Número da sorte ${number}`}</title>
    <defs>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="108">
        <path fill="white" d={ticketOutline} />
        <g fill="black">
          {perforations.map((position) => (<ellipse key={position} cx="184" cy={position} rx="1.25" ry="2.1" />))}
        </g>
      </mask>
      <clipPath id={insetId}>
        <path d={ticketInset} />
      </clipPath>
      <filter id={paperId} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
    <g mask={`url(#${maskId})`}>
      <path fill="#eda16e" d={ticketOutline} />
      <g clipPath={`url(#${insetId})`}>
        <path fill="#fbe9d6" d="M0 0H182V108H0Z" />
      </g>
      <path className={styles.frame} d={ticketInset} fill="none" stroke="#91401a" strokeWidth="1.5" />
      {/* A moldura é interrompida junto ao canhoto, como na referência. */}
      <path d="M179 6H188V12H179ZM179 96H188V102H179Z" fill="#eda16e" />
      <path
        className={styles.fineLine}
        d="M25 12H181V96H25A28 28 0 0 0 12 83V25A28 28 0 0 0 25 12Z"
        fill="none"
        stroke="#c47543"
        strokeWidth=".65"
      />
      <path
        className={styles.fineLine}
        d="M184 3V105"
        stroke="#a95c32"
        strokeWidth=".6"
        strokeDasharray="3 3"
      />
      <path className={styles.texture} d="M0 0H240V108H0Z" filter={`url(#${paperId})`} opacity=".14" />
      <g fill="#81330f" fontFamily="Arial, sans-serif" textAnchor="middle">
        <text x="99" y="39" fontSize="10.2" fontWeight="800">NÚMERO DA SORTE</text>
        <text className={styles.number} x="99" y="76" fontSize={numberSize} fontWeight="800">{number}</text>
      </g>
      <g className={styles.icons} color="#81330f" aria-hidden="true">
        <Star x="203" y="20" size={17} fill="currentColor" strokeWidth={1} />
        <Rocket x="197" y="43" size={29} strokeWidth={1.6} />
        <Star x="203" y="77" size={17} fill="currentColor" strokeWidth={1} />
      </g>
    </g>
  </svg>);
}
