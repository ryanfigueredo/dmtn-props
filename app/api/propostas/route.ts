import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const propostas = await prisma.proposta.findMany({
      include: {
        _count: {
          select: {
            interesses: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(propostas)
  } catch (error) {
    console.error('Erro ao buscar propostas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar propostas' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const proposta = await prisma.proposta.create({
      data: {
        slug: data.slug,
        clienteNome: data.clienteNome,
        clienteEmail: data.clienteEmail,
        clienteTelefone: data.clienteTelefone,
        clienteEmpresa: data.clienteEmpresa,
        projetoNome: data.projetoNome,
        projetoDescricao: data.projetoDescricao,
        prazo: data.prazo,
        valorBase: parseFloat(data.valorBase),
        valorFinal: parseFloat(data.valorFinal),
        plataformaEscolhida: data.plataformaEscolhida,
        status: data.status || 'pendente',
        contratoObjeto: data.contratoObjeto,
        contratoTermos: data.contratoTermos,
        funcionalidades: {
          create: data.funcionalidades || [],
        },
        produtos: {
          create: data.produtos || [],
        },
      },
      include: {
        funcionalidades: true,
        produtos: true,
      },
    })

    return NextResponse.json(proposta)
  } catch (error) {
    console.error('Erro ao criar proposta:', error)
    return NextResponse.json(
      { error: 'Erro ao criar proposta' },
      { status: 500 }
    )
  }
}

