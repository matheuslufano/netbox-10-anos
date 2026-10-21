"use client";
import styles from "./ClientPage.module.css";
import stylesButton from "../../components/ui/Button.module.css";
import { ClientHero } from "./components/ClientHero";
import { BalanceCard } from "./components/BalanceCard";
import { NumbersCard } from "./components/NumbersCard";
import { NumbersModal } from "./components/NumbersModal";
import Link from "next/link";
import { useState } from "react";
import { Ticket, ArrowRight } from "lucide-react";
import { useConsultation } from "@/features/campaign/context/ConsultationProvider";
import { Header } from "@/components/layout/Header";
import { CommercialBand } from "@/features/campaign/components/CommercialBand";
import { HelpBand } from "@/features/dashboard/components/HelpBand";
import { ParticipantCard } from "@/features/dashboard/components/ParticipantCard";
import { ClientPageBackground } from "@/features/dashboard/components/ClientPageBackground";
/** Compõe o painel temporário ou orienta uma nova consulta quando não há resultado em memória. */
export default function ClientPage() {
  const { data: consultation } = useConsultation();
  const [isNumbersModalOpen, setNumbersModalOpen] = useState(false);
  if (!consultation)
    return (
      <>
        <Header returnHome />
        <ClientPageBackground />
        <main className={styles.emptyState} data-ui="shell client-page">
          <Ticket size={48} />
          <h1>Consulte seus números da sorte</h1>
          <p>Para abrir seu painel, informe seu CPF na página da campanha.</p>
          <Link
            className={stylesButton.button}
            data-ui="button"
            href="/10-anos#consulta"
          >
            Ir para a consulta <ArrowRight size={17} />
          </Link>
        </main>
      </>
    );
  return (
    <>
      <Header returnHome />
      <ClientPageBackground />
      <main
        className={styles.content}
        data-ui="client-main client-main--full client-page"
      >
        <ClientHero />
        <div className={styles.dashboardTop} data-ui="dashboard-top">
          <ParticipantCard consultation={consultation} />
          <BalanceCard consultation={consultation} />
          <NumbersCard
            consultation={consultation}
            onShowAll={() => setNumbersModalOpen(true)}
          />
        </div>
        <CommercialBand />
        <div className={styles.dashboardLower}></div>
        <HelpBand />
      </main>
      {isNumbersModalOpen && (
        <NumbersModal
          numbers={consultation.numeros}
          onClose={() => setNumbersModalOpen(false)}
        />
      )}
    </>
  );
}
