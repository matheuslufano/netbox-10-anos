/** Abre a pergunta de destino, move o foco e reinicia o destaque visual local. */
export function openFaqQuestion(question: HTMLDetailsElement) {
  question.open = true;
  question.querySelector("summary")?.focus({ preventScroll: true });

  question.removeAttribute("data-faq-highlight");
  // Recalcula o estilo para repetir o pulso mesmo ao clicar na mesma âncora.
  void question.offsetWidth;
  question.setAttribute("data-faq-highlight", "true");
}
