"use client";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileClock,
  Filter,
  Gift,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
type DemoEvent = {
  id: string;
  participant: string;
  city: string;
  channel: string;
  action: string;
  status: string;
  numbers: number;
  date: string;
};
const demo: DemoEvent[] = [
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
const indicators = [
  { title: "Contratos", value: 1, Icon: ClipboardCheck },
  { title: "Renovações", value: 1, Icon: FileClock },
  { title: "Upgrades", value: 1, Icon: ChartNoAxesCombined },
  { title: "Indicações convertidas", value: 0, Icon: UsersRound },
  { title: "Participantes", value: 3, Icon: Activity },
  { title: "Números emitidos", value: 4, Icon: Gift },
];
export default function DemoAdmin() {
  const [action, setAction] = useState("");
  const [city, setCity] = useState("");
  const [channel, setChannel] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const rows = useMemo(
    () =>
      demo.filter(
        (e) =>
          (!action || e.action === action) &&
          (!city || e.city === city) &&
          (!channel || e.channel === channel) &&
          (!status || e.status === status) &&
          (!from || e.date >= from) &&
          (!to || e.date <= to),
      ),
    [action, city, channel, status, from, to],
  );
  return (
    <main className="shell demo-admin">
      <Link href="/10-anos" className="text-link">
        <ArrowLeft size={16} /> Voltar à campanha
      </Link>
      <div className="demo-warning">
        <strong>DEMONSTRAÇÃO — dados totalmente fictícios</strong>
        <p>
          Sem acesso ao sistema oficial. Consulta, exportação, correção e gestão
          de ganhadores não executam operações.
        </p>
      </div>
      <h1>Painel administrativo · Netbox 10 Anos</h1>
      <div className="demo-indicators">
        {indicators.map(({ title, value, Icon }) => (
          <article key={title}>
            <Icon size={25} />
            <strong>{value}</strong>
            <span>{title}</span>
          </article>
        ))}
      </div>
      <section className="dashboard-card">
        <h2>
          <Filter size={22} /> Eventos e validações
        </h2>
        <div className="demo-filters">
          <label>
            Ação
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              <option value="">Todas</option>
              {[...new Set(demo.map((e) => e.action))].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Cidade
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Todas</option>
              {[...new Set(demo.map((e) => e.city))].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Canal
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="">Todos</option>
              {[...new Set(demo.map((e) => e.channel))].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos</option>
              {[...new Set(demo.map((e) => e.status))].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            De
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            Até
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
        </div>
        <div className="demo-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Participante</th>
                <th>Cidade</th>
                <th>Canal</th>
                <th>Ação</th>
                <th>Status</th>
                <th>Números</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.participant}</td>
                  <td>{e.city}</td>
                  <td>{e.channel}</td>
                  <td>{e.action}</td>
                  <td>{e.status}</td>
                  <td>{e.numbers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p>Nenhum evento fictício corresponde aos filtros.</p>
        )}
      </section>
      <div className="demo-modules">
        {[
          "Consulta de participantes",
          "Auditoria",
          "Correções justificadas",
          "Exportação autorizada",
          "Gestão de ganhadores",
        ].map((title) => (
          <article className="dashboard-card" key={title}>
            <h2>{title}</h2>
            <p>
              Estrutura de demonstração. Integração e autorização oficiais
              pendentes.
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
