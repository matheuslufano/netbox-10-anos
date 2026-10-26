# Comportamentos e acabamento visual da campanha

Este documento conserva os detalhes funcionais e visuais já documentados. Os nomes históricos como `.client-hero` identificam os componentes ou seus hooks `data-ui`; as classes de estilo agora são locais aos CSS Modules. Consulte [CSS e componentes](CSS.md) para localizar cada regra.

## Rotas

- `/10-anos`: campanha e formulário de consulta.
- `/cliente/10-anos`: painel temporário após consulta. O resultado fica apenas na memória da aba; recarregar exige nova consulta. No banner, texto à esquerda e marca ampliada à direita ocupam a mesma linha, alinhados ao centro; no celular, ficam empilhados. No tema claro usa `LOG 3 SITE.png` e, no escuro, a imagem de marca branca, com proporção de 3:1. O fundo tem círculos decorativos animados nos dois temas, desativados com `prefers-reduced-motion`, sem a ilustração do celular.
- `/10-anos/ganhadores`: estado inicial sem ganhadores fictícios.
- `/10-anos/regulamento`: transcrição integral do regulamento V1, índice com âncoras e download do documento original.
- `/admin/10-anos`: acesso bloqueado até existir autenticação e integração oficial.
- `/demo/admin/10-anos`: painel ilustrativo separado, com eventos explicitamente fictícios e filtros locais. Não executa operações.
- `POST /api/campanha/consulta`: valida CPF e consulta o endpoint configurado por GET, sem cache.

## Painel do participante

O modal “Todos os seus números da sorte” usa fundo fosco uniforme com 95% de opacidade e desfoque de 32 px, claro ou escuro conforme o tema, para destacar os bilhetes e reduzir a interferência do conteúdo atrás dele.

Cada número da sorte é exibido por `src/components/dashboard/LuckyNumberTicket.tsx` como um bilhete de rifa inspirado no modelo de papel: borda laranja, interior claro, moldura dupla, canhoto com estrelas e foguete, perfurações e textura discreta. A área clara termina na divisão do canhoto. Toda a geometria é desenhada em um único SVG proporcional, com identificadores exclusivos por bilhete para as máscaras e o filtro de papel; não há máscaras externas redimensionadas separadamente. O número continua como texto selecionável, com tamanho ajustado para sequências longas e descrição acessível. O mesmo componente atende ao cartão e ao modal “Ver todos”, em ambos os temas. Os estilos de tamanho, sombra e grade ficam em `src/components/dashboard/LuckyNumberTicket.module.css`; o resumo usa duas colunas.

Os três cartões de `.dashboard-top` usam sombras externas em duas camadas para se destacar do fundo, com intensidade própria para cada tema e um brilho laranja suave ao passar o mouse.

O banner `.client-hero`, a faixa `.commercial-band.campaign-commercial` e a ajuda `.help-band` compartilham a sombra externa `--client-section-shadow` em `src/components/pages/dashboard/ClientPage.module.css e seus componentes`, com duas camadas de sombra reforçadas nos temas claro e escuro, no desktop e no celular. O tema escuro também usa um contorno laranja discreto para destacar os blocos do fundo.

O acabamento de vidro do painel é definido em `src/components/pages/dashboard/ClientPage.module.css e seus componentes`, com variáveis compartilhadas para degradês translúcidos, bordas, sombras e desfoque. Cartões de dados, saldo, números, ações comerciais, ajuda e modal seguem a mesma paleta nos dois temas. As variáveis ficam no `body` da rota para também alcançar o modal, que é renderizado fora do painel. Navegadores sem `backdrop-filter` recebem degradês opacos para manter a leitura.

O fundo de toda a página repete a abertura de `/10-anos`: creme `#fff4e5` no tema claro e degradê escuro com brilho laranja no tema escuro. Os três círculos usam as mesmas cores, posições e ritmos da abertura, em uma camada fixa atrás do conteúdo, renderizada por `src/components/dashboard/ClientPageBackground.tsx`, sem textura pontilhada. Essa camada também aparece no estado sem consulta, é oculta dos leitores de tela e não captura cliques. A grade `.dashboard-top` não tem fundo próprio e seus cartões mantêm vidro uniforme, sem degradês individuais. A composição desativa os movimentos com `prefers-reduced-motion`.

O painel `/cliente/10-anos` reúne os dados do participante, o saldo e os números da sorte em três cartões na mesma linha no desktop (acima de 980 px), empilhados em telas menores. `src/components/dashboard/ParticipantCard.tsx` apresenta nome, CPF mascarado, data da consulta, período da campanha e indicação de início quando fornecida pela API. A resposta atual não contém telefone, e-mail ou endereço.

## Cabeçalho e contatos

