import "../styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConsultationProvider } from "@/context/campaign/ConsultationProvider";

const manrope = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
});

const sora = localFont({
  src: "../assets/fonts/sora-latin.woff2",
  variable: "--font-display",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Netbox 10 Anos — Conectando pessoas e construindo histórias",
  description:
    "Conheça a campanha Netbox 10 Anos e consulte seus números da sorte.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body data-ui="layout-body" className={`${manrope.variable} ${sora.variable}`}>
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  );
}
