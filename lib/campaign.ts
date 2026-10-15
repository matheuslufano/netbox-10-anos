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
  institutional: { cities: "17", clients: "+15.000", confirmed: false },
  commercial: {
    indication: "#",
    upgrade: "#",
    plans: "#",
    renewal: "#",
    history: "#",
  },
  legal: {
    regulationUrl: "",
    regulationPdfUrl: "",
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
    title: "Faça uma renovação do seu plano",
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
    "Quem pode participar?",
    "Clientes pessoa física e pessoa jurídica poderão participar conforme os critérios de elegibilidade do regulamento oficial, ainda pendente de publicação.",
  ],
  [
    "Como ganho números da sorte?",
    "Cada ação elegível e validada gera diretamente a quantidade de números indicada nesta página.",
  ],
  [
    "Como funciona a indicação?",
    "A indicação gera 5 números após o contrato indicado ser considerado elegível e ativado.",
  ],
  [
    "Quando meus números aparecem?",
    "Após a validação da ação correspondente. O prazo de atualização será definido nas regras oficiais.",
  ],
  [
    "Cliente inadimplente participa?",
    "Essa condição depende do regulamento oficial, ainda pendente.",
  ],
  [
    "Cliente PJ participa?",
    "Sim, clientes PJ estão previstos na campanha, sujeitos à elegibilidade. A consulta disponível aqui aceita CPF; a consulta por CNPJ depende de integração futura.",
  ],
  [
    "Posso participar com mais de um contrato?",
    "A regra para múltiplos contratos ainda depende de confirmação no regulamento oficial.",
  ],
  [
    "Existe limite de números?",
    "Um eventual limite ainda depende de confirmação no regulamento oficial.",
  ],
  [
    "Posso ganhar mais de uma vez?",
    "Essa possibilidade ainda depende de confirmação no regulamento oficial.",
  ],
  [
    "Quando serão os sorteios?",
    "As datas de sorteio e apuração ainda serão confirmadas no regulamento oficial.",
  ],
  [
    "O que acontece se eu cancelar?",
    "O tratamento de cancelamentos ainda depende de regras oficiais.",
  ],
  [
    "Como recebo o prêmio?",
    "A premiação prevista é via Pix, sujeita às regras legais, fiscais e cadastrais aplicáveis. O procedimento será detalhado no regulamento oficial.",
  ],
];
export function dateBR(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}
