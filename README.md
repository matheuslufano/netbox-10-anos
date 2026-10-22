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

`start` serve o build de produção. Os testes cobrem CPF, validação do contrato, serviço de consulta com fetch simulado, referências estáticas e composições de CSS Modules.

## Arquitetura

```text
src/
  app/                  Rotas App Router, layout HTML, favicon e endpoint
  assets/fonts/         Fontes locais importadas pelo layout
  components/
    layout/             Header e Logo
    ui/                 Carrossel e receitas visuais reutilizáveis
    pages/              Telas completas por domínio: campaign, dashboard, demo, admin
    campaign/           Seções da campanha e seus CSS Modules
    contacts/           Atalhos de contato
    dashboard/          Cartões, bilhetes e modal do participante
  styles/               Reset, tokens, tipografia e temas globais
  utils/                Conteúdo, contratos, máscaras e validações por domínio
  services/campaign/    Serviço HTTP de consulta
  context/campaign/     Estado temporário da consulta
  proxy.ts              Bloqueio administrativo HTTP 403
public/                 Imagens, ícones e logos com URLs públicas preservadas
tests/                  Testes Node.js sem consultar serviços reais
docs/                   Guias e relatórios de manutenção
```

O alias `@/` aponta para `src/`. Os arquivos `src/app/**/page.tsx` compõem ou reexportam as telas de `src/components/pages/`; o endpoint permanece no App Router. `src/pages` é reservado ao Pages Router do Next.js e por isso as telas ficam em `src/components/pages`. O HTML base é definido em `src/app/layout.tsx`, conforme o framework, sem um `index.html` independente.

Adicione imagens e ícones que precisam de URL fixa em `public/images/` ou `public/logos/` e referencie-os por `/images/...` ou `/logos/...`. Recursos importados pelo código, como fontes locais, ficam em `src/assets/`. Configurações e variáveis de ambiente permanecem na raiz.

## Onde editar os estilos

Cada componente visual com regras próprias tem um arquivo `Nome.module.css` ao lado de `Nome.tsx`. Exemplo: o banner do participante fica em `src/components/dashboard/ClientHero.tsx` e `ClientHero.module.css`.

Use nomes locais descritivos, como `styles.footerRoot`, `styles.navigationList` e `styles.socialLink`. Adicione `data-ui` aos contêineres e controles importantes para localizá-los no DevTools; preserve os tokens existentes e use seletores `[data-ui~="nome"]`. Quando um elemento combina uma base compartilhada e uma variação, a composição fica no CSS com `composes`, em vez de uma lista de classes no JSX. Botões, contêineres, títulos de seção, acessibilidade e cartões compartilham receitas em `src/components/ui/`.

O arquivo `src/styles/globals.css` contém somente reset, tokens, tipografia, documento, tema e preferências globais de movimento. Não adicione nele estilos de seções da campanha ou do painel.

- [Guia de CSS e mapa de componentes](docs/CSS.md): onde editar cada parte, temas, responsividade, animações e hooks entre componentes.
- [Detalhes funcionais e visuais](docs/CAMPANHA.md): marcas, imagens, participação, contatos e limites da integração.
- [Relatório da migração para src](docs/ALTERACOES-SRC.md): arquivos movidos, linhas alteradas e impacto.
- [Relatório histórico da reorganização](docs/REORGANIZACAO.md): origem/destino dos arquivos, auditoria CSS e validações.

## Rotas e integração

| Rota | Responsabilidade |
| --- | --- |
| `/` | Redireciona para `/10-anos` |
| `/10-anos` | Campanha pública e formulário |
| `/cliente/10-anos` | Painel após consulta; recarregar exige nova consulta |
| `/10-anos/ganhadores` | Estado inicial sem ganhadores fictícios |
| `/10-anos/regulamento` | Texto integral do regulamento V1, índice de seções e download do PDF |
| `/politica-de-privacidade` | Aviso sobre o tratamento de dados na consulta da campanha |
| `/admin/10-anos` | Bloqueio pelo proxy com HTTP 403 |
| `/demo/admin/10-anos` | Demonstração separada, sem operações oficiais |
| `POST /api/campanha/consulta` | Validação do CPF e consulta externa sem cache |

O formulário valida a entrada e chama `src/services/campaign/consultationService.ts`. A API usa `src/utils/campaign/consult.ts` para validar a resposta externa, com timeout de oito segundos. O resultado fica somente no contexto React da aba, sem CPF em URL, localStorage ou cookie. Não há autenticação de cliente, CRUD ou edição de contratos.

## Novas funcionalidades e manutenção

1. Localize a tela em `src/components/pages/` e as seções em `src/components/<domínio>/`; crie pastas apenas quando houver uma responsabilidade distinta.
2. Mantenha apresentação em `src/components/`, conteúdo e contratos em `src/utils/<domínio>/`, comunicação HTTP em `src/services/` e estado compartilhado em `src/context/`.
3. Crie componentes e CSS Modules em PascalCase. Use nomes locais descritivos, como `footerRoot`, `navigationList` e `socialLink`, e mantenha TSX e composições CSS sincronizados.
4. Preserve Server Components. Adicione `"use client"` apenas às fronteiras que precisam de hooks ou eventos próprios.
5. Atualize o guia correspondente, execute as validações e confira as rotas e a interface em desktop/mobile, claro/escuro e movimento reduzido.

Para colaborar, crie uma branch para a tarefa, faça commits coesos após revisar o diff e descreva no PR o comportamento alterado e as verificações executadas. Não há convenção obrigatória de nomes de branch nem pipeline de publicação configurado neste repositório. Nenhum commit ou deploy faz parte da reorganização.

## Limitações e alertas de desenvolvimento

Se o Turbopack repetir `app_dir must be a directory` após mover `app/` para `src/app/`, pare o servidor com `Ctrl+C` e remova apenas o cache gerado de desenvolvimento. Execute na raiz deste projeto:

```powershell
Remove-Item -LiteralPath .next/dev -Recurse -Force
npm.cmd run dev
```

No Git Bash, use `rm -rf -- .next/dev` e depois `npm run dev`. O Next.js recria esse diretório automaticamente. Neste caso, o erro foi reproduzido com o cache anterior e deixou de ocorrer com um cache novo, sem alterar as rotas ou o compilador. Se persistir, preserve o novo arquivo `next-panic-*.log` indicado no terminal para investigar a causa; `npm run dev -- --webpack` permite testar o compilador alternativo previsto pela CLI.

O regulamento V1 e seu PDF estão disponíveis. URLs comerciais e a integração operacional das regras continuam pendentes. Os links comerciais configurados como `#` não navegam. A integração não libera faturas, contratos ou perfil autenticado. Consulte [detalhes e pendências](docs/CAMPANHA.md).

`[HMR] connected` é normal. Se o navegador inserir `data-rm-theme`, `hentry` ou `lang="en"`, teste em um perfil sem extensões. Os scripts `spoken-word.js` e `content-script.js` do relato não pertencem ao projeto. Não esconda essas diferenças com `suppressHydrationWarning`. O layout informa `data-scroll-behavior="smooth"` para o controle de rolagem do Next.js.
