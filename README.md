# DMTN - Sistema de Propostas

Sistema de propostas comerciais personalizadas com assinatura digital de contratos integrada.

## 🚀 Funcionalidades

- ✅ Páginas de proposta personalizadas por cliente
- ✅ Visualização completa de funcionalidades e precificação
- ✅ Contrato editável por cliente
- ✅ Assinatura digital integrada
- ✅ Design moderno seguindo identidade visual DMTN
- ✅ Responsivo e otimizado para mobile

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🚢 Deploy no Vercel

1. Faça push do código para um repositório Git (GitHub, GitLab, etc.)
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório
4. O Vercel detectará automaticamente o Next.js e fará o deploy

### 🌐 Configuração de Domínio

**Recomendado: Usar Subdomínio**
- Configure um subdomínio como `app.dmtn.com.br` ou `propostas.dmtn.com.br`
- O site principal `dmtn.com.br` continua no Framer
- Veja o arquivo `CONFIGURACAO_DOMINIO.md` para instruções detalhadas

**Links para clientes:**
- Com subdomínio: `https://app.dmtn.com.br/proposta/cliente-joao-silva`
- O link `/proposta/cliente` funciona automaticamente no subdomínio configurado

## 📝 Como usar

### Criar uma nova proposta

1. Edite o arquivo `lib/propostas.ts`
2. Adicione uma nova proposta no objeto `propostas` com um slug único
3. Personalize os dados do cliente, projeto, precificação e contrato

Exemplo:
```typescript
'cliente-joao-silva': {
  id: 'cliente-joao-silva',
  cliente: {
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    // ...
  },
  // ...
}
```

### Acessar a proposta

Após criar a proposta, acesse:
```
https://seu-dominio.vercel.app/proposta/cliente-joao-silva
```

### Personalizar contrato

Edite o campo `contrato.termos` na proposta para personalizar o texto do contrato. Use placeholders como:
- `[NOME DO CLIENTE]` - será substituído automaticamente
- `[VALOR]` - será substituído pelo valor do pacote
- `[PRAZO]` - será substituído pelo prazo de entrega

## 🔧 Estrutura do Projeto

```
├── app/
│   ├── proposta/[slug]/  # Página dinâmica de proposta
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   ├── Header.tsx          # Cabeçalho
│   ├── PropostaDetalhes.tsx # Detalhes da proposta
│   ├── Contrato.tsx       # Componente de contrato e assinatura
│   └── AssinaturaSucesso.tsx # Tela de sucesso
├── lib/
│   └── propostas.ts       # Dados das propostas (mock)
├── types/
│   └── proposta.ts        # Tipos TypeScript
└── ...
```

## 🔌 Integração com API (Opcional)

Para salvar assinaturas em um banco de dados, você pode:

1. Criar uma API route em `app/api/assinaturas/route.ts`
2. Substituir o `localStorage` no componente `PropostaPage` por uma chamada à API
3. Configurar um banco de dados (MongoDB, PostgreSQL, etc.)

## 📄 Licença

Este projeto é propriedade da DMTN.

