import styles from "./HelpBand.module.css";
import stylesButton from "../../../components/ui/Button.module.css";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
/** Direciona o participante às dúvidas frequentes da campanha. */
export function HelpBand() {
  return (<div className={styles.root} data-ui="help-band">
    <MessageCircle size={42} />
    <div>
      <h3>Ainda tem dúvidas?</h3>
      <p>
        Confira as perguntas mais frequentes sobre a promoção Netbox 10 Anos.
      </p>
    </div>
    <Link className={stylesButton.button} data-ui="button" href="/10-anos#duvidas">
      Ver dúvidas frequentes <ArrowRight size={16} />
    </Link>
  </div>);
}
