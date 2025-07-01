# Marketonic - Frontend

Este é o repositório do frontend para o projeto **Marketonic**, um dashboard moderno e responsivo para gerenciamento de produtos e categorias de supermercado. A aplicação foi construída com React e se conecta a uma API backend desenvolvida em Spring Boot.

## ✨ Funcionalidades

- **Dashboard Interativo:** Visualização rápida de estatísticas importantes, como total de produtos, itens com estoque baixo, e valor total do inventário.
- **Gerenciamento de Produtos (CRUD):**
  - Criação, leitura, atualização e exclusão de produtos.
  - Formulário moderno em um dialog (modal) para uma melhor experiência de usuário.
- **Gerenciamento de Categorias:**
  - Adição de novas categorias em tempo real.
- **Busca e Filtragem:**
  - Busque produtos dinamicamente por nome.
  - Filtre a visualização de produtos por categoria.
- **Notificações em Tempo Real:** Feedback visual para todas as operações (sucesso, erro, carregando) utilizando `react-hot-toast`.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

## 🚀 Tecnologias Utilizadas

- **[React](https://reactjs.org/)**: Biblioteca para construção da interface de usuário.
- **[Vite](https://vitejs.dev/)**: Ferramental de desenvolvimento frontend rápido e moderno.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Material-UI (MUI)](https://mui.com/)**: Biblioteca de componentes React para um design rápido e consistente.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para realizar as chamadas à API do backend.
- **[React Hot Toast](https://react-hot-toast.com/)**: Biblioteca para adicionar notificações elegantes.

## 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/) (que inclui o npm)
- [Git](https://git-scm.com/) (para clonar o repositório)

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto em seu ambiente local:

**1. Clone o repositório:**
```bash
git clone https://github.com/Gabriel-Programacoes/Marketonic-Frontend.git
```

**2. Acesse a pasta do projeto:**
```bash
cd marketonic-frontend
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Requisito Importante: Backend

Para que o frontend funcione corretamente, a **API backend do Marketonic deve estar em execução**. Certifique-se de que o projeto Spring Boot esteja rodando (geralmente na porta `9971`).

## 📁 Estrutura do Projeto

A estrutura de pastas do projeto foi organizada para facilitar a manutenção e escalabilidade:

```
src/
|-- api/                # Lógica de comunicação com a API (Axios e services)
|   |-- api.ts
|   |-- CategoriaService.ts
|   `-- ProdutoService.ts
|-- components/         # Componentes React reutilizáveis
|   |-- CategoryDialog.tsx
|   |-- ProductCard.tsx
|   |-- ProductDialog.tsx
|   |-- ProductList.tsx
|   `-- StatsCard.tsx
|-- pages/              # Componentes que representam as páginas da aplicação
|   `-- Dashboard.tsx
|-- types/              # Definições de tipos do TypeScript
|   `-- product.ts
|-- App.tsx             # Componente principal, onde o tema é aplicado
`-- main.tsx            # Ponto de entrada da aplicação React
