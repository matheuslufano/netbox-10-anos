import Link from "next/link";
import { FileText } from "lucide-react";
import { Header } from "@/components/shared";
export default function RegulationPage() {
  return (
    <>
      <Header returnHome />
      <main className="shell subpage regulation-page">
        <FileText size={54} />
        <h1>Regulamento da promoção</h1>
        <p>
          O regulamento oficial da campanha Netbox 10 Anos ainda não está
          disponível. O documento de alinhamento não constitui regulamento.
        </p>
        <p>
          Critérios de elegibilidade, sorteios, apuração, pagamento e demais
          condições serão publicados após aprovação oficial.
        </p>
        <Link className="button" href="/10-anos">
          Voltar à campanha
        </Link>
      </main>
    </>
  );
}
