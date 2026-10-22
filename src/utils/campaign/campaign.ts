import {
  Gift,
  UsersRound,
  ChartNoAxesCombined,
  UserRoundPlus,
} from "lucide-react";
import { FaRegUser } from "react-icons/fa";
export const campaign = {
  name: "Netbox 10 Anos",
  tagline: "Conectando pessoas e construindo histórias",
  period: { inicio: "2026-10-01", fim: "2026-12-31" },
  prizes: { count: 10, each: 2000, total: 20000 },
  institutional: { cities: "21", clients: "+15.000", confirmed: false },
  commercial: {
    indication: "#",
    upgrade: "#",
    plans: "#",
    renewal: "#",
    history: "#",
  },
  legal: {
    regulationUrl: "/10-anos/regulamento",
    regulationPdfUrl: "/documents/regulamento-netbox-10-anos-v1.pdf",
    pfMinimumMonths: 12,
    pjMinimumMonths: 24,
  },
  origins: {
    ativacao: "Ativação",
    indicacao: "Indicação convertida",
    renovacao_upgrade: "Renovação com upgrade",
    renovacao_pf: "Renovação PF",
    renovacao_pj: "Renovação PJ",
    novo_cliente_pf: "Novo cliente PF",
    novo_cliente_pj: "Novo cliente PJ",
  } as Record<string, string>,
};

/** Quantidades exibidas nas ações e nas etapas de participação da campanha. */
export const campaignRewardAmounts = {
  activeContract: 1,
  indication: 5,
  renewal: 2,
  newContract: 2,
} as const;

export const actions = [
  {
    title: "Indique um amigo",
    amount: campaignRewardAmounts.indication,
    description: "Quando sua indicação gerar um contrato elegível e ativado",
    icon: UsersRound,
  },
  {
    title: "Contrato ativo",
    amount: campaignRewardAmounts.activeContract,
    description: "Todo cliente ativo já concorre a 1 número da sorte.",
    icon: FaRegUser,
  },
  {
    title: "Renovação do contrato",
    amount: campaignRewardAmounts.renewal,
    description: "Renove e aproveite para melhorar seu plano",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Novo contrato",
    amount: campaignRewardAmounts.newContract,
    description: "Contrate mais um de nossos planos de internet",
    icon: UserRoundPlus,
  },
];
export const commercialActions = [
  {
    title: "Indique um amigo",
    amount: "+5 números",
    cta: "Indicar agora",
    href: campaign.commercial.indication,
    icon: UsersRound,
    key: "indication",
  },
  {
    title: "Renove o seu plano ",
    amount: "+2 números",
    cta: "Conhecer planos",
    href: campaign.commercial.upgrade,
    icon: ChartNoAxesCombined,
    key: "upgrade",
  },
  {
    title: "Contrate a Netbox",
    amount: "+2 números",
    cta: "Ver planos",
    href: campaign.commercial.plans,
    icon: Gift,
    key: "plans",
  },
];

