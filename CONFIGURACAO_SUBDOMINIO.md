# Configuração do Subdomínio app.dmtn.com.br

## Passo a Passo

### 1. No Vercel (Dashboard do Projeto)

1. Vá em **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite: `app.dmtn.com.br`
4. Clique em **Add**
5. O Vercel vai mostrar instruções de DNS (anote o valor CNAME ou ALIAS)

### 2. No DNS do Vercel (Tela que você está vendo)

Na seção **DNS Records**, adicione um novo registro:

**Opção 1 - CNAME (Recomendado):**
- **Name:** `app`
- **Type:** `CNAME`
- **Value:** `cname.vercel-dns.com` (ou o valor que o Vercel mostrar)
- **TTL:** `60` ou `3600`
- Clique em **Add**

**Opção 2 - ALIAS (Se disponível):**
- **Name:** `app`
- **Type:** `ALIAS`
- **Value:** `cname.vercel-dns.com` (ou o valor que o Vercel mostrar)
- **TTL:** `60`
- Clique em **Add**

### 3. Aguardar Propagação

- Pode levar de alguns minutos até 24 horas
- Você pode verificar com: `dig app.dmtn.com.br` ou `nslookup app.dmtn.com.br`

### 4. Testar

Depois que propagar, acesse:
- `https://app.dmtn.com.br/proposta/joao`
- `https://app.dmtn.com.br/proposta/exemplo-cliente`

## Estrutura Final

- **dmtn.com.br** → Framer (não mexe)
- **www.dmtn.com.br** → Framer (não mexe)
- **app.dmtn.com.br** → Next.js Propostas (novo)

## Links Finais

- Proposta João: `https://app.dmtn.com.br/proposta/joao`
- Proposta Exemplo: `https://app.dmtn.com.br/proposta/exemplo-cliente`

