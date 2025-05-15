# Gestor de Tarefas
Este projeto é um teste técnico para a vaga de Desenvolvedor Fullstack Júnior. A aplicação permite criar, listar, concluir e excluir tarefas.

## 🛠 Tecnologias Utilizadas
- **Frontend**: HTML semântico, CSS puro, JavaScript com componentização
- **Backend**: NestJS (Node.js), Prisma ORM
- **Banco de Dados**: SQLite

## ✅ Funcionalidades
- Criar uma nova tarefa com título, descrição e data de vencimento
- Listar todas as tarefas
- Marcar tarefa como concluída
- Excluir tarefa
- Interface simples e responsiva

## 🚀 Como Executar o Projeto
### 1. Clone o repositório

```bash
git clone https://github.com/vgab1/task-manager.git
cd task-manager

### 2.Configure e rode o backend
cd backend
npm install
npx prisma migrate dev --name init
npm run start:dev
O backend será iniciado em http://localhost:3000

### 3. Acesse o frontend
Abra o arquivo frontend/index.html no navegador.
Você pode usar a extensão Live Server no VSCode para facilitar.

🧪 Teste Rápido
Preencha o formulário com título, descrição e data de vencimento.

Clique em Adicionar Tarefa.

Veja a tarefa listada abaixo.

Use os botões Concluir ou Excluir conforme necessário