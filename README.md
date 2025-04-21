# Dragons Challenge - Desafio Técnico DB Server

Uma aplicação web moderna para gerenciamento de dragões, desenvolvida com React, TypeScript, Vite e Styled Components.

---

## 📋 Funcionalidadesq

- **Autenticação**
  - Login com validação de usuário
  - Registro de novos usuários
  - Proteção de rotas

- **Gerenciamento de Dragões**
  - Listagem de dragões
  - Visualização detalhada de cada dragão
  - Criação de novos dragões com gerador interativo
  - Edição de dragões existentes
  - Exclusão de dragões
  - Ordenação alfabética da lista

- **Perfil de Usuário**
  - Visualização e gerenciamento de informações do usuário
  - Lista personalizada de dragões por usuário

---

## 🚀 Tecnologias Utilizadas

- [React 18.x](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Styled Components](https://styled-components.com/)
- [React Router Dom](https://reactrouter.com/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- LocalStorage para persistência de dados
- Arquitetura de pastas por features

---

## 💻 Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm ou yarn

---

## 🔧 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/marianarocha-dev/dragons-challenge.git

# 2. Acesse a pasta do projeto
cd dragons-challenge

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Inicie o servidor de desenvolvimento (Vite)
npm run dev
# ou
yarn dev

#para entrar na página de login, crie um usuário e senha de sua preferência

---

## 🧪 Testes
Executar os testes:

bash
Copiar
Editar
# Rodar os testes em modo observador
npm test -- --watch
# ou
yarn test --watch

Cobertura:

Test Suites: 9 passed, 9 total

Tests: 23 passed, 23 total


Tipos de Testes
Testes Unitários: Validação isolada de componentes, serviços e utilitários

Testes de Integração: Verificam fluxos completos de uso e navegação


Mocks/Stubs:

Mock do localStorage

Simulação de eventos do usuário

Stub de serviços de upload e dragões

---

## 🔎 Testes Detalhados:

🛡️ Autenticação (auth)

Login com sucesso

Mensagem para credenciais inválidas

Armazenamento correto no localStorage

Navegação entre telas de login/registro


🐉 Dragões (dragons)

Renderização e ordenação alfabética

Criação com visualização em tempo real

Edição e exclusão de dragões

Formatação de datas

Paginação e filtros


👤 Perfil (profile)

Visualização dos dados do usuário

Lista personalizada de dragões

Edição do perfil e logout


🧪 Serviços

dragonService: CRUD completo, ordenação, validações

uploadService: upload com validação de tipo, erros e integração mockada


🧼 Boas Práticas:

Uso de roles e labels acessíveis

Limpeza de estado entre testes

AAA (Arrange, Act, Assert)

Testes documentados e consistentes

---

## 🎨 Design da Interface
A interface foi desenvolvida no Figma, priorizando:

Estilo minimalista e acessível

Paleta condizente com a temática

Confira o protótipo da interface no Figma: Acesse o protótipo https://www.figma.com/design/H0hJyZU49TbyUcGjlNVDXb/teste-frontend?node-id=0-1&t=ecIhZpdDsE6uadND-1

---

## 🔐 Segurança
Autenticação e validação de credenciais

Proteção de rotas privadas

Validação de campos no frontend

---

## 👩‍💻 Desenvolvedora
Mariana Rocha do Amaral

---

## 📜 Licença
Este projeto está licenciado sob a MIT License.