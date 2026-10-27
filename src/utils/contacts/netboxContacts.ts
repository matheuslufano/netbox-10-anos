/** Canais oficiais compartilhados entre o cabeçalho e os links da campanha. */
export const netboxContacts = {
  instagram: "https://www.instagram.com/netboxinternet/",
  whatsapp: "https://wa.me/5508006022732",
  phone: "tel:08006022732",
  email: "mailto:atendimento@netbox.net.br",
} as const;

/** Preenche uma mensagem no WhatsApp oficial; o envio continua sendo manual. */
export function createNetboxWhatsappLink(message: string): string {
  const url = new URL(netboxContacts.whatsapp);
  url.searchParams.set("text", message);
  return url.toString();
}
