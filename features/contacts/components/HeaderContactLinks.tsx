import styles from "./HeaderContactLinks.module.css";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { netboxContacts } from "@/features/contacts/model/netboxContacts";
const contactChannels = [
  {
    label: "Instagram da Netbox",
    href: netboxContacts.instagram,
    Icon: FaInstagram,
  },
  {
    label: "WhatsApp da Netbox",
    href: netboxContacts.whatsapp,
    Icon: ImWhatsapp,
  },
  {
    label: "Ligar para a Netbox: 0800 602 2732",
    href: netboxContacts.phone,
    Icon: FiPhone,
  },
  {
    label: "Enviar e-mail para a Netbox",
    href: netboxContacts.email,
    Icon: TfiEmail,
  },
];
/** Atalhos oficiais; onNavigate permite fechar o menu mobile ao escolher um canal. */
export function HeaderContactLinks({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  return (
    <div className={styles.root} role="group" aria-label="Contatos da Netbox">
      {contactChannels.map(({ label, href, Icon }) => (
        <a
          className={styles.headerIconButton}
          key={href}
          href={href}
          onClick={onNavigate}
          aria-label={label}
          title={label}
          target={href.startsWith("https://") ? "_blank" : undefined}
          rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
