"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LockKeyhole, ShieldCheck, X } from "lucide-react";
import { ConsultCaptcha } from "./ConsultCaptcha";
import styles from "./ConsultCaptchaModal.module.css";

type ConsultCaptchaModalProps = {
  /** Oculta o modal sem desmontar o widget, preservando sua expiração. */
  open: boolean;
  onClose: () => void;
  onToken: (token: string) => void;
};

/** Portal evita o recorte e o contexto de empilhamento do cartão de vidro. */
export function ConsultCaptchaModal({ open, onClose, onToken }: ConsultCaptchaModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      // O desafio de imagens do Google gerencia o foco em seus próprios iframes.
      const controls = panel.current?.querySelectorAll<HTMLElement>("button, iframe");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open, onClose]);

  return createPortal(
    <div
      className={styles.modalBackdrop}
      data-ui="consult-captcha-backdrop"
      data-state={open ? "open" : "closed"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={panel} className={styles.modalPanel} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} data-ui="consult-captcha-modal">
        <button ref={closeButton} type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar verificação de segurança">
          <X size={20} aria-hidden="true" />
        </button>
        <header className={styles.modalHeader}>
          <div className={styles.securityIcon} aria-hidden="true">
            <ShieldCheck size={30} strokeWidth={1.7} />
          </div>
          <span className={styles.eyebrow}>Consulta protegida</span>
          <h2 id={titleId}>Verificação de segurança</h2>
          <p id={descriptionId}>Confirme que você é uma pessoa para continuar com a consulta.</p>
        </header>
        <div className={styles.challengeSurface}>
          <ConsultCaptcha onToken={onToken} />
        </div>
        <p className={styles.completionNote}>
          <LockKeyhole size={14} aria-hidden="true" />
          Ao confirmar, sua participação será consultada.
        </p>
      </div>
    </div>,
    document.body,
  );
}
