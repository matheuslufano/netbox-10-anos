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
- `/cliente/10-anos`: painel temporário após consulta. O resultado fica apenas na memória da aba; recarregar exige nova consulta. No banner, texto à esquerda e marca ampliada à direita ocupam a mesma linha, alinhados ao centro; no celular, ficam empilhados. No tema claro usa `LOG 3 SITE.png` e, no escuro, a imagem de marca branca, com proporção de 3:1. O fundo tem círculos decorativos animados nos dois temas, desativados com `prefers-reduced-motion`, sem a ilustração do celular.
- `/10-anos/ganhadores`: estado inicial sem ganhadores fictícios.
- `/10-anos/regulamento`: aviso de regulamento oficial pendente.
- `/admin/10-anos`: acesso bloqueado até existir autenticação e integração oficial.
- `/demo/admin/10-anos`: painel ilustrativo separado, com eventos explicitamente fictícios e filtros locais. Não executa operações.
- `POST /api/campanha/consulta`: valida CPF e consulta o endpoint configurado por GET, sem cache.

## Painel do participante

O modal “Todos os seus números da sorte” usa fundo fosco uniforme com 95% de opacidade e desfoque de 32 px, claro ou escuro conforme o tema, para destacar os bilhetes e reduzir a interferência do conteúdo atrás dele.

Cada número da sorte é exibido por `components/lucky-number-ticket.tsx` como um bilhete de rifa inspirado no modelo de papel: borda laranja, interior claro, moldura dupla, canhoto com estrelas e foguete, perfurações e textura discreta. A área clara termina na divisão do canhoto. Toda a geometria é desenhada em um único SVG proporcional, com identificadores exclusivos por bilhete para as máscaras e o filtro de papel; não há máscaras externas redimensionadas separadamente. O número continua como texto selecionável, com tamanho ajustado para sequências longas e descrição acessível. O mesmo componente atende ao cartão e ao modal “Ver todos”, em ambos os temas. Os estilos de tamanho, sombra e grade ficam em `components/lucky-number-ticket.css`; o resumo usa duas colunas.

Os três cartões de `.dashboard-top` usam sombras externas em duas camadas para se destacar do fundo, com intensidade própria para cada tema e um brilho laranja suave ao passar o mouse.

O acabamento de vidro do painel é definido em `app/cliente/10-anos/client-page.css`, com variáveis compartilhadas para degradês translúcidos, bordas, sombras e desfoque. Cartões de dados, saldo, números, ações comerciais, ajuda e modal seguem a mesma paleta nos dois temas. As variáveis ficam no `body` da rota para também alcançar o modal, que é renderizado fora do painel. Navegadores sem `backdrop-filter` recebem degradês opacos para manter a leitura.

O fundo de toda a página repete a abertura de `/10-anos`: creme `#fff4e5` no tema claro e degradê escuro com brilho laranja no tema escuro. Os três círculos usam as mesmas cores, posições e ritmos da abertura, em uma camada fixa atrás do conteúdo, renderizada por `components/client-page-background.tsx`, sem textura pontilhada. Essa camada também aparece no estado sem consulta, é oculta dos leitores de tela e não captura cliques. A grade `.dashboard-top` não tem fundo próprio e seus cartões mantêm vidro uniforme, sem degradês individuais. A composição desativa os movimentos com `prefers-reduced-motion`.

O painel `/cliente/10-anos` reúne os dados do participante, o saldo e os números da sorte em três cartões na mesma linha no desktop (acima de 980 px), empilhados em telas menores. `components/participant-card.tsx` apresenta nome, CPF mascarado, data da consulta, período da campanha e indicação de início quando fornecida pela API. A resposta atual não contém telefone, e-mail ou endereço.

## Cabeçalho e contatos

Os atalhos usam a classe `header-icon-button`, cujo estilo é compartilhado com `header-theme-toggle` em `app/globals.css`, incluindo formato circular, cores, foco, hover e tema escuro.

O cabeçalho público oferece quatro atalhos por ícone: Instagram, WhatsApp, telefone e e-mail. No desktop, ficam ao lado do botão de tema. No celular (até 640 px), aparecem dentro de `#site-navigation`, abaixo dos links do menu, com áreas de toque de 44 px; escolher um canal fecha o menu. O cabeçalho mobile mantém uma única linha de 76 px. Os destinos oficiais estão centralizados em `lib/netbox-contacts.ts`; os ícones são renderizados por `components/header-contact-links.tsx` e estilizados em `app/header-contacts.css`. Os links do Instagram na primeira seção usam o mesmo destino do cabeçalho. Instagram e WhatsApp abrem em nova aba; telefone e e-mail usam `tel:` e `mailto:`.

## Tema escuro

