# Netbox 10 Anos
 78694736187
Site de campanha em Next.js 16 (App Router), TypeScript, Tailwind CSS 4, CSS e Lucide React. A tipografia usa Manrope para textos e Sora para títulos, seguindo o site institucional Netbox.

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

## Cabeçalho e contatos

Os atalhos usam a classe `header-icon-button`, cujo estilo é compartilhado com `header-theme-toggle` em `app/globals.css`, incluindo formato circular, cores, foco, hover e tema escuro.

O cabeçalho público oferece quatro atalhos por ícone: Instagram, WhatsApp, telefone e e-mail. No desktop, ficam ao lado do botão de tema. No celular (até 640 px), aparecem dentro de `#site-navigation`, abaixo dos links do menu, com áreas de toque de 44 px; escolher um canal fecha o menu. O cabeçalho mobile mantém uma única linha de 76 px. Os destinos oficiais estão centralizados em `lib/netbox-contacts.ts`; os ícones são renderizados por `components/header-contact-links.tsx` e estilizados em `app/header-contacts.css`. Os links do Instagram na primeira seção usam o mesmo destino do cabeçalho. Instagram e WhatsApp abrem em nova aba; telefone e e-mail usam `tel:` e `mailto:`.

## Tema escuro

O tema `participation-focus` adapta o banner inicial, os cartões de ações e o cartão de prêmios com superfícies escuras, texto claro e destaques laranja. `components/campaign-brand.tsx` mantém as artes originais no tema claro e compõe a versão escura com a marca laranja existente e legendas em HTML de alto contraste, sem modificar os arquivos das logos. Essa marca também é usada no bloco desktop de participação.

## Banner principal

O cartão “CLIENTE NETBOX CONCORRE A — R$ 20 MIL REAIS EM PRÊMIOS!” pulsa suavemente no desktop e no mobile, com um ciclo de 3,2 segundos e ampliação máxima de 3,5%. O pulso é desativado com `prefers-reduced-motion`.

Os três círculos decorativos do banner em `/10-anos` flutuam suavemente no desktop e no mobile, com ritmos diferentes. A animação usa apenas `transform`, é definida em `app/10-anos/campaign-glass.css` e fica desativada quando o dispositivo solicita movimento reduzido.

## Como participar

Os círculos decorativos do fundo flutuam com deslocamento e leve variação de escala, em ritmos diferentes. Esse movimento é desativado com `prefers-reduced-motion` e acompanha a apresentação desktop/tablet, visível acima de 640 px.

O acabamento Liquid Glass desta seção está em `app/10-anos/participation-desktop.css`: cartões translúcidos com reflexos sobre um fundo com variações de cor no desktop e painéis de leitura em vidro escuro sobre as artes no mobile. O CSS concentra os tokens de vidro, contempla os temas claro e escuro, oferece fallback sem `backdrop-filter` e respeita a preferência de movimento reduzido.

Na rota `/10-anos`, a seção desktop (largura acima de 640 px) tem fundo de largura total e conteúdo centralizado na mesma largura de `.shell` (até 1240 px), com título e arte comemorativa e quatro etapas em sequência. Os elementos dos cartões ficam centralizados; ao passar o mouse, a borda se ilumina e a sombra ganha profundidade. Ao selecionar um cartão, ele aumenta de altura para mostrar a explicação dentro dele; selecionar outro fecha a explicação anterior. O primeiro cartão mostra +1 número por contrato ativo; o segundo mostra +5 indicação e +2 renovação/contrato na mesma linha, conforme as ações elegíveis; o terceiro mostra ícones de ingresso com sinais de mais. O quarto cartão tem um botão para consultar o CPF no formulário `#consulta`. As quantidades vêm de `lib/campaign.ts`. O fundo usa `public/images/como participar/plano de fundo.png`; a arte `10 anos.png` e o logo Netbox são arquivos separados, enquanto textos e ícones são elementos HTML editáveis. O carrossel original permanece no mobile, com seus textos em `lib/participation.ts`.

## Prêmios

A ilustração de notas e Pix flutua com uma leve inclinação em ciclos de 5,5 segundos. O deslocamento é menor no celular e a animação é desativada com `prefers-reduced-motion`.

Na versão mobile de `/10-anos`, a ilustração de notas e Pix aparece reduzida dentro do cartão de prêmios, abaixo do título. No desktop, a ilustração permanece ao lado do texto.

## Dúvidas frequentes

No celular (até 700 px), as perguntas de `/10-anos` aparecem em uma coluna, com cabeçalhos de toque amplos e setas que indicam a abertura. Os acordeões usam `<details>`/`<summary>` nativos, preservando a navegação por teclado. O cartão do regulamento organiza texto e botões em linhas próprias. Os estilos ficam em `app/10-anos/campaign-glass.css` e o conteúdo continua vindo de `lib/campaign.ts`.

## Integração

O formulário aceita somente CPF válido e envia por POST ao servidor. O servidor remove a pontuação, chama a API externa com timeout de 8 segundos, valida os campos e retorna total, números, origens e período. Respostas válidas sem números são exibidas como participação ainda sem números da sorte; quando a API indica que a campanha não começou, o painel informa isso ao participante. A resposta individual não é guardada em URL, localStorage ou cookie. O painel é somente uma consulta, sem liberar faturas, contratos ou perfil autenticado.

Para desenvolvimento, use uma API simulada que reproduza o contrato do prompt. Não use CPFs reais para testes. O endpoint de produção só deve ser consultado mediante ação de uma pessoa autorizada.

## Recursos pendentes

`public/images/netbox-10-anos/` contém ilustrações geradas, sem textos ou marca, para banner público, banner do participante, arte dos prêmios e banner Nossa História. A primeira seção mobile de `/10-anos` é composta em HTML/CSS e usa o logo `public/logos/LOG 1 SITE.png`; os demais banners oficiais e suas versões móveis ainda precisam ser preparados. Para publicação final, substituir as ilustrações por arquivos oficiais separados: selo tridimensional com foguete, banner público, banner do participante, arte dos prêmios e banner Nossa História.

Em `lib/campaign.ts`, confirmar e configurar links comerciais e institucionais, números de cidades/clientes, prazos de contrato quando aplicáveis e URLs do regulamento/PDF oficial. Atualmente os links comerciais pendentes não executam navegação.

Os botões comerciais disparam o evento local `netbox:commercial-click` com apenas a chave da ação. É necessário conectar esse evento a uma ferramenta de analytics aprovada; CPF/CNPJ nunca entram no evento.

O PDF fornecido é de alinhamento. Permanecem pendentes: regulamento, elegibilidade detalhada, planos/cidades/canais, critérios e datas de sorteio, apuração, pagamento, limites, cumulatividade, inadimplência, cancelamento, comunicação dos ganhadores, integração SGP, geração oficial de números, histórico detalhado, autenticação e administração. As interfaces em `lib/admin-types.ts` preparam os campos de evento, filtros e indicadores sem criar operações fictícias.
# netbox-10-anos
