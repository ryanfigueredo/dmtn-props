import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Aqui você pode salvar a assinatura em um banco de dados
    // Exemplo com MongoDB, PostgreSQL, etc.
    
    // Por enquanto, apenas retornamos sucesso
    // Você pode implementar a lógica de salvamento aqui
    
    console.log('Assinatura recebida:', body)
    
    return NextResponse.json(
      {
        success: true,
        message: 'Assinatura salva com sucesso',
        data: {
          propostaId: body.propostaId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao salvar assinatura:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar assinatura',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const propostaId = searchParams.get('propostaId')
  
  if (!propostaId) {
    return NextResponse.json(
      { success: false, message: 'ID da proposta é obrigatório' },
      { status: 400 }
    )
  }
  
  // Aqui você pode buscar a assinatura do banco de dados
  // Por enquanto, retornamos um exemplo
  
  return NextResponse.json({
    success: true,
    data: {
      propostaId,
      assinado: false, // Buscar do banco de dados
    },
  })
}