Os atalhos usam a classe `header-icon-button`, cujo estilo é compartilhado com `header-theme-toggle` nos CSS Modules de cabeçalho e contatos, incluindo formato circular, cores, foco, hover e tema escuro.

O cabeçalho público oferece quatro atalhos por ícone: Instagram, WhatsApp, telefone e e-mail. No desktop, ficam ao lado do botão de tema. No celular (até 640 px), aparecem dentro de `#site-navigation`, abaixo dos links do menu, com áreas de toque de 44 px; escolher um canal fecha o menu. O cabeçalho mobile mantém uma única linha de 76 px. Os destinos oficiais estão centralizados em `src/utils/contacts/netboxContacts.ts`; os ícones são renderizados por `src/components/contacts/HeaderContactLinks.tsx` e estilizados em `src/components/contacts/HeaderContactLinks.module.css`. Os links do Instagram na primeira seção usam o mesmo destino do cabeçalho. Instagram e WhatsApp abrem em nova aba; telefone e e-mail usam `tel:` e `mailto:`.

O item “Contato” do rodapé expande, em uma segunda linha centralizada, os ícones dos mesmos quatro canais oficiais. Os rótulos continuam disponíveis para tecnologias assistivas e como dicas dos botões. O link “Política de Privacidade” abre `/politica-de-privacidade`, com o aviso específico sobre o tratamento do CPF durante a consulta da campanha.

## Tema escuro

O tema `body[data-theme="dark"]` adapta o banner inicial, os cartões de ações e o cartão de prêmios com superfícies escuras, texto claro e destaques laranja. Na primeira seção, o tema claro usa `LOG 3 SITE.png` no desktop e `LOG 1 SITE.png` no mobile; o tema escuro usa `public/images/logo/netbox-10-anos-branco-56d580337904.png` nos dois formatos, preservando a proporção da arte na área disponível. Esse PNG é uma cópia exata da imagem transparente fornecida, com identificação do conteúdo no nome para evitar reutilizar a versão anterior em cache. Ao substituir a arte, atualize o nome e suas duas referências em `src/components/campaign/CampaignHero.tsx`. A imagem escura é definida pela propriedade opcional `darkSrc` de `src/components/campaign/CampaignBrand.tsx`. No bloco desktop de participação, o componente mantém a arte original no tema claro e compõe a versão escura com a marca laranja existente e legendas em HTML de alto contraste. A exibição por tema é definida em `src/components/campaign/CampaignBrand.module.css`, sem modificar os arquivos das logos.

## Banner principal

As variantes da marca (tema claro/escuro e desktop/mobile) usam carregamento nativo `lazy` em `src/components/campaign/CampaignBrand.tsx`, evitando pré-carregar artes ocultas. O elemento `<html>` declara `data-scroll-behavior="smooth"` para o Next.js controlar a rolagem nas transições de rota.

### Alertas no navegador durante o desenvolvimento

`[HMR] connected` é uma mensagem normal da atualização automática. Se o alerta de hidratação mostrar `data-rm-theme`, `hentry` ou `lang="en"`, teste em um perfil sem extensões: esses atributos não são emitidos pelo projeto. Os scripts `spoken-word.js` e `content-script.js` do relato também não pertencem à aplicação; se forem de uma extensão de leitura, desative seu acesso ao localhost para investigar o aviso de `unload`. Não use `suppressHydrationWarning` para esconder essas diferenças.

O halo de luz quente da primeira seção permanece desativado; não há regra ativa para esse efeito em `src/components/campaign/CampaignBrand.module.css`.

O cartão “CLIENTE NETBOX CONCORRE A — R$ 20 MIL REAIS EM PRÊMIOS!” pulsa suavemente no desktop e no mobile, com um ciclo de 3,2 segundos e ampliação máxima de 3,5%. O pulso é desativado com `prefers-reduced-motion`.

Os três círculos decorativos do banner em `/10-anos` flutuam suavemente no desktop e no mobile, com ritmos diferentes. A animação usa apenas `transform`, é definida em `os CSS Modules em src/components/campaign/` e fica desativada quando o dispositivo solicita movimento reduzido.

No tema escuro, o contêiner `.campaign-opening` compartilha o fundo do banner com a consulta e a área “Como ganhar números da sorte?”, incluindo o bloco de prêmios. Os círculos decorativos continuam nessa área com a mesma animação, durações e defasagens do banner. No tema claro, o banner mantém seu fundo creme original e a área de ações e prêmios mantém o degradê cinza-claro, creme e branco, sem os círculos adicionais. As animações respeitam `prefers-reduced-motion`.

