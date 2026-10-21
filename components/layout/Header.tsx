"use client";
import styles from "./Header.module.css";
import { Logo } from "./Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MapPin, Moon, Sun } from "lucide-react";
import { HeaderContactLinks } from "@/features/contacts/components/HeaderContactLinks";
/** Oferece navegação responsiva, contatos oficiais e alternância do tema. */
export function Header({
  client = false,
  returnHome = false,
}: {
  client?: boolean;
  returnHome?: boolean;
}) {
  // Controle da abertura do menu no mobile.
  const [open, setOpen] = useState(false);
  // Estado visual do botão de tema.
  const [darkTheme, setDarkTheme] = useState(false);
  // Mantém o ícone do tema sincronizado com o atributo data-theme do <body>.
  useEffect(() => {
    const syncTheme = () => {
      const selectedMode = document.body.dataset.themeMode;
      setDarkTheme(
        selectedMode === "dark" || document.body.dataset.theme === "dark",
      );
    };
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    syncTheme();
    return () => observer.disconnect();
  }, []);
  // Links exibidos no cabeçalho: área do cliente ou campanha pública.
  const items = client
    ? [
        ["Início", "/10-anos"],
        ["Internet", "/10-anos#acoes"],
        ["Serviços", "/10-anos#acoes"],
        ["Aplicativo", "/10-anos"],
        ["Blog", "/10-anos"],
        ["10 Anos", "/cliente/10-anos"],
      ]
    : [
        ["Início", "#inicio"],
        ["Como participar", "#como-participar"],
        ["Prêmios", "#premios"],
        ["Ganhadores", "#ganhadores"],
        ["Dúvidas", "#duvidas"],
        ["Regulamento", "#regulamento"],
      ];
  return (
    <header
      className={client ? styles.clientLayout : styles.withContactsLayout}
      data-ui={
        client
          ? "site-header site-header--client"
          : "site-header site-header--with-contacts"
      }
    >
      <div className={styles.headerInnerLayout} data-ui="shell">
        <Logo />
        <button
          className={styles.menuToggle}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
        <nav
          id="site-navigation"
          className={open ? styles.openLayout : styles.nav}
          data-ui={open ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          {items.map(([label, href]) => (
            <Link
              key={label}
              href={
                returnHome && href.startsWith("#") ? `/10-anos${href}` : href
              }
              className={label === "10 Anos" ? styles.active : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          {!client && <HeaderContactLinks onNavigate={() => setOpen(false)} />}
        </nav>
        {!client && (
          <div className={styles.headerTools} data-ui="header-tools">
            <button
              className={styles.headerThemeToggle}
              data-ui="header-theme-toggle"
              type="button"
              aria-label={
                darkTheme ? "Desligar tema escuro" : "Ligar tema escuro"
              }
              aria-pressed={darkTheme}
              title={darkTheme ? "Desligar tema escuro" : "Ligar tema escuro"}
              onClick={() => {
                const nextTheme = !(document.body.dataset.theme === "dark");
                if (nextTheme) {
                  document.body.dataset.themeMode = "dark";
                  document.body.dataset.theme = "dark";
                } else {
                  delete document.body.dataset.themeMode;
                  document.body.dataset.theme = "light";
                  window.dispatchEvent(new Event("netbox:theme-auto-resume"));
                }
                setDarkTheme(nextTheme);
              }}
            >
              {darkTheme ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <HeaderContactLinks />
          </div>
        )}
        {client ? (
          <span className={styles.headerLocation}>
            <MapPin size={16} /> Paraíso do Tocantins
          </span>
        ) : (
          <a
            className={styles.headerCtaLayout}
            data-ui="header-cta button"
            href={returnHome ? "/10-anos#consulta" : "#consulta"}
            onClick={() =>
              setTimeout(() => document.getElementById("cpf")?.focus(), 350)
            }
          >
            Consultar meus números
          </a>
        )}
      </div>
    </header>
  );
}
