# Configuração do Resend para Envio de Emails

## Passo a Passo

### 1. Criar conta no Resend

1. Acesse: https://resend.com
2. Crie uma conta gratuita
3. Confirme seu email

### 2. Obter API Key

1. No dashboard do Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Dê um nome (ex: "DMTN Propostas")
4. Copie a chave gerada (começa com `re_`)

### 3. Configurar no Vercel

1. No projeto no Vercel, vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_sua_chave_aqui`
   - **Environment:** Production, Preview, Development (marque todos)
3. Clique em **Save**

### 4. Verificar Domínio (Opcional mas Recomendado)

Para usar `contato@dmtn.com.br` como remetente:

1. No Resend, vá em **Domains**
2. Clique em **Add Domain**
3. Digite: `dmtn.com.br`
4. Adicione os registros DNS que o Resend fornecer
5. Aguarde a verificação

**Nota:** Por enquanto, o sistema usa `onboarding@resend.dev` como remetente padrão (funciona sem verificação de domínio).

### 5. Atualizar Remetente (Após Verificar Domínio)

Depois de verificar o domínio, edite o arquivo `app/api/interesse/route.ts`:

```typescript
from: 'DMTN Propostas <contato@dmtn.com.br>', // Atualize aqui
```

## Teste

1. Acesse uma proposta: `https://app.dmtn.com.br/proposta/joao`
2. Preencha o formulário de interesse
3. Envie os dados
4. Verifique o email em `ryan@dmtn.com.br`

## Estrutura do Email

O email enviado contém:
- Nome do cliente
- Email do cliente (clicável)
- Telefone do cliente (clicável)
- ID da proposta
- Valor do projeto
- Data do interesse
- Botão para responder ao cliente

## Troubleshooting

### Email não está chegando?

1. Verifique se a `RESEND_API_KEY` está configurada no Vercel
2. Verifique os logs do Vercel em **Deployments** → **Functions**
3. Confirme que o email `ryan@dmtn.com.br` está correto
4. Verifique a pasta de spam

### Erro "Missing API key"

- Certifique-se de que a variável `RESEND_API_KEY` está configurada no Vercel
- Faça um novo deploy após adicionar a variável

