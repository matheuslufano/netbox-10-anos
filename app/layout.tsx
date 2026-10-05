import type { Metadata } from "next";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation-provider";
export const metadata: Metadata = {
  title: "Netbox 10 Anos — Conectando pessoas e construindo histórias",
  description:
    "Conheça a campanha Netbox 10 Anos e consulte seus números da sorte.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  );
}
