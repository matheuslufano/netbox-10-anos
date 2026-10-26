"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import styles from "./ConsultCaptcha.module.css";

type Recaptcha = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: {
    sitekey: string;
    size: "compact";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => number;
  reset: (widgetId: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Recaptcha;
  }
}

/** Carrega o desafio somente após um CPF válido; nunca envia o CPF ao provedor. */
export function ConsultCaptcha({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const api = window.grecaptcha;
    const host = container.current;
    if (!ready || !siteKey || !api || !host) return;
    let cancelled = false;
    let widgetId: number | undefined;

    api.ready(() => {
      if (cancelled) return;
      // O provedor controla apenas este nó, preservando o contêiner do React.
      const widget = document.createElement("div");
      host.replaceChildren(widget);
      try {
        widgetId = api.render(widget, {
          sitekey: siteKey,
          size: "compact",
          callback: (token) => {
            if (cancelled) return;
            setError("");
            onToken(token);
          },
          "expired-callback": () => {
            if (cancelled) return;
            onToken("");
            setError("A verificação expirou. Complete o CAPTCHA novamente.");
          },
          "error-callback": () => {
            if (cancelled) return;
            onToken("");
            setError("Não foi possível carregar o CAPTCHA. Recarregue a página e tente novamente.");
          },
        });
      } catch {
        setError("Não foi possível iniciar o CAPTCHA. Recarregue a página e tente novamente.");
      }
    });

    return () => {
      cancelled = true;
      if (widgetId !== undefined) api.reset(widgetId);
      host.replaceChildren();
    };
  }, [ready, siteKey, onToken]);

  return (
    <div className={styles.captchaRoot} data-ui="consult-captcha" aria-label="Verificação de segurança">
      {siteKey ? (
        <>
          <Script
            src="https://www.google.com/recaptcha/api.js?render=explicit&hl=pt-BR"
            strategy="afterInteractive"
            onReady={() => setReady(true)}
            onError={() => setError("Não foi possível carregar o CAPTCHA. Recarregue a página e tente novamente.")}
          />
          <div ref={container} />
          {!ready && !error && <p role="status">Carregando verificação…</p>}
        </>
      ) : (
        <p role="alert">A verificação de segurança está indisponível. Tente novamente mais tarde.</p>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
