# Netbox 10 Anos
78694736187
Campanha comemorativa da Netbox: apresentação pública, consulta de participação por CPF, painel temporário com números da sorte e demonstração administrativa com dados fictícios.

## Tecnologias e requisitos

- Next.js 16.3.8, App Router, React 19, TypeScript, Tailwind CSS 4 e CSS Modules.
- Ícones Lucide React e React Icons; fontes locais Manrope e Sora.
- Node.js 20.9 ou superior para Next.js; os testes com TypeScript nativo exigem Node.js 22.6 ou superior. Use uma versão LTS compatível com esse requisito.
- npm e acesso ao endpoint oficial ou a um serviço simulado compatível para consultas de desenvolvimento.

## Instalação e execução

```powershell
Copy-Item .env.example .env.local
npm.cmd ci
npm.cmd run dev
```

Abra http://localhost:3000/10-anos. No Git Bash, os mesmos comandos npm funcionam sem o sufixo `.cmd`. Execute apenas um servidor de desenvolvimento por checkout.

`CAMPANHA_API_URL` configura o endpoint externo consultado pelo servidor via GET. Não use o prefixo `NEXT_PUBLIC_`, não publique `.env.local` e não use CPFs reais em testes automatizados. O arquivo `.env.example` existente apresenta o formato esperado. Para simulação, configure a URL de um serviço que implemente o mesmo contrato; este projeto não inicia esse serviço automaticamente.

## Comandos de validação

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd start
```

`start` serve o build de produção. Os testes cobrem CPF, validação do contrato, serviço de consulta com fetch simulado e referências estáticas de CSS Modules.

## Arquitetura

```text
app/                    Rotas, layout raiz, fontes, CSS global e endpoint
components/
  layout/               Header e Logo, com CSS Modules próprios
  ui/                   Carrossel e receitas visuais compartilhadas
features/
  campaign/             Página pública, seções, consulta, contexto e regras
  contacts/             Canais oficiais e atalhos de contato
  dashboard/            Painel do participante, cartões, bilhetes e modal
  demo/                 Tela administrativa fictícia e seus dados locais
  admin/                Estado bloqueado e tipos administrativos existentes
public/                 Imagens, logos e recursos estáticos preservados
tests/                  Testes Node.js, sem consultar serviços reais
docs/                   Guia de CSS, detalhes da campanha e relatório de migração
proxy.ts                Bloqueio administrativo HTTP 403
```

Mantemos `app/` na raiz: mover tudo para `src/` não é necessário para isolar as responsabilidades. O alias `@/` continua apontando para a raiz do projeto. Os arquivos `page.tsx` compõem ou reexportam as telas de `features/`; o endpoint permanece no App Router.

## Onde editar os estilos

Cada componente visual com regras próprias tem um arquivo `Nome.module.css` ao lado de `Nome.tsx`. Exemplo: o banner do participante fica em `features/dashboard/components/ClientHero.tsx` e `ClientHero.module.css`.

Use `className={styles.root}` para o estilo local. Quando um elemento combina uma base compartilhada e uma variação, a composição fica no CSS com `composes`, em vez de uma lista de classes no JSX. Botões, contêineres, títulos de seção, acessibilidade e cartões compartilham receitas em `components/ui/`.

O arquivo `app/globals.css` contém somente reset, tokens, tipografia, documento, tema e preferências globais de movimento. Não adicione nele estilos de seções da campanha ou do painel.

- [Guia de CSS e mapa de componentes](docs/CSS.md): onde editar cada parte, temas, responsividade, animações e hooks entre componentes.
- [Detalhes funcionais e visuais](docs/CAMPANHA.md): marcas, imagens, participação, contatos e limites da integração.
- [Relatório da reorganização](docs/REORGANIZACAO.md): origem/destino dos arquivos, auditoria CSS e validações.

## Rotas e integração

| Rota | Responsabilidade |
| --- | --- |
| `/` | Redireciona para `/10-anos` |
| `/10-anos` | Campanha pública e formulário |
| `/cliente/10-anos` | Painel após consulta; recarregar exige nova consulta |
| `/10-anos/ganhadores` | Estado inicial sem ganhadores fictícios |
| `/10-anos/regulamento` | Aviso de regulamento oficial pendente |
| `/admin/10-anos` | Bloqueio pelo proxy com HTTP 403 |
| `/demo/admin/10-anos` | Demonstração separada, sem operações oficiais |
| `POST /api/campanha/consulta` | Validação do CPF e consulta externa sem cache |

O formulário valida a entrada e chama `features/campaign/services/consultationService.ts`. A API usa `features/campaign/model/consult.ts` para validar a resposta externa, com timeout de oito segundos. O resultado fica somente no contexto React da aba, sem CPF em URL, localStorage ou cookie. Não há autenticação de cliente, CRUD ou edição de contratos.

## Novas funcionalidades e manutenção

1. Escolha a funcionalidade em `features/`; crie uma nova pasta apenas quando existir uma responsabilidade distinta.
2. Mantenha apresentação em `components/`, conteúdo e contratos em `model/`, comunicação HTTP em `services/` e estado compartilhado em `context/`, quando aplicável.
3. Crie componentes e CSS Modules em PascalCase. Use nomes locais curtos, como `root`, `title`, `card` e `actions`.
4. Preserve Server Components. Adicione `"use client"` apenas às fronteiras que precisam de hooks ou eventos próprios.
5. Atualize o guia correspondente, execute as validações e confira as rotas e a interface em desktop/mobile, claro/escuro e movimento reduzido.

Para colaborar, crie uma branch para a tarefa, faça commits coesos após revisar o diff e descreva no PR o comportamento alterado e as verificações executadas. Não há convenção obrigatória de nomes de branch nem pipeline de publicação configurado neste repositório. Nenhum commit ou deploy faz parte da reorganização.

## Limitações e alertas de desenvolvimento

Regulamento, PDF, URLs comerciais e partes das regras oficiais continuam pendentes. Os links comerciais configurados como `#` não navegam. A integração não libera faturas, contratos ou perfil autenticado. Consulte [detalhes e pendências](docs/CAMPANHA.md).

`[HMR] connected` é normal. Se o navegador inserir `data-rm-theme`, `hentry` ou `lang="en"`, teste em um perfil sem extensões. Os scripts `spoken-word.js` e `content-script.js` do relato não pertencem ao projeto. Não esconda essas diferenças com `suppressHydrationWarning`. O layout informa `data-scroll-behavior="smooth"` para o controle de rolagem do Next.js.
