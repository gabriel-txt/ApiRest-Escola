# 🚀 API REST – Sistema de Gerenciamento (Node.js + Express + Sequelize)

Bem-vindo à API REST!  
Este projeto oferece um conjunto de endpoints para **gerenciar usuários e alunos**, com autenticação via **JWT**, suporte a **upload de imagens** e integração com banco de dados **MySQL** via **Sequelize**.

---

## 🧩 Tecnologias utilizadas
- **Node.js**
- **Express**
- **Sequelize (ORM)**
- **MySQL**
- **JWT (Json Web Token)**
- **Multer** (upload de imagens)
- **bcryptjs** (hash de senhas)
- **dotenv**

---

## ⚙️ Configuração do projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/nome-do-repo.git
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`**
   Crie um arquivo `.env` na raiz do projeto com as variáveis:
   ```env
   APP_URL=http://localhost:3000
   TOKEN_SECRET=sua_chave_jwt_aqui
   TOKEN_EXPIRATION=7d
   DATABASE=nome_do_banco
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=root
   DATABASE_PASSWORD=senha
   ```

4. **Configure o banco de dados**
   Execute as migrations e seeds:
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   ```
   O servidor iniciará em:  
   👉 `http://localhost:3000` -> APP_URL

---

## 🔐 Autenticação
A API usa **JWT (Json Web Token)** para autenticação.

1. Faça login com as credenciais do usuário.
2. Receba o token JWT.
3. Envie o token no cabeçalho `Authorization` das rotas protegidas:

```
Authorization: Bearer seu_token_aqui
```

---

## 📚 Endpoints principais

### 👤 Usuários
| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `POST` | `/users` | Cria um novo usuário | ❌ |
| `GET` | `/users` | Lista todos os usuários | ✅ |
| `GET` | `/users/:id` | Retorna um usuário específico | ✅ |
| `PUT` | `/users/:id` | Atualiza dados do usuário | ✅ |
| `DELETE` | `/users/:id` | Remove um usuário | ✅ |

---

### 🔑 Tokens
| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `POST` | `/tokens` | Gera token de acesso (login) | ❌ |

**Exemplo de requisição:**
```json
POST /tokens
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

### 🧑‍🎓 Alunos
| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `GET` | `/alunos` | Lista todos os alunos | ✅ |
| `GET` | `/alunos/:id` | Mostra um aluno específico | ✅ |
| `POST` | `/alunos` | Cadastra novo aluno | ✅ |
| `PUT` | `/alunos/:id` | Atualiza dados do aluno | ✅ |
| `DELETE` | `/alunos/:id` | Remove um aluno | ✅ |

---

### 🖼️ Upload de imagens
| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `POST` | `/images` | Faz upload de imagem de aluno | ✅ |

**Exemplo:**
Envie a imagem via `multipart/form-data` no campo `image`.

---

## 🗄️ Estrutura de pastas

```
API_REST/
│
├── src/
│   ├── config/           → Configurações do projeto
│   ├── controllers/      → Controladores (lógica das rotas)
│   ├── database/
│   │   ├── migrations/   → Estrutura das tabelas
│   │   ├── seeds/        → Dados iniciais
│   │   └── db.js         → Conexão com banco
│   ├── middlewares/      → Autenticação e tratamento de erros
│   ├── models/           → Modelos Sequelize
│   └── routes/           → Rotas da API
│
├── uploads/images/       → Pasta de upload de imagens
├── .env.example          → Exemplo de variáveis de ambiente
├── package.json
└── server.js
```

---

## 📄 Licença
Este projeto é de código aberto — sinta-se livre para usar e modificar conforme necessário.

---

Feito com ❤️ por Gabriel Póvoa
