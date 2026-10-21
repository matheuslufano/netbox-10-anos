import { Activity, ChartNoAxesCombined, ClipboardCheck, FileClock, Gift, UsersRound } from "lucide-react";

/** Dados ilustrativos; não representam participantes nem operações reais. */
export type DemoEvent = {
  id: string;
  participant: string;
  city: string;
  channel: string;
  action: string;
  status: string;
  numbers: number;
  date: string;
};

export const demo: DemoEvent[] = [
  {
    id: "DEMO-001",
    participant: "Participante fictício A",
    city: "Cidade A",
    channel: "Loja",
    action: "Ativação",
    status: "Validado",
    numbers: 1,
    date: "2026-10-02",
  },
  {
    id: "DEMO-002",
    participant: "Participante fictício B",
    city: "Cidade B",
    channel: "Digital",
    action: "Indicação",
    status: "Em análise",
    numbers: 0,
    date: "2026-10-03",
  },
  {
    id: "DEMO-003",
    participant: "Participante fictício C",
    city: "Cidade A",
    channel: "Vendas",
    action: "Renovação com upgrade",
    status: "Validado",
    numbers: 3,
    date: "2026-10-04",
  },
];

export const indicators = [
  { title: "Contratos", value: 1, Icon: ClipboardCheck },
  { title: "Renovações", value: 1, Icon: FileClock },
  { title: "Upgrades", value: 1, Icon: ChartNoAxesCombined },
  { title: "Indicações convertidas", value: 0, Icon: UsersRound },
  { title: "Participantes", value: 3, Icon: Activity },
  { title: "Números emitidos", value: 4, Icon: Gift },
];
