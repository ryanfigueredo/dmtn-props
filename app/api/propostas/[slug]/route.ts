import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { gerarContratoPadrao } from '@/lib/contratoTemplate'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const proposta = await prisma.proposta.findUnique({
      where: { slug },
      include: {
        funcionalidades: {
          orderBy: { ordem: 'asc' },
        },
        produtos: {
          orderBy: { ordem: 'asc' },
        },
      },
    })

    if (!proposta) {
      return NextResponse.json(
        { error: 'Proposta não encontrada' },
        { status: 404 }
      )
    }

    // Transformar para o formato esperado pelo frontend
    const propostaFormatada = {
      id: proposta.id,
      slug: proposta.slug,
      cliente: {
        nome: proposta.clienteNome,
        email: proposta.clienteEmail || '',
        empresa: proposta.clienteEmpresa || '',
        telefone: proposta.clienteTelefone || '',
      },
      projeto: {
        nome: proposta.projetoNome,
        descricao: proposta.projetoDescricao,
        funcionalidades: proposta.funcionalidades.map((f) => ({
          id: f.id,
          titulo: f.titulo,
          descricao: f.descricao,
          complexidade: f.complexidade || 'Média',
          tempoEstimado: f.tempoEstimado || '',
        })),
        produtos: proposta.produtos.map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
        })),
      },
      precificacao: {
        valorBase: proposta.valorBase,
        pacoteSelecionado: {
          nome: 'Pacote Essencial',
          valor: proposta.valorFinal,
          descricao: 'Solução essencial com as funcionalidades básicas solicitadas',
          itens: [
            'Cadastro de vendedores externos com autenticação e perfil',
            'Sistema de comissionamento por produto com regras personalizadas',
            'Relatórios de vendas com status (em andamento/concluído) e ganhos futuros',
            'Cadastro de clientes com anexo de documentos',
            'Design moderno e responsivo (mobile-friendly)',
            'Hospedagem por 6 meses',
            'Documentação técnica completa',
            'Treinamento básico para equipe',
            'Suporte técnico por 90 dias',
            '1 rodada de ajustes após entrega',
          ],
          prazo: proposta.prazo,
          formaPagamento: [
            'Pagamento completo parcelado em até 12x no cartão de crédito',
            'Até 5x sem juros',
            'Acima de 5x com juros da operadora',
          ],
        },
        opcoesPlataforma: [
          {
            id: 'web',
            nome: 'Aplicação Web',
            descricao: 'Sistema web responsivo acessível de qualquer dispositivo (computador, tablet, celular)',
            valorAdicional: 0,
          },
          {
            id: 'app-lojas',
            nome: 'App nas Lojas (iOS + Android)',
            descricao: 'Aplicativo nativo para iOS e Android disponível nas lojas oficiais (App Store e Google Play)',
            valorAdicional: 12000,
          },
          {
            id: 'web-app',
            nome: 'Web + App nas Lojas',
            descricao: 'Solução completa: sistema web + aplicativo nas lojas para máxima acessibilidade',
            valorAdicional: 12000,
          },
        ],
      },
      contrato: {
        termos: proposta.contratoTermos || gerarContratoPadrao({
          objeto: proposta.contratoObjeto || proposta.projetoDescricao,
          funcionalidades: proposta.funcionalidades.map((f) => f.descricao),
          prazo: proposta.prazo,
          valorTotal: proposta.valorFinal,
          formaPagamento: {
            tipo: 'parcelado',
            parcelas: 12,
          },
          suporte: 90,
        }),
        clausulas: [
          'Desenvolvimento de aplicativo para vendedores externos venderem os produtos oferecidos',
          'Cadastro de vendedores externos',
          'Sistema de comissionamento por produto com regras personalizadas',
          'Relatórios de vendas com acompanhamento de status (em andamento/concluído) e ganhos futuros',
          'Área para cadastro de clientes com anexo de documentos',
          `Prazo de entrega: ${proposta.prazo}`,
          `Valor total: R$ ${proposta.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (podendo variar conforme plataforma escolhida)`,
          'Pagamento parcelado em até 12x no cartão de crédito',
          'Suporte técnico por 90 dias após entrega',
          'Propriedade intelectual do software será do cliente após pagamento integral',
        ],
      },
      dataCriacao: proposta.createdAt.toISOString(),
      status: proposta.status,
    }

    return NextResponse.json(propostaFormatada)
  } catch (error) {
    console.error('Erro ao buscar proposta:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar proposta' },
      { status: 500 }
    )
  }
}

