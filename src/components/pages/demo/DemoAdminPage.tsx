"use client";

import { demo, indicators } from "../../../utils/demo/demoFixtures";
import styles from "./DemoAdminPage.module.css";
import stylesButton from "../../ui/Button.module.css";
import stylesCard from "../../ui/Card.module.css";
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
  return (<main className={styles.demoAdminPagePage} data-ui="shell">
    <Link href="/10-anos" className={stylesButton.buttonTextLink} data-ui="text-link">
      <ArrowLeft size={16} /> Voltar à campanha
    </Link>
    <div data-ui="demo-admin-page-demo-warning" className={styles.demoAdminPageDemoWarning}>
      <strong>DEMONSTRAÇÃO — dados totalmente fictícios</strong>
      <p>
        Sem acesso ao sistema oficial. Consulta, exportação, correção e gestão
        de ganhadores não executam operações.
      </p>
    </div>
    <h1>Painel administrativo · Netbox 10 Anos</h1>
    <div data-ui="demo-admin-page-demo-indicators" className={styles.demoAdminPageDemoIndicators}>
      {indicators.map(({ title, value, Icon }) => (<article data-ui="demo-admin-page-article" key={title}>
        <Icon size={25} />
        <strong>{value}</strong>
        <span>{title}</span>
      </article>))}
    </div>
    <section className={stylesCard.cardDashboardCard} data-ui="dashboard-card">
      <h2>
        <Filter size={22} /> Eventos e validações
      </h2>
      <div data-ui="demo-admin-page-demo-filters" className={styles.demoAdminPageDemoFilters}>
        <label>
          Ação
          <select data-ui="demo-admin-page-select" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">Todas</option>
            {[...new Set(demo.map((e) => e.action))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Cidade
          <select data-ui="demo-admin-page-select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Todas</option>
            {[...new Set(demo.map((e) => e.city))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Canal
          <select data-ui="demo-admin-page-select" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(demo.map((e) => e.channel))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          Status
          <select data-ui="demo-admin-page-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(demo.map((e) => e.status))].map((v) => (<option key={v}>{v}</option>))}
          </select>
        </label>
        <label>
          De
          <input data-ui="demo-admin-page-input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          Até
          <input data-ui="demo-admin-page-input" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>
      <div data-ui="demo-admin-page-demo-table-wrap" className={styles.demoAdminPageDemoTableWrap}>
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
    <div data-ui="demo-admin-page-demo-modules" className={styles.demoAdminPageDemoModules}>
      {[
        "Consulta de participantes",
        "Auditoria",
        "Correções justificadas",
        "Exportação autorizada",
        "Gestão de ganhadores",
      ].map((title) => (<article className={stylesCard.cardDashboardCard} data-ui="dashboard-card" key={title}>
        <h2>{title}</h2>
        <p>
          Estrutura de demonstração. Integração e autorização oficiais
          pendentes.
        </p>
      </article>))}
    </div>
  </main>);
}
