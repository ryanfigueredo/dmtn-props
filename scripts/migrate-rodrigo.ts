import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { gerarContratoPadrao } from '../lib/contratoTemplate'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Verificar se já existe
  const existing = await prisma.proposta.findUnique({
    where: { slug: 'rodrigo-menegazzi' },
  })

  if (existing) {
    console.log('✅ Proposta do Rodrigo já existe no banco')
    return
  }

  // Criar proposta do Rodrigo
  const proposta = await prisma.proposta.create({
    data: {
      slug: 'rodrigo-menegazzi',
      clienteNome: 'Rodrigo Menegazzi',
      clienteEmail: '',
      clienteTelefone: '',
      clienteEmpresa: '',
      projetoNome: 'Sistema de Geração Automática de Produtos para E-commerce',
      projetoDescricao:
        'Sistema completo para automatizar o cadastro de produtos de quadros decorativos em plataformas de e-commerce e ERP. O sistema recebe uma imagem em alta resolução (estampa do quadro) e gera automaticamente imagens 3D de cada variação (tipo e cor de moldura), além de criar todas as descrições, preços, tamanhos, pesos de embalagem e estruturas de SKU para cada uma das ~70 variações por produto. O sistema integra diretamente com a plataforma de e-commerce para cadastro automático dos produtos.',
      prazo: '60-90 dias úteis',
      valorBase: 35000,
      valorFinal: 35000,
      plataformaEscolhida: 'web',
      status: 'pendente',
      contratoObjeto:
        'o desenvolvimento de uma plataforma digital para automatização do cadastro de produtos de quadros decorativos em plataformas de e-commerce e ERP, incluindo geração automática de imagens 3D, descrições, variações de produtos e integração com sistemas externos',
      contratoTermos: gerarContratoPadrao({
        objeto:
          'o desenvolvimento de uma plataforma digital para automatização do cadastro de produtos de quadros decorativos em plataformas de e-commerce e ERP. O sistema recebe imagens em alta resolução (estampas de quadros) e gera automaticamente imagens 3D de cada variação (tipo e cor de moldura), além de criar descrições, preços, tamanhos, pesos de embalagem e estruturas de SKU para cada uma das variações do produto (~70 SKUs por produto). O sistema integra diretamente com a plataforma de e-commerce e ERP para cadastro automático dos produtos.',
        funcionalidades: [
          'Sistema de upload e processamento de imagens em alta resolução (estampas de quadros)',
          'Geração automática de imagens 3D para cada tipo e cor de moldura disponível',
          'Sistema de geração automática de descrições de produtos com variações',
          'Gerenciamento de variações complexas (tamanho, cor de moldura, tipo de acabamento) gerando ~70 SKUs por produto',
          'Cálculo automático de preços, tamanhos e pesos de embalagem para cada variação',
          'Geração automática de estruturas de SKU específicas para cada variação',
          'Integração com APIs de plataformas de e-commerce (Shopify, WooCommerce, ou similar)',
          'Integração com sistemas ERP para sincronização de dados',
          'Painel administrativo para gerenciar produtos, variações e configurações',
          'Sistema de templates e configurações personalizáveis para diferentes tipos de molduras e acabamentos',
        ],
        tecnologias: {
          frontend: ['Next.js (App Router)', 'Tailwind CSS', 'React', 'Three.js ou similar para visualização 3D'],
          backend: ['Next.js API Routes', 'Node.js', 'Sharp', 'Canvas API', 'Bibliotecas de renderização 3D'],
          bancoDados: 'PostgreSQL',
          integracoes: ['APIs REST', 'Webhooks', 'Integração com E-commerce e ERP'],
          hospedagem: 'Vercel',
        },
        prazo: '60-90 dias úteis',
        valorTotal: 35000,
        formaPagamento: {
          tipo: 'parcelado',
          parcelas: 12,
        },
        suporte: 90,
      }),
      funcionalidades: {
        create: [
          {
            titulo: 'Sistema de Upload e Processamento de Imagens',
            descricao:
              'Interface para upload de imagens em alta resolução (estampas de quadros) com validação de formato, tamanho e qualidade. Sistema de processamento e otimização de imagens para garantir qualidade adequada para geração das variações 3D.',
            complexidade: 'Média',
            tempoEstimado: '10-15 horas',
            ordem: 1,
          },
          {
            titulo: 'Geração Automática de Imagens 3D',
            descricao:
              'Sistema que recebe a imagem da estampa e gera automaticamente imagens 3D renderizadas para cada tipo e cor de moldura disponível. Utiliza templates de molduras pré-configurados e aplica a estampa do cliente sobre cada variação, gerando visualizações realistas dos produtos finais.',
            complexidade: 'Alta',
            tempoEstimado: '25-35 horas',
            ordem: 2,
          },
          {
            titulo: 'Gerenciamento de Variações Complexas',
            descricao:
              'Sistema para configurar e gerenciar todas as variações de produtos (tamanho, cor de moldura, tipo de acabamento) que geram aproximadamente 70 SKUs por produto. Interface intuitiva para definir combinações válidas e regras de negócio para cada variação.',
            complexidade: 'Alta',
            tempoEstimado: '20-28 horas',
            ordem: 3,
          },
          {
            titulo: 'Geração Automática de Descrições e Metadados',
            descricao:
              'Sistema que gera automaticamente descrições detalhadas do produto, incluindo informações específicas de cada variação (tamanho, cor, acabamento). Gera também metadados SEO, tags e categorias apropriadas para cada SKU.',
            complexidade: 'Média',
            tempoEstimado: '12-18 horas',
            ordem: 4,
          },
          {
            titulo: 'Cálculo Automático de Preços e Dimensões',
            descricao:
              'Sistema que calcula automaticamente preços, tamanhos e pesos de embalagem para cada variação do produto baseado em regras configuráveis. Permite definir fórmulas de cálculo personalizadas e ajustes manuais quando necessário.',
            complexidade: 'Média',
            tempoEstimado: '14-20 horas',
            ordem: 5,
          },
          {
            titulo: 'Geração de Estruturas de SKU',
            descricao:
              'Sistema que gera automaticamente a estrutura completa de SKU para cada variação do produto, incluindo códigos únicos, nomenclatura padronizada e organização hierárquica para facilitar gestão de estoque e vendas.',
            complexidade: 'Média',
            tempoEstimado: '10-15 horas',
            ordem: 6,
          },
          {
            titulo: 'Integração com Plataformas de E-commerce',
            descricao:
              'Integração com APIs de plataformas de e-commerce (Shopify, WooCommerce, Magento, ou outras) para cadastro automático de produtos, variações, imagens e metadados. Sistema de sincronização bidirecional para manter dados atualizados.',
            complexidade: 'Alta',
            tempoEstimado: '25-35 horas',
            ordem: 7,
          },
          {
            titulo: 'Integração com Sistemas ERP',
            descricao:
              'Integração com sistemas ERP para sincronização de dados de produtos, estoque, preços e informações de logística. Suporte a múltiplos formatos de integração (API REST, Webhooks, arquivos CSV/XML).',
            complexidade: 'Alta',
            tempoEstimado: '20-28 horas',
            ordem: 8,
          },
          {
            titulo: 'Painel Administrativo Completo',
            descricao:
              'Painel administrativo intuitivo para gerenciar produtos, variações, templates de molduras, configurações de integração, histórico de sincronizações e relatórios. Interface moderna e responsiva para acesso de qualquer dispositivo.',
            complexidade: 'Média-Alta',
            tempoEstimado: '18-25 horas',
            ordem: 9,
          },
          {
            titulo: 'Sistema de Templates e Configurações',
            descricao:
              'Sistema flexível de templates para diferentes tipos de molduras, cores e acabamentos. Permite criar, editar e reutilizar configurações para agilizar o processo de cadastro de novos produtos. Suporte a importação/exportação de configurações.',
            complexidade: 'Média',
            tempoEstimado: '12-18 horas',
            ordem: 10,
          },
        ],
      },
      produtos: {
        create: [
          {
            nome: 'Sistema de Automação de Cadastro',
            descricao:
              'Plataforma completa para automatizar o cadastro de produtos de quadros decorativos, reduzindo drasticamente o tempo necessário para cadastrar produtos com múltiplas variações em plataformas de e-commerce e ERP.',
            ordem: 1,
          },
          {
            nome: 'Geração de Imagens 3D',
            descricao:
              'Sistema avançado de geração automática de imagens 3D renderizadas para cada variação de moldura, proporcionando visualizações realistas dos produtos finais sem necessidade de fotografias manuais.',
            ordem: 2,
          },
          {
            nome: 'Integração E-commerce e ERP',
            descricao:
              'Integrações prontas com principais plataformas de e-commerce e sistemas ERP, garantindo sincronização automática de dados e eliminação de trabalho manual repetitivo.',
            ordem: 3,
          },
        ],
      },
    },
  })

  console.log('✅ Proposta do Rodrigo criada com sucesso!')
  console.log(`ID: ${proposta.id}`)
  console.log(`Slug: ${proposta.slug}`)
  console.log(`Link: /proposta/${proposta.slug}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar proposta:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