export const faq = [
  [
    "Quem pode participar da promoção?",
    "Podem participar clientes pessoa física, titulares de contrato ativo com a Netbox nas cidades participantes da campanha. A participação é automática e gratuita. Para concorrer ao sorteio, é necessário manter pelo menos um contrato ativo na data da apuração.",
  ],
  [
    "Como faço para participar do sorteio?",
    "Se você já é cliente Netbox e atende aos critérios da promoção, sua participação é automática. Cada CPF elegível recebe um número da sorte inicial, sem necessidade de inscrição. Para acompanhar sua participação, baixe e ative o aplicativo Netbox e acesse o banner da campanha.",
  ],
  [
    "Como posso ganhar números da sorte?",
    "Você pode acumular números da sorte de quatro maneiras:\n- 1 número: por ser cliente Netbox ativo.\n- 5 números adicionais: por indicação validada de um novo cliente.\n- 2 números adicionais: por nova contratação elegível, após a ativação.\n- 2 números adicionais: por renovação de contrato elegível.\nOs números são cumulativos, respeitando as condições do regulamento.",
  ],
  [
    "Como funciona a indicação de amigos?",
    "Indique alguém que ainda não seja cliente Netbox por um dos nossos canais oficiais, informando seu CPF antes da conclusão da contratação. Se a pessoa contratar e tiver a internet ativada durante a campanha, você receberá 5 números da sorte adicionais. Não há limite individual de indicações válidas.",
  ],
  [
    "Como funciona a renovação do contrato?",
    "Ao renovar seu contrato nas condições previstas no regulamento, você recebe 2 números da sorte adicionais. A renovação precisa ser formalizada e validada no sistema da Netbox durante a campanha. Consulte nossa equipe para verificar se seu contrato está elegível.",
  ],
  [
    "Cliente com mensalidade atrasada participa?",
    "Sim. O regulamento não exige que todas as mensalidades estejam em dia para participar. O importante é que o cliente tenha um contrato ativo no sistema da Netbox na data da apuração e cumpra os demais critérios da promoção.",
  ],
  [
    "Posso participar com mais de um contrato?",
    "Sim. Cada CPF recebe apenas 1 número da sorte inicial, independentemente da quantidade de contratos ativos. Entretanto, renovações elegíveis de contratos diferentes podem gerar 2 números adicionais por contrato renovado, respeitando as regras da campanha.",
  ],
  [
    "Existe limite de números da sorte?",
    "Não há limite individual de indicações válidas. Você pode acumular números da sorte por indicações, novas contratações e renovações elegíveis, respeitando as condições e a capacidade de números prevista no regulamento da promoção.",
  ],
  [
    "Preciso baixar o aplicativo Netbox para participar?",
    "Não. A participação é automática para clientes elegíveis. Entretanto, recomendamos baixar e ativar o aplicativo Netbox, pois é a maneira mais prática de acessar a página da campanha, conferir seus números da sorte e acompanhar as informações da promoção.",
  ],
  [
    "Como consulto meus números da sorte?",
    "Baixe e ative o aplicativo Netbox no seu celular, toque no banner do Show de Prêmios Netbox 10 Anos e acesse a página da campanha. Nela, você poderá consultar seus números da sorte vinculados ao CPF. Também é possível acessar diretamente.",
  ],
  [
    "Quando meus números da sorte ficam disponíveis?",
    "Os números da sorte são atribuídos após a identificação e validação das condições de participação ou das ações realizadas durante a campanha. Você poderá consultá-los na página oficial, acessível pelo aplicativo Netbox. Em caso de divergência, entre em contato pelo 0800 602 2732.",
  ],
  [
    "Qual é o prazo para participar da promoção?",
    "O período de participação começa em 26 de outubro de 2026 e termina em 29 de janeiro de 2027, às 23h59, pelo horário de Brasília. Para receber números adicionais, as ações elegíveis precisam ser concluídas e validadas dentro desse período.",
  ],
  [
    "Quando e como será realizado o sorteio?",
    "O sorteio está previsto para 30 de janeiro de 2027, às 11h, por meio de sistema eletrônico, conforme a mecânica autorizada da promoção. Serão selecionados 10 contemplados distintos. Os resultados serão divulgados no site e nos canais oficiais da Netbox.",
  ],
  [
    "Posso ganhar mais de uma vez?",
    "Não. Cada CPF poderá ser contemplado apenas uma vez durante a promoção. Serão 10 ganhadores diferentes, e cada um receberá R$ 2.000 via Pix, totalizando R$ 20 mil em prêmios.",
  ],
  [
    "O que acontece se eu cancelar meu contrato?",
    "Se você cancelar seu único contrato e não possuir outro contrato ativo na data da apuração, perderá o direito de concorrer, mesmo que já tenha recebido números da sorte. Para continuar elegível, é necessário manter pelo menos um contrato ativo e cumprir as demais condições do regulamento.",
  ],
  [
    "Como saberei se ganhei e como recebo o prêmio?",
    "Os resultados serão divulgados nos canais oficiais da Netbox e na página da campanha. Os contemplados também serão contatados pelos dados cadastrados para confirmação das informações necessárias ao recebimento. Cada prêmio será de R$ 2.000 via Pix, sem custos para o ganhador, com entrega prevista em até 30 dias após a apuração, conforme as regras autorizadas.",
  ],
];

/** Formata uma data ISO sem horário, preservando o dia informado pelo serviço. */
export function dateBR(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}