As seções “Ganhadores” e “Dúvidas frequentes” também compartilham esse mesmo fundo no tema escuro, por meio de `.campaign-support-flow`, incluindo os três círculos da primeira seção com as mesmas posições, cores e animações. Os cartões e acordeões continuam legíveis. No tema claro, preservam seus fundos anteriores, sem essa decoração adicional.

## Como participar

No tema claro, a seção desktop/tablet mantém o fundo original em degradê creme e pêssego. No tema escuro, exibe `public/images/background/Rastros Neon Laranja no Vazio.png`, renderizado no HTML por `next/image` em `src/components/campaign/ParticipationDesktop.tsx`, com preenchimento proporcional (`object-fit: cover`). Os círculos decorativos do fundo flutuam com deslocamento e leve variação de escala, em ritmos diferentes. Esse movimento é desativado com `prefers-reduced-motion` e acompanha a apresentação desktop/tablet, visível acima de 640 px.

O acabamento Liquid Glass desta seção está em `src/components/campaign/ParticipationDesktop.module.css`: cartões translúcidos com reflexos sobre um fundo com variações de cor no desktop e painéis de leitura em vidro escuro sobre as artes no mobile. O CSS concentra os tokens de vidro, contempla os temas claro e escuro, oferece fallback sem `backdrop-filter` e respeita a preferência de movimento reduzido.

Na rota `/10-anos`, a seção desktop/tablet (largura acima de 640 px) tem fundo de largura total e conteúdo centralizado na mesma largura de `.shell` (até 1240 px), com título, arte comemorativa e quatro etapas estáticas. Os ícones, títulos e descrições ficam alinhados ao topo dos cartões, com texto centralizado horizontalmente, sem botão de expansão ou textos adicionais de detalhes. O quarto cartão mantém o link “Consultar CPF” para o formulário `#consulta`. O componente está em `src/components/campaign/ParticipationDesktop.tsx` e os estilos em `src/components/campaign/ParticipationDesktop.module.css`. Textos e ícones continuam editáveis em HTML. O carrossel original permanece no mobile, com seus textos em `src/utils/campaign/participation.ts`.

## Nossa história

O bloco “10 anos conectando o Tocantins” usa fundo em degradê azul escuro nos dois temas, com texto claro, destaques laranja, círculos e pontos discretos, sem fotografias. No tema escuro, o azul e as superfícies ficam mais profundos. O foguete decorativo usa o ícone `Rocket` em `os componentes de src/components/campaign/`, com decolagem em CSS a cada 9 segundos, tamanho reduzido no celular e animação desativada com `prefers-reduced-motion`. Os estilos e as variáveis de cor ficam em `os CSS Modules em src/components/campaign/`.

## Prêmios

A ilustração de notas e Pix flutua com uma leve inclinação em ciclos de 5,5 segundos. O deslocamento é menor no celular e a animação é desativada com `prefers-reduced-motion`.

Na versão mobile de `/10-anos`, a ilustração de notas e Pix aparece reduzida dentro do cartão de prêmios, abaixo do título. No desktop, a ilustração permanece ao lado do texto.

## Dúvidas frequentes

No celular (até 700 px), as perguntas de `/10-anos` aparecem em uma coluna, com cabeçalhos de toque amplos e setas que indicam a abertura. Os acordeões usam `<details>`/`<summary>` nativos, preservando a navegação por teclado. O cartão do regulamento organiza texto e botões em linhas próprias. Os estilos ficam em `os CSS Modules em src/components/campaign/` e o conteúdo continua vindo de `src/utils/campaign/campaign.ts`.

## Integração

O formulário aceita somente CPF válido e envia por POST ao servidor. O servidor remove a pontuação, chama a API externa com timeout de 8 segundos, valida os campos e retorna total, números, origens e período. Respostas válidas sem números são exibidas como participação ainda sem números da sorte; quando a API indica que a campanha não começou, o painel informa isso ao participante. A resposta individual não é guardada em URL, localStorage ou cookie. O painel é somente uma consulta, sem liberar faturas, contratos ou perfil autenticado.

Para desenvolvimento, use uma API simulada que reproduza o contrato do prompt. Não use CPFs reais para testes. O endpoint de produção só deve ser consultado mediante ação de uma pessoa autorizada.

## CAPTCHA da consulta

