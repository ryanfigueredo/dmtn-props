# Configuração Prisma 7 com Neon

O Prisma 7 mudou a forma de configurar. Você tem 2 opções:

## Opção 1: Usar Prisma Accelerate (Recomendado)

1. Acesse: https://prisma.io/accelerate
2. Crie uma conta e conecte seu banco Neon
3. Obtenha a URL do Accelerate
4. No `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
})
```

## Opção 2: Downgrade para Prisma 6 (Mais Simples)

```bash
npm install prisma@6 @prisma/client@6 --save
```

E use a configuração normal com DATABASE_URL no schema.prisma.

## Opção 3: Usar Adapter PostgreSQL (Atual)

Precisa instalar o adapter correto. O Prisma 7 ainda está em desenvolvimento.

**Recomendação:** Use Prisma 6 por enquanto até o Prisma 7 estar mais estável.

