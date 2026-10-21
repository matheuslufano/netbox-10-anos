<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Arquitetura e CSS do projeto

- Mantenha `app/` na raiz como camada de rotas, layout raiz e endpoints; não adicione lógica de telas aos reexports de páginas.
- Use `features/campaign`, `features/dashboard`, `features/contacts`, `features/demo` e `features/admin` para código de domínio. Dentro de cada funcionalidade, separe componentes, model, services e context apenas quando necessários.
- Use `components/layout` para Header/Logo e `components/ui` para interação e receitas visuais independentes do domínio.
- Componentes e CSS Modules seguem PascalCase: `Nome.tsx` e `Nome.module.css`, lado a lado. Interface sem estilos exclusivos usa componentes ou receitas compartilhados; não crie arquivos vazios.
- Use `styles.root` e nomes locais claros. Componha bases compartilhadas no CSS com `composes`, evitando listas de classes no JSX. Não reintroduza `shared.tsx` nem CSS globais de diversas seções.
- Reserve `app/globals.css` a reset, tokens, documento, tipografia, foco, tema e preferências realmente globais.
- `data-ui` é um hook de contexto conservado na migração; `data-theme` e `data-carousel-*` são estados/comportamentos explícitos. JavaScript não deve depender dos hashes de CSS Modules.
- Preserve as rotas, o contrato de consulta, o proxy administrativo, a privacidade do CPF, as artes e os limites de Server/Client Components.
- Consulte [docs/CSS.md](docs/CSS.md) para o mapa completo e [docs/CAMPANHA.md](docs/CAMPANHA.md) para comportamentos existentes.
- Valide com `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test` e `npm.cmd run build`. Para UI, confira a aparência quando houver navegador disponível e registre limitações sem afirmar testes não executados.
- Preserve alterações locais preexistentes, atualize a documentação pertinente e não faça commits ou deploys sem solicitação.
