import stylesLayout from "../../ui/Layout.module.css";
import stylesButton from "../../ui/Button.module.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { WinnersPreview } from "@/components/campaign/WinnersPreview";
export default function WinnersPage() {
  return (
    <>
      <Header returnHome />
      <main data-ui="layout-subpage" className={stylesLayout.layoutSubpage}>
        <WinnersPreview />
        <div className={stylesLayout.layoutShell} data-ui="shell">
          <p>
            Nomes, cidades, datas e imagens serão publicados somente após os
            sorteios e conforme as condições oficiais aprovadas.
          </p>
          <Link
            className={stylesButton.buttonOutlineButton}
            data-ui="outline-button"
            href="/10-anos"
          >
            Voltar à campanha
          </Link>
        </div>
      </main>
    </>
  );
}
