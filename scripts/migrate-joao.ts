import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { gerarContratoPadrao } from '../lib/contratoTemplate'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Verificar se já existe
  const existing = await prisma.proposta.findUnique({
    where: { slug: 'joao' },
  })

  if (existing) {
    console.log('✅ Proposta do João já existe no banco')
    return
  }

  // Criar proposta do João
  const proposta = await prisma.proposta.create({
    data: {
      slug: 'joao',
      clienteNome: 'João',
      clienteEmail: '',
      clienteTelefone: '',
      clienteEmpresa: '',
      projetoNome: 'Aplicativo para Venda Externa',
      projetoDescricao:
        'Sistema completo para gestão de vendas externas, onde vendedores externos cadastram clientes interessados nos produtos oferecidos (Redução na Conta de Energia e Maquininhas de Cartão PF/PJ), acompanham o status das vendas, calculam comissões por produto, e geram relatórios de vendas com ganhos futuros e realizados. O sistema permite cadastro de clientes com anexo de documentos para facilitar o processo de venda.',
      prazo: '45-60 dias úteis',
      valorBase: 15000,
      valorFinal: 15000,
      plataformaEscolhida: 'web',
      status: 'pendente',
      contratoObjeto:
        'o desenvolvimento de uma plataforma digital para gestão de vendas externas, onde vendedores externos cadastram clientes interessados nos produtos oferecidos (Redução na Conta de Energia e Maquininhas de Cartão PF/PJ), acompanham o status das vendas, calculam comissões por produto, e geram relatórios de vendas com ganhos futuros e realizados',
      contratoTermos: gerarContratoPadrao({
        objeto:
          'o desenvolvimento de uma plataforma digital para gestão de vendas externas, onde vendedores externos cadastram clientes interessados nos produtos oferecidos (Redução na Conta de Energia e Maquininhas de Cartão PF/PJ), acompanham o status das vendas, calculam comissões por produto, e geram relatórios de vendas com ganhos futuros e realizados',
        funcionalidades: [
          'Cadastro de vendedores externos com autenticação e perfil do vendedor',
          'Sistema de comissionamento por produto com estabelecimento de regras de comissão diferentes para cada produto oferecido (Redução de Energia e Maquininhas PF/PJ) e cálculo automático ao fechar venda',
          'Relatórios de vendas com acompanhamento do status das vendas dos produtos (em andamento/concluído) e visualização de ganhos futuros (comissões de vendas em andamento)',
          'Cadastro de clientes interessados nos produtos oferecidos com upload e anexo de documentos necessários para a venda',
        ],
        tecnologias: {
          frontend: ['Next.js (App Router)', 'Tailwind CSS', 'React'],
          backend: ['Next.js API Routes', 'Node.js'],
          bancoDados: 'PostgreSQL',
          relatorios: ['Chart.js', 'PDFKit'],
          autenticacao: 'NextAuth.js',
          hospedagem: 'Vercel',
        },
        prazo: '45-60 dias úteis',
        valorTotal: 15000,
        formaPagamento: {
          tipo: 'parcelado',
          parcelas: 12,
        },
        suporte: 90,
      }),
      funcionalidades: {
        create: [
          {
            titulo: 'Cadastro de Vendedores',
            descricao:
              'Sistema de cadastro e gerenciamento de vendedores externos com autenticação, perfil do vendedor e controle de acesso.',
            complexidade: 'Média',
            tempoEstimado: '8-12 horas',
            ordem: 1,
          },
          {
            titulo: 'Estabelecer Regras de Comissionamento por Produto',
            descricao:
              'Sistema para configurar regras de comissão diferentes para cada produto oferecido (Redução de Energia e Maquininhas PF/PJ), com percentual de comissão por produto e cálculo automático ao fechar venda.',
            complexidade: 'Média-Alta',
            tempoEstimado: '12-18 horas',
            ordem: 2,
          },
          {
            titulo: 'Relatórios de Vendas com Acompanhamento de Status',
            descricao:
              'Relatórios de vendas com acompanhamento do status (em andamento/concluído) e visualização de ganhos futuros (comissões de vendas em andamento) e ganhos realizados (comissões pagas).',
            complexidade: 'Média-Alta',
            tempoEstimado: '14-20 horas',
            ordem: 3,
          },
          {
            titulo: 'Área para Cadastro de Clientes com Anexo de Documentos',
            descricao:
              'Sistema para vendedores cadastrarem clientes interessados nos produtos oferecidos, com upload e anexo de documentos necessários para a venda.',
            complexidade: 'Média',
            tempoEstimado: '10-15 horas',
            ordem: 4,
          },
        ],
      },
      produtos: {
        create: [
          {
            nome: 'Redução na Conta de Energia',
            descricao:
              'Produto oferecido: Sistema para vendedores externos cadastrarem clientes interessados em redução na conta de energia, com regras de comissão específicas e acompanhamento de vendas.',
            ordem: 1,
          },
          {
            nome: 'Maquininhas de Cartão',
            descricao:
              'Produto oferecido: Sistema para vendedores externos cadastrarem clientes interessados em maquininhas de cartão (PF ou PJ), cada uma com regras de comissão específicas.',
            ordem: 2,
          },
        ],
      },
    },
  })

  console.log('✅ Proposta do João criada com sucesso!')
  console.log('ID:', proposta.id)
  console.log('Slug:', proposta.slug)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

