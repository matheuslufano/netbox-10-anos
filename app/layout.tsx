import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation-provider";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
});

const sora = localFont({
  src: "./fonts/sora-latin.woff2",
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
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  );
}
