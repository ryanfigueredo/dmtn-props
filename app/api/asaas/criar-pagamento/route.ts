import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route para criar pagamento parcelado no Asaas
 * O Asaas recebe o valor total e cria parcelas, mas você recebe o valor total à vista
 */

interface CriarPagamentoRequest {
  valorTotal: number
  parcelas: number
  dadosCliente: {
    nome: string
    cpf: string
    email: string
    telefone: string
  }
  propostaId: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CriarPagamentoRequest = await request.json()

    // Validar dados
    if (!body.valorTotal || !body.parcelas || !body.dadosCliente) {
      return NextResponse.json(
        { success: false, message: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Aqui você vai integrar com a API do Asaas
    // Documentação: https://asaasv3.docs.apiary.io/
    
    // Exemplo de integração (você precisa configurar suas credenciais):
    /*
    const asaasApiKey = process.env.ASAAS_API_KEY
    const asaasUrl = process.env.ASAAS_URL || 'https://www.asaas.com/api/v3'

    // Criar cliente no Asaas
    const clienteResponse = await fetch(`${asaasUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': asaasApiKey,
      },
      body: JSON.stringify({
        name: body.dadosCliente.nome,
        cpfCnpj: body.dadosCliente.cpf,
        email: body.dadosCliente.email,
        phone: body.dadosCliente.telefone,
      }),
    })

    const cliente = await clienteResponse.json()

    // Criar pagamento parcelado
    // IMPORTANTE: Para receber o valor total à vista mesmo com parcelamento,
    // você pode usar a função de "Antecipação" do Asaas ou configurar
    // para receber tudo de uma vez e criar parcelas apenas para o cliente
    
    const pagamentoResponse = await fetch(`${asaasUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': asaasApiKey,
      },
      body: JSON.stringify({
        customer: cliente.id,
        billingType: 'CREDIT_CARD', // Cartão de crédito
        value: body.valorTotal,
        installments: body.parcelas,
        installmentValue: body.valorTotal / body.parcelas,
        description: `Proposta ${body.propostaId}`,
        // Para receber à vista, você pode usar a opção de antecipação
        // ou criar um pagamento único e depois criar parcelas separadas
      }),
    })

    const pagamento = await pagamentoResponse.json()
    */

    // Por enquanto, retornamos um mock
    // Quando configurar o Asaas, descomente o código acima
    
    return NextResponse.json({
      success: true,
      message: 'Pagamento criado com sucesso',
      data: {
        paymentId: 'mock_payment_id',
        installments: body.parcelas,
        totalValue: body.valorTotal,
        // O Asaas retornará o link de pagamento ou dados do cartão
        paymentLink: '#', // Link para o cliente fazer o pagamento
      },
    })
  } catch (error) {
    console.error('Erro ao criar pagamento no Asaas:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar pagamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}

/**
 * NOTAS IMPORTANTES SOBRE ASAAS:
 * 
 * 1. Para receber o valor total à vista mesmo com parcelamento:
 *    - Use a função de "Antecipação" do Asaas
 *    - Ou configure para receber tudo de uma vez e criar parcelas apenas para o cliente
 * 
 * 2. Taxas de juros:
 *    - Até 5x: sem juros (você absorve ou não cobra)
 *    - Acima de 5x: juros da operadora (2.99% a.m. em média)
 * 
 * 3. Configuração necessária:
 *    - Adicione no .env: ASAAS_API_KEY=seu_token_aqui
 *    - Adicione no .env: ASAAS_URL=https://www.asaas.com/api/v3 (ou sandbox)
 * 
 * 4. Sandbox para testes:
 *    - Use https://sandbox.asaas.com/api/v3 para testes
 */

