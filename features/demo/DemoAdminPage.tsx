"use client";

import { demo, indicators } from "./model/demoFixtures";
import styles from "./DemoAdminPage.module.css";
import stylesButton from "../../components/ui/Button.module.css";
import stylesCard from "../../components/ui/Card.module.css";
import { useMemo, useState } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";



/** Painel demonstrativo com filtros locais sobre eventos fictícios. */
export default function DemoAdmin() {
  const [action, setAction] = useState("");
  const [city, setCity] = useState("");
  const [channel, setChannel] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const rows = useMemo(() => demo.filter((e) => (!action || e.action === action) &&
    (!city || e.city === city) &&
    (!channel || e.channel === channel) &&
    (!status || e.status === status) &&
    (!from || e.date >= from) &&
    (!to || e.date <= to)), [action, city, channel, status, from, to]);
  return (<main className={styles.page} data-ui="shell">
    <Link href="/10-anos" className={stylesButton.textLink} data-ui="text-link">
      <ArrowLeft size={16} /> Voltar à campanha
    </Link>
    <div className={styles.demoWarning}>
      <strong>DEMONSTRAÇÃO — dados totalmente fictícios</strong>
      <p>
        Sem acesso ao sistema oficial. Consulta, exportação, correção e gestão
        de ganhadores não executam operações.
      </p>
    </div>
    <h1>Painel administrativo · Netbox 10 Anos</h1>
    <div className={styles.demoIndicators}>
      {indicators.map(({ title, value, Icon }) => (<article key={title}>
        <Icon size={25} />
        <strong>{value}</strong>
        <span>{title}</span>
      </article>))}
    </div>
    <section className={stylesCard.dashboardCard} data-ui="dashboard-card">
      <h2>
        <Filter size={22} /> Eventos e validações
      </h2>
      <div className={styles.demoFilters}>
        <label>
          Ação
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">Todas</option>
            {[...new Set(demo.map((e) => e.action))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Cidade
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Todas</option>
            {[...new Set(demo.map((e) => e.city))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Canal
          <select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(demo.map((e) => e.channel))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(demo.map((e) => e.status))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          De
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          Até
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>
      <div className={styles.demoTableWrap}>
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
            {rows.map((e) => (<tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.participant}</td>
              <td>{e.city}</td>
              <td>{e.channel}</td>
              <td>{e.action}</td>
              <td>{e.status}</td>
              <td>{e.numbers}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (<p>Nenhum evento fictício corresponde aos filtros.</p>)}
    </section>
    <div className={styles.demoModules}>
      {[
        "Consulta de participantes",
        "Auditoria",
        "Correções justificadas",
        "Exportação autorizada",
        "Gestão de ganhadores",
      ].map((title) => (<article className={stylesCard.dashboardCard} data-ui="dashboard-card" key={title}>
        <h2>{title}</h2>
        <p>
          Estrutura de demonstração. Integração e autorização oficiais
          pendentes.
        </p>
      </article>))}
    </div>
  </main>);
}
