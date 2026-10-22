"use client";
import styles from "./ClientPage.module.css";
import stylesButton from "../../ui/Button.module.css";
import { ClientHero } from "../../dashboard/ClientHero";
import { BalanceCard } from "../../dashboard/BalanceCard";
import { NumbersCard } from "../../dashboard/NumbersCard";
import { NumbersModal } from "../../dashboard/NumbersModal";
import Link from "next/link";
import { useState } from "react";
import { Ticket, ArrowRight } from "lucide-react";
import { useConsultation } from "@/context/campaign/ConsultationProvider";
import { Header } from "@/components/layout/Header";
import { CommercialBand } from "@/components/campaign/CommercialBand";
import { HelpBand } from "@/components/dashboard/HelpBand";
import { ParticipantCard } from "@/components/dashboard/ParticipantCard";
import { ClientPageBackground } from "@/components/dashboard/ClientPageBackground";
/** Compõe o painel temporário ou orienta uma nova consulta quando não há resultado em memória. */
export default function ClientPage() {
  const { data: consultation } = useConsultation();
  const [isNumbersModalOpen, setNumbersModalOpen] = useState(false);
  if (!consultation)
    return (
      <>
        <Header returnHome />
        <ClientPageBackground />
        <main className={styles.clientPageEmptyState} data-ui="shell client-page">
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
        className={styles.clientPageContent}
        data-ui="client-main client-main--full client-page"
      >
        <ClientHero />
        <div className={styles.clientPageDashboardTop} data-ui="dashboard-top">
          <ParticipantCard consultation={consultation} />
          <BalanceCard consultation={consultation} />
          <NumbersCard
            consultation={consultation}
            onShowAll={() => setNumbersModalOpen(true)}
          />
        </div>
        <CommercialBand />
        <div data-ui="client-page-dashboard-lower" className={styles.clientPageDashboardLower}></div>
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
