# Configuração do Banco de Dados (Neon + Prisma)

## Passo a Passo

### 1. Criar Banco no Neon

1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a **Connection String** (DATABASE_URL)

### 2. Configurar Variáveis de Ambiente

No Vercel, adicione as seguintes variáveis:

1. **DATABASE_URL**
   - Valor: `postgresql://user:password@host/database?sslmode=require`
   - Substitua pela sua connection string do Neon
   - Marque: Production, Preview, Development

2. **JWT_SECRET**
   - Valor: Gere uma string aleatória segura (ex: `openssl rand -base64 32`)
   - Marque: Production, Preview, Development

### 3. Rodar Migrations

No terminal local (com DATABASE_URL configurada):

```bash
# Gerar Prisma Client
npm run db:generate

# Criar migrations
npm run db:migrate

# Criar usuário admin
npm run db:seed
```

### 4. Deploy no Vercel

O Vercel vai rodar automaticamente:
- `prisma generate` durante o build
- Mas você precisa rodar `prisma migrate deploy` manualmente na primeira vez

**No Vercel:**
1. Vá em **Settings** → **Build & Development Settings**
2. Adicione no **Build Command**: `prisma generate && next build`
3. Adicione no **Install Command**: `npm install`

### 5. Rodar Migrations no Vercel (Primeira Vez)

Você pode fazer isso via Vercel CLI ou adicionar um script:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Rodar migration no ambiente de produção
vercel env pull .env.production
npx prisma migrate deploy
```

Ou adicione um script no `package.json`:

```json
"postinstall": "prisma generate"
```

E crie um script de deploy que rode `prisma migrate deploy`.

## Credenciais Padrão

- **Email:** ryan@dmtn.com.br
- **Senha:** 123456@a

## Estrutura do Banco

- **users** - Usuários do sistema (admin)
- **propostas** - Propostas comerciais
- **funcionalidades** - Funcionalidades de cada proposta
- **produtos** - Produtos relacionados às propostas
- **interesses** - Interesses demonstrados pelos clientes

## Comandos Úteis

```bash
# Gerar Prisma Client
npm run db:generate

# Criar migration
npm run db:migrate

# Criar usuário admin
npm run db:seed

# Abrir Prisma Studio (visualizar dados)
npm run db:studio
```

