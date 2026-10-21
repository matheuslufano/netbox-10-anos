import stylesLayout from "../../components/ui/Layout.module.css";
import stylesButton from "../../components/ui/Button.module.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { WinnersPreview } from "@/features/campaign/components/WinnersPreview";
export default function WinnersPage() {
  return (
    <>
      <Header returnHome />
      <main className={stylesLayout.subpage}>
        <WinnersPreview />
        <div className={stylesLayout.shell} data-ui="shell">
          <p>
            Nomes, cidades, datas e imagens serão publicados somente após os
            sorteios e conforme as condições oficiais aprovadas.
          </p>
          <Link
            className={stylesButton.outlineButton}
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
