# Troubleshooting Conexão Neon

## Problemas Comuns:

### 1. Banco Pausado (Free Tier)
O Neon pausa bancos gratuitos após inatividade. **Resolva:**
- Acesse: https://console.neon.tech
- Vá no seu projeto
- Clique em "Resume" ou "Wake up" para reativar

### 2. Connection String Incorreta
Use a connection string **direta** (não pooler) para migrations:

**No Neon Dashboard:**
- Vá em "Connection Details"
- Escolha **"Direct connection"** (não "Pooled connection")
- Copie a connection string

### 3. Testar Conexão Manualmente

```bash
# Testar com psql (se tiver instalado)
psql "sua-connection-string-aqui"

# Ou testar com Prisma
npx prisma db pull
```

### 4. Verificar Firewall/Network
- Certifique-se de que não há firewall bloqueando
- Tente de outra rede (ex: celular como hotspot)

### 5. Usar Connection String Direta
Para migrations, use a connection string **direta**:
```
postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**NÃO use** o pooler (`-pooler`) para migrations:
```
❌ ep-xxx-xxx-pooler.c-3.us-east-1.aws.neon.tech
✅ ep-xxx-xxx.us-east-1.aws.neon.tech
```

## Depois de Resolver:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

