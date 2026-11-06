# Chá de bebê da Júlia

Código original do projeto, com as 13 imagens, estilos, interações, calendário e configurações. Exportado em 6 de novembro de 2026. Inclui um servidor local e configurações para facilitar a edição no VS Code.

## Abrir e executar

1. Extraia todo o ZIP para uma pasta no computador.
2. No VS Code, escolha **Arquivo → Abrir Pasta** e selecione a pasta `cha-de-bebe-julia` (a que contém este README e o `package.json`).
3. Com o Node.js instalado, abra **Terminal → Novo Terminal** e execute:

```sh
npm start
```

4. Abra **http://127.0.0.1:3000** no navegador. Após editar e salvar os arquivos, atualize a página.
5. Para encerrar o servidor, pressione **Ctrl+C** no terminal.

O site já inclui o CSS compilado: **não é necessário instalar dependências para visualizar ou editar HTML, JavaScript e CSS próprio**. No VS Code, você também pode apertar **F5** e selecionar **Abrir Chá da Júlia**.

Alternativa: com a extensão Live Server instalada no VS Code, abra `dist/index.html` e escolha **Open with Live Server**.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `dist/index.html` | Textos, seções, endereço, links e estrutura da página |
| `dist/estilo.css` | Cores, detalhes visuais, animações e ajustes de layout |
| `dist/convite.js` | Menu, contagem de dias, galeria e código do botão de copiar Pix |
| `dist/pix-qr.png` | Imagem do QR Code Pix |
| `dist/fotos/` | As 13 imagens originais em WebP |
| `dist/encontro.ics` | Evento para adicionar ao calendário |
| `dist/favicon.svg` | Ícone da aba do navegador |
| `tailwind.config.cjs` | Paleta, fontes e configuração das classes Tailwind |
| `build-css.cjs` | Geração do arquivo `dist/tailwind.css` |
| `scripts/serve.cjs` | Servidor para desenvolvimento local |
| `netlify.toml` | Publicação da pasta `dist/` na Netlify |
| `.openai/hosting.json` | Configuração original da hospedagem Sites |

## Alterar as classes do Tailwind

Se adicionar classes Tailwind que ainda não aparecem no projeto ou alterar a configuração do Tailwind, instale as dependências e gere o CSS novamente:

```sh
npm install
npm run build
```

O projeto original utiliza pnpm e inclui `pnpm-lock.yaml`. Se preferir manter esse gerenciador, use `pnpm install --frozen-lockfile` e `pnpm run build`.

Para alterações visuais próprias, prefira `dist/estilo.css`. O arquivo `dist/tailwind.css` é gerado e suas edições manuais podem ser sobrescritas pelo build.

## Observações

- HTML, CSS, JavaScript, fotos, ícones e calendário estão incluídos no pacote. As fontes do Google e o mapa incorporado utilizam internet; sem conexão, o navegador usa fontes alternativas e o mapa pode não carregar.
- O site é estático: não depende de banco de dados ou servidor de aplicação. Os recursos interativos rodam no navegador.
- Ao mudar a data ou o endereço, atualize também `dist/encontro.ics`, a contagem em `dist/convite.js` e os links do mapa em `dist/index.html`.
- As edições locais só chegam ao site publicado depois de um commit e push para a branch `main` no GitHub.
- A pasta não inclui credenciais ou `node_modules`. Os arquivos de configuração e dependências necessários estão incluídos.

## Publicação

- GitHub: https://github.com/JuniorBrugnaro/baby-julia
- Site: https://cha-de-bebe-julia-2026.netlify.app/

A Netlify está conectada à branch `main` e publica `dist/` conforme `netlify.toml`. Após enviar uma alteração ao GitHub, acompanhe o novo deploy no painel da Netlify.

## Origem

Site: https://cha-da-julia-dezembro.gvquadros-ind.chatgpt.site

Revisão original exportada: `1288784e1e5cb6e5571ccf1d3459bcbd125307ed`.
