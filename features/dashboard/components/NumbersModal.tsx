"use client";
import styles from "./NumbersModal.module.css";
import stylesNumbersGrid from "./NumbersGrid.module.css";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { LuckyNumberTicket } from "@/features/dashboard/components/LuckyNumberTicket";
/** Lista todos os bilhetes e mantém fechamento por Escape e contenção do foco. */
export function NumbersModal({ numbers, onClose, }: {
  numbers: string[];
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape")
        onClose();
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>("[data-modal] button");
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);
  return (<div
    className={styles.modalBackdrop}
    onMouseDown={(e) => {
      if (e.target === e.currentTarget)
        onClose();
    }}
  >
    <div
      className={styles.root}
      data-ui="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-modal
    >
      <button ref={closeButtonRef} className={styles.modalClose} onClick={onClose} aria-label="Fechar lista">
        <X />
      </button>
      <h2 id="modal-title">Todos os seus números da sorte</h2>
      <p>
        {numbers.length}{" "}
        {numbers.length === 1 ? "número disponível" : "números disponíveis"}
      </p>
      <div className={stylesNumbersGrid.numberGrid}>
        {numbers.map((n, i) => (<LuckyNumberTicket number={n} key={`${n}-${i}`} />))}
      </div>
    </div>
  </div>);
}
