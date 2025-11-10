# Curso "Cypress - do zero à Nuvem"

Este projeto de automação com Cypress foi desenvolvido durante o curso "Cypress - do zero à Nuvem", da escola Talking About Testing, ministrado pelo professor [Walmyr](https://github.com/wlsf82).

### Breve resumo do que aprendi nesse curso:
- Acessar páginas locais e remotas com `cy.visit()`
- Utilizar `beforeEach()` para comandos a serem executados antes de todos os testes
- **Localizar**, **digitar** e **clicar** em elementos
- Trabalhar com diferentes tipos de campo, como **selects**, **checkboxes** e **radio buttons**
- Realizar diferentes verificações de resultados esperados utilizando `.should()` e/ou `expect()`
- Criar **comandos customizados** no arquivo `commands.js`
- Fazer **upload de arquivos** e simular *drag-and-drop*
- Lidar com **links** que abrem em outra aba do navegador
- Diferentes formas de configurar **variáveis de ambiente**
- Simular diferentes dimensões para validar o uso por **dispositivos móveis**
- Acoplar a suite de testes em um pipeline de integração contínua com **Github Actions**, fazendo os testes serem executados sempre que houver mudança no código da aplicação ou dos testes.

## Pré-requisitos

Necessário ter instalado:

- Node.js (no projeto, foi utilizada a versão `v20.13.1`)
- npm (no projeto, foi utilizada a versão `v10.8.1`)

## Instalação de dependências

- No terminal, executar `npm install` ou `npm i` para instalar as dependências.

## Execução dos testes

### Versão interativa:
- `npm run cyopen`: Abre a Cypress App, permitindo a execução dos testes via interface gráfica com o **viewport padrão desktop (1280x880)**.
- `npm run cyopen vp=mobile`: Abre a Cypress App, permitindo a execução dos testes via interface gráfica simulando o **viewport de um dispositivo móvel** (410x860).

### Versão headless (recomendada para pipelines CI/CD):
- `npm run cytest`: Executa todas as `specs` do projeto em modo headless com o **viewport padrão desktop (1280x880)**.
- `npm run cytest vp=mobile`: Executa todas as `specs` do projeto em modo headless simulando o **viewport de um dispositivo móvel** (410x860).