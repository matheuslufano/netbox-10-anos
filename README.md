# Netbox 10 Anos

Site de campanha em Next.js 16 (App Router), TypeScript, Tailwind CSS 4, CSS e Lucide React.

## Executar

```powershell
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Acesse `http://localhost:3000/10-anos`. Para produção, execute `npm.cmd run build` e `npm.cmd start`. A variável `CAMPANHA_API_URL` fica somente no servidor.

## Rotas

- `/10-anos`: campanha e formulário de consulta.
- `/cliente/10-anos`: painel temporário após consulta. O resultado fica apenas na memória da aba; recarregar exige nova consulta.
- `/10-anos/ganhadores`: estado inicial sem ganhadores fictícios.
- `/10-anos/regulamento`: aviso de regulamento oficial pendente.
- `/admin/10-anos`: acesso bloqueado até existir autenticação e integração oficial.
- `/demo/admin/10-anos`: painel ilustrativo separado, com eventos explicitamente fictícios e filtros locais. Não executa operações.
- `POST /api/campanha/consulta`: valida CPF e consulta o endpoint configurado por GET, sem cache.

## Integração

O formulário aceita somente CPF válido e envia por POST ao servidor. O servidor remove a pontuação, chama a API externa com timeout de 8 segundos, valida os campos e retorna total, números, origens e período. A resposta individual não é guardada em URL, localStorage ou cookie. O painel é somente uma consulta, sem liberar faturas, contratos ou perfil autenticado.

Para desenvolvimento, use uma API simulada que reproduza o contrato do prompt. Não use CPFs reais para testes. O endpoint de produção só deve ser consultado mediante ação de uma pessoa autorizada.

## Recursos pendentes

`public/images/netbox-10-anos/` contém ilustrações geradas, sem textos ou marca, para banner público, banner do participante, arte dos prêmios e banner Nossa História. O selo 10 ANOS e o logo são construídos com HTML/CSS e ícones. Para publicação final, substituir por arquivos oficiais separados: logo Netbox, selo tridimensional com foguete, banner público, banner do participante, arte dos prêmios e banner Nossa História. Preparar versões móveis desses banners.

Em `lib/campaign.ts`, confirmar e configurar links comerciais e institucionais, números de cidades/clientes, prazos de contrato quando aplicáveis e URLs do regulamento/PDF oficial. Atualmente os links comerciais pendentes não executam navegação.

Os botões comerciais disparam o evento local `netbox:commercial-click` com apenas a chave da ação. É necessário conectar esse evento a uma ferramenta de analytics aprovada; CPF/CNPJ nunca entram no evento.

O PDF fornecido é de alinhamento. Permanecem pendentes: regulamento, elegibilidade detalhada, planos/cidades/canais, critérios e datas de sorteio, apuração, pagamento, limites, cumulatividade, inadimplência, cancelamento, comunicação dos ganhadores, integração SGP, geração oficial de números, histórico detalhado, autenticação e administração. As interfaces em `lib/admin-types.ts` preparam os campos de evento, filtros e indicadores sem criar operações fictícias.
# netbox-10-anos