O tema `participation-focus` adapta o banner inicial, os cartões de ações e o cartão de prêmios com superfícies escuras, texto claro e destaques laranja. Na primeira seção, o tema claro usa `LOG 3 SITE.png` no desktop e `LOG 1 SITE.png` no mobile; o tema escuro usa `public/images/logo/netbox-10-anos-branco-56d580337904.png` nos dois formatos, preservando a proporção da arte na área disponível. Esse PNG é uma cópia exata da imagem transparente fornecida, com identificação do conteúdo no nome para evitar reutilizar a versão anterior em cache. Ao substituir a arte, atualize o nome e suas duas referências em `app/10-anos/page.tsx`. A imagem escura é definida pela propriedade opcional `darkSrc` de `components/campaign-brand.tsx`. No bloco desktop de participação, o componente mantém a arte original no tema claro e compõe a versão escura com a marca laranja existente e legendas em HTML de alto contraste. A exibição por tema é definida em `components/campaign-brand.css`, sem modificar os arquivos das logos.

## Banner principal

O estilo do halo de luz quente da primeira seção fica em `components/campaign-brand.css`, atualmente desativado por comentário no CSS.

O cartão “CLIENTE NETBOX CONCORRE A — R$ 20 MIL REAIS EM PRÊMIOS!” pulsa suavemente no desktop e no mobile, com um ciclo de 3,2 segundos e ampliação máxima de 3,5%. O pulso é desativado com `prefers-reduced-motion`.

Os três círculos decorativos do banner em `/10-anos` flutuam suavemente no desktop e no mobile, com ritmos diferentes. A animação usa apenas `transform`, é definida em `app/10-anos/campaign-glass.css` e fica desativada quando o dispositivo solicita movimento reduzido.

No tema escuro, o contêiner `.campaign-opening` compartilha o fundo do banner com a consulta e a área “Como ganhar números da sorte?”, incluindo o bloco de prêmios. Os círculos decorativos continuam nessa área com a mesma animação, durações e defasagens do banner. No tema claro, o banner mantém seu fundo creme original e a área de ações e prêmios mantém o degradê cinza-claro, creme e branco, sem os círculos adicionais. As animações respeitam `prefers-reduced-motion`.

As seções “Ganhadores” e “Dúvidas frequentes” também compartilham esse mesmo fundo no tema escuro, por meio de `.campaign-support-flow`, incluindo os três círculos da primeira seção com as mesmas posições, cores e animações. Os cartões e acordeões continuam legíveis. No tema claro, preservam seus fundos anteriores, sem essa decoração adicional.

## Como participar

No tema claro, a seção desktop/tablet mantém o fundo original em degradê creme e pêssego. No tema escuro, exibe `public/images/background/Rastros Neon Laranja no Vazio.png`, renderizado no HTML por `next/image` em `components/participation-desktop.tsx`, com preenchimento proporcional (`object-fit: cover`). Os círculos decorativos do fundo flutuam com deslocamento e leve variação de escala, em ritmos diferentes. Esse movimento é desativado com `prefers-reduced-motion` e acompanha a apresentação desktop/tablet, visível acima de 640 px.

O acabamento Liquid Glass desta seção está em `app/10-anos/participation-desktop.css`: cartões translúcidos com reflexos sobre um fundo com variações de cor no desktop e painéis de leitura em vidro escuro sobre as artes no mobile. O CSS concentra os tokens de vidro, contempla os temas claro e escuro, oferece fallback sem `backdrop-filter` e respeita a preferência de movimento reduzido.

Na rota `/10-anos`, a seção desktop/tablet (largura acima de 640 px) tem fundo de largura total e conteúdo centralizado na mesma largura de `.shell` (até 1240 px), com título, arte comemorativa e quatro etapas estáticas. Os ícones, títulos e descrições ficam alinhados ao topo dos cartões, com texto centralizado horizontalmente, sem botão de expansão ou textos adicionais de detalhes. O quarto cartão mantém o link “Consultar CPF” para o formulário `#consulta`. O componente está em `components/participation-desktop.tsx` e os estilos em `app/10-anos/participation-desktop.css`. Textos e ícones continuam editáveis em HTML. O carrossel original permanece no mobile, com seus textos em `lib/participation.ts`.

## Nossa história

O bloco “10 anos conectando o Tocantins” usa fundo em degradê azul escuro nos dois temas, com texto claro, destaques laranja, círculos e pontos discretos, sem fotografias. No tema escuro, o azul e as superfícies ficam mais profundos. O foguete decorativo usa o ícone `Rocket` em `components/shared.tsx`, com decolagem em CSS a cada 9 segundos, tamanho reduzido no celular e animação desativada com `prefers-reduced-motion`. Os estilos e as variáveis de cor ficam em `app/10-anos/campaign-glass.css`.

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