`ConsultForm.tsx` restaura o aviso de privacidade e abre `ConsultCaptchaModal.tsx` ao completar um CPF válido. O modal fica centralizado na tela por CSS Grid, sem depender da posição da seção de consulta, é renderizado em portal para evitar o recorte do cartão de vidro e respeita os limites da tela. O visual usa ícone de escudo, destaque laranja, título e descrição associados ao diálogo, superfície própria para o widget e aviso de fechamento automático. Possui variantes clara/escura, margens para celular e animação curta desativada com movimento reduzido. O iframe oficial permanece intacto. Inclui fechamento por botão, clique no fundo e Escape, foco inicial e retorno ao controle anterior. O iframe do Google mantém sua própria navegação por teclado. Após a verificação, o modal fecha e a consulta começa automaticamente com o token recebido, sem exigir outro clique. Durante a requisição, o formulário informa Consultando sua participação e bloqueia envios duplicados. Em caso de sucesso, o resultado é salvo no contexto e a navegação segue para `/cliente/10-anos`; em caso de falha, a mensagem fica no formulário e a próxima tentativa exige novo CAPTCHA. Fechar pelo botão, Escape ou fundo cancela a verificação sem iniciar uma consulta. Ao cancelar, o botão Consultar reabre o modal sem consultar a API. A abertura também é verificada ao sair do campo, incluindo preenchimento automático. Quando há CPF válido e a verificação foi fechada sem token, o formulário oferece o botão Abrir CAPTCHA. O modal é montado ao abrir; após a aprovação, o widget permanece montado oculto por `data-state="closed"` para preservar o callback de expiração; alterar o CPF ou terminar uma consulta descarta o token. O componente carrega o script oficial do reCAPTCHA v2 somente após o CPF válido, em português e tamanho compacto. O Google decide quando apresentar a seleção de imagens e oferece sua alternativa acessível. O servidor continua exigindo um token válido antes da consulta.

O POST interno recebe `{ cpf, captchaToken }`. `src/services/campaign/captchaVerification.ts` envia apenas o token e a chave secreta ao `siteverify` oficial, por POST sem cache e com timeout de 8 segundos. A API externa da campanha só é chamada após `success: true`. Ausência/rejeição do token retorna HTTP 400 (`captcha_required`/`captcha_invalid`); falha de configuração ou comunicação retorna HTTP 503 (`captcha_unavailable`). O contrato da API externa permanece igual. Não há persistência nem registro de CPF ou token nesta integração.

Configure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` e `RECAPTCHA_SECRET_KEY` conforme o README; não há modo de bypass nem chaves de teste embutidas. Sem configuração, o formulário informa indisponibilidade e bloqueia consultas. Mantenha a validação dos domínios habilitada no console do Google. Ao alterar a chave pública, gere novo build. A verificação visual real depende dessas chaves e de acesso ao Google. Referências: [widget v2](https://developers.google.com/recaptcha/docs/display) e [validação no servidor](https://developers.google.com/recaptcha/docs/verify).

## Recursos pendentes

`public/images/netbox-10-anos/` contém ilustrações geradas, sem textos ou marca, para banner público, banner do participante, arte dos prêmios e banner Nossa História. A primeira seção mobile de `/10-anos` é composta em HTML/CSS e usa o logo `public/logos/LOG 1 SITE.png`; os demais banners oficiais e suas versões móveis ainda precisam ser preparados. Para publicação final, substituir as ilustrações por arquivos oficiais separados: selo tridimensional com foguete, banner público, banner do participante, arte dos prêmios e banner Nossa História.

Em `src/utils/campaign/campaign.ts`, confirmar e configurar links comerciais e institucionais, números de cidades/clientes, prazos de contrato quando aplicáveis. Atualmente os links comerciais pendentes não executam navegação.

Os botões comerciais disparam o evento local `netbox:commercial-click` com apenas a chave da ação. É necessário conectar esse evento a uma ferramenta de analytics aprovada; CPF/CNPJ nunca entram no evento.

O regulamento V1 fornecido está publicado com todas as suas 12 seções. A publicação do texto não implementa automaticamente suas regras no sistema. Permanecem pendentes a integração SGP, geração oficial de números, execução dos sorteios, pagamentos, histórico detalhado, autenticação e administração. As interfaces em `src/utils/admin/adminTypes.ts` preparam os campos de evento, filtros e indicadores sem criar operações fictícias.

## Manutenção do regulamento

O PDF original fica em `public/documents/regulamento-netbox-10-anos-v1.pdf`; a transcrição em `src/utils/campaign/regulation.ts` preserva a redação e a numeração, normalizando apenas espaços e quebras de linha. A página Server Component e seus estilos ficam em `src/components/pages/campaign/RegulationPage.tsx` e `RegulationPage.module.css`. Não há serviço externo, consulta de CPF ou autenticação nesta página.

Os endereços da página e do PDF estão centralizados em `campaign.legal`, em `src/utils/campaign/campaign.ts`, e também alimentam os links do FAQ. Para uma nova versão, adicione o PDF em `public/documents/`, atualize a transcrição e o endereço centralizado e confira todas as cláusulas contra o documento. O download usa um link nativo com `download` e o índice usa âncoras HTML, sem JavaScript adicional.
