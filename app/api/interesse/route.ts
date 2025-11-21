import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { DadosInteresse } from '@/components/InteresseProposta'

// Inicializar Resend apenas se a API key estiver disponível
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const dados: DadosInteresse = await request.json()

    // Validação básica
    if (!dados.nome || !dados.email || !dados.telefone) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Verificar se a API key está configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada')
      // Continua mesmo sem email, mas loga o erro
    }

    // Formatar valor
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(dados.valorProjeto)

    // Formatar data
    const dataFormatada = new Date(dados.dataInteresse).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // Template HTML do email
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Novo Interesse na Proposta</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4A4A8A 0%, #5E5BB5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎯 Novo Interesse na Proposta</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Olá Ryan,</p>
            <p style="font-size: 16px; margin-bottom: 30px;">Um novo cliente demonstrou interesse em uma proposta comercial.</p>
            
            <div style="background: #f8f9fa; border-left: 4px solid #5E5BB5; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h2 style="color: #5E5BB5; margin-top: 0; font-size: 20px;">📋 Dados do Cliente</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nome:</td>
                  <td style="padding: 8px 0;">${dados.nome}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${dados.email}" style="color: #5E5BB5; text-decoration: none;">${dados.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Telefone:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${dados.telefone}" style="color: #5E5BB5; text-decoration: none;">${dados.telefone}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f8f9fa; border-left: 4px solid #5E5BB5; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h2 style="color: #5E5BB5; margin-top: 0; font-size: 20px;">💼 Detalhes da Proposta</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Proposta ID:</td>
                  <td style="padding: 8px 0;"><strong>${dados.propostaId}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Valor do Projeto:</td>
                  <td style="padding: 8px 0; font-size: 18px; color: #5E5BB5; font-weight: bold;">${valorFormatado}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Data do Interesse:</td>
                  <td style="padding: 8px 0;">${dataFormatada}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                <strong>Próximos passos:</strong>
              </p>
              <ul style="font-size: 14px; color: #666; padding-left: 20px;">
                <li>Entre em contato com o cliente pelo telefone ou email informado</li>
                <li>Envie o contrato completo para análise</li>
                <li>Finalize a negociação e assinatura</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${dados.email}" style="background: #5E5BB5; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Responder ao Cliente
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>Este email foi gerado automaticamente pelo sistema de propostas DMTN.</p>
            <p>© ${new Date().getFullYear()} DMTN - Todos os direitos reservados.</p>
          </div>
        </body>
      </html>
    `

    // Enviar email usando Resend
    if (resend && process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'DMTN Propostas <onboarding@resend.dev>', // Você precisa verificar o domínio no Resend
          to: 'ryan@dmtn.com.br',
          subject: `🎯 Novo Interesse na Proposta: ${dados.propostaId}`,
          html: emailHTML,
        })

        if (error) {
          console.error('Erro ao enviar email:', error)
          // Continua mesmo se o email falhar
        } else {
          console.log('Email enviado com sucesso:', data)
        }
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError)
        // Continua mesmo se o email falhar
      }
    } else {
      console.warn('RESEND_API_KEY não configurada - email não será enviado')
    }

    // Log para debug
    console.log('Novo interesse recebido:', {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      propostaId: dados.propostaId,
      valorProjeto: dados.valorProjeto,
      dataInteresse: dados.dataInteresse,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Interesse registrado com sucesso',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar interesse:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}

