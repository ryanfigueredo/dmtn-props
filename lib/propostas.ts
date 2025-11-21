import { Proposta } from '@/types/proposta'
import { gerarContratoPadrao } from './contratoTemplate'

// Esta é uma função mock - você pode substituir por uma API real ou banco de dados
export function getPropostaBySlug(slug: string): Proposta | null {
  // Exemplo de proposta - você pode criar um arquivo JSON ou usar um banco de dados
  const propostas: Record<string, Proposta> = {
    'exemplo-cliente': {
      id: 'exemplo-cliente',
      cliente: {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        empresa: 'Empresa Exemplo LTDA',
        telefone: '(11) 99999-9999',
      },
      projeto: {
        nome: 'App Venda Externa',
        descricao: 'Aplicativo para gestão de vendas externas com sistema de comissionamento por produto, cadastro de clientes e relatórios de vendas.',
        funcionalidades: [
          {
            id: '1',
            titulo: 'Cadastro de Vendedores',
            descricao: 'Sistema completo de gerenciamento de vendedores externos com autenticação, perfil e histórico de vendas.',
            complexidade: 'Média',
            tempoEstimado: '8-12 horas',
          },
          {
            id: '2',
            titulo: 'Sistema de Comissionamento por Produto',
            descricao: 'Configuração de regras de comissão diferentes para cada produto com cálculo automático.',
            complexidade: 'Alta',
            tempoEstimado: '16-24 horas',
          },
          {
            id: '3',
            titulo: 'Relatórios de Vendas',
            descricao: 'Sistema completo de acompanhamento de vendas e ganhos com gráficos e exportação.',
            complexidade: 'Alta',
            tempoEstimado: '20-30 horas',
          },
          {
            id: '4',
            titulo: 'Cadastro de Clientes',
            descricao: 'Gestão completa de clientes com upload de documentos e histórico de interações.',
            complexidade: 'Média-Alta',
            tempoEstimado: '18-25 horas',
          },
          {
            id: '5',
            titulo: 'Gestão de Vendas',
            descricao: 'Sistema de criação e acompanhamento de vendas com status e cálculo automático de comissão.',
            complexidade: 'Média',
            tempoEstimado: '12-18 horas',
          },
        ],
        produtos: [
          {
            id: '1',
            nome: 'Redução na Conta de Energia',
            descricao: 'Sistema de gestão para vendas de redução de energia',
          },
          {
            id: '2',
            nome: 'Maquininhas de Cartão',
            descricao: 'Gestão de vendas de maquininhas PF e PJ',
          },
        ],
      },
      precificacao: {
        valorBase: 20000,
        pacoteSelecionado: {
          nome: 'Pacote Completo',
          valor: 25000,
          descricao: 'Solução completa e profissional',
          itens: [
            'Todas as funcionalidades principais',
            'Design moderno e responsivo',
            'Hospedagem por 6 meses',
            'Documentação completa',
            'Treinamento para equipe',
            'Suporte técnico por 90 dias',
            '2 rodadas de ajustes após entrega',
          ],
          prazo: '60-90 dias úteis',
          formaPagamento: [
            'Pagamento completo parcelado em até 12x no cartão de crédito',
            'Até 5x sem juros',
            'Acima de 5x com juros da operadora',
          ],
        },
        opcoes: [
          {
            nome: 'Pacote Básico',
            valor: 18000,
            descricao: 'Solução essencial',
            itens: [
              'Funcionalidades principais',
              'Design responsivo básico',
              'Hospedagem básica (3 meses)',
              'Documentação técnica',
              'Suporte por 30 dias',
            ],
            prazo: '45-60 dias úteis',
          formaPagamento: [
            'Pagamento completo parcelado em até 12x no cartão de crédito',
            'Até 5x sem juros',
            'Acima de 5x com juros da operadora',
          ],
          },
        ],
        opcoesPlataforma: [
          {
            id: 'web',
            nome: 'Aplicação Web',
            descricao: 'Sistema web responsivo acessível de qualquer dispositivo',
            valorAdicional: 0,
          },
          {
            id: 'app-lojas',
            nome: 'App nas Lojas (iOS + Android)',
            descricao: 'Aplicativo nativo para iOS e Android disponível nas lojas oficiais',
            valorAdicional: 15000,
          },
          {
            id: 'web-app',
            nome: 'Web + App nas Lojas',
            descricao: 'Solução completa: sistema web + aplicativo nas lojas',
            valorAdicional: 15000,
          },
        ],
      },
      contrato: {
        termos: gerarContratoPadrao({
          objeto:
            'o desenvolvimento de uma plataforma digital para gestão de vendas externas, com sistema de comissionamento por produto, relatórios de vendas com acompanhamento de status e ganhos futuros, cadastro de clientes com anexo de documentos, e gestão de vendas para múltiplos produtos',
          funcionalidades: [
            'Cadastro de vendedores com autenticação, perfil e histórico de vendas',
            'Sistema de comissionamento por produto com regras personalizadas',
            'Relatórios de vendas com status e ganhos futuros',
            'Cadastro de clientes com anexo de documentos',
            'Gestão de vendas para múltiplos produtos',
          ],
          tecnologias: {
            frontend: ['Next.js (App Router)', 'Tailwind CSS', 'React'],
            backend: ['Next.js API Routes', 'Node.js'],
            bancoDados: 'PostgreSQL',
            relatorios: ['Chart.js', 'PDFKit'],
            autenticacao: 'NextAuth.js',
            hospedagem: 'Vercel',
          },
          prazo: '60-90 dias úteis',
          valorTotal: 25000,
          formaPagamento: {
            tipo: 'parcelado',
            parcelas: 12,
          },
          suporte: 90,
        }),
        clausulas: [
          'Desenvolvimento de aplicativo para venda externa com todas as funcionalidades especificadas',
          'Sistema de comissionamento por produto com regras personalizadas',
          'Relatórios de vendas com status e ganhos futuros',
          'Cadastro de clientes com anexo de documentos',
          'Gestão de vendas para múltiplos produtos',
          'Prazo de entrega: 60-90 dias úteis',
          'Valor total: R$ 25.000,00 (podendo variar conforme plataforma escolhida)',
          'Pagamento parcelado em até 12x no cartão de crédito',
          'Suporte técnico por 90 dias após entrega',
          'Propriedade intelectual do software será do cliente após pagamento integral',
        ],
      },
      dataCriacao: new Date().toISOString(),
      status: 'pendente',
    },
    'joao': {
      id: 'joao',
      cliente: {
        nome: 'João',
        email: '', // Preencher com o email do João
        empresa: '',
        telefone: '',
      },
      projeto: {
        nome: 'Aplicativo para Venda Externa',
        descricao: 'Sistema completo para gestão de vendas externas, onde vendedores externos cadastram clientes interessados nos produtos oferecidos (Redução na Conta de Energia e Maquininhas de Cartão PF/PJ), acompanham o status das vendas, calculam comissões por produto, e geram relatórios de vendas com ganhos futuros e realizados. O sistema permite cadastro de clientes com anexo de documentos para facilitar o processo de venda.',
        funcionalidades: [
          {
            id: '1',
            titulo: 'Cadastro de Vendedores',
            descricao: 'Sistema de cadastro e gerenciamento de vendedores externos com autenticação, perfil do vendedor e controle de acesso.',
            complexidade: 'Média',
            tempoEstimado: '8-12 horas',
          },
          {
            id: '2',
            titulo: 'Estabelecer Regras de Comissionamento por Produto',
            descricao: 'Sistema para configurar regras de comissão diferentes para cada produto oferecido (Redução de Energia e Maquininhas PF/PJ), com percentual de comissão por produto e cálculo automático ao fechar venda.',
            complexidade: 'Média-Alta',
            tempoEstimado: '12-18 horas',
          },
          {
            id: '3',
            titulo: 'Relatórios de Vendas com Acompanhamento de Status',
            descricao: 'Relatórios de vendas com acompanhamento do status (em andamento/concluído) e visualização de ganhos futuros (comissões de vendas em andamento) e ganhos realizados (comissões pagas).',
            complexidade: 'Média-Alta',
            tempoEstimado: '14-20 horas',
          },
          {
            id: '4',
            titulo: 'Área para Cadastro de Clientes com Anexo de Documentos',
            descricao: 'Sistema para vendedores cadastrarem clientes interessados nos produtos oferecidos, com upload e anexo de documentos necessários para a venda.',
            complexidade: 'Média',
            tempoEstimado: '10-15 horas',
          },
        ],
        produtos: [
          {
            id: '1',
            nome: 'Redução na Conta de Energia',
            descricao: 'Produto oferecido: Sistema para vendedores externos cadastrarem clientes interessados em redução na conta de energia, com regras de comissão específicas e acompanhamento de vendas.',
          },
          {
            id: '2',
            nome: 'Maquininhas de Cartão',
            descricao: 'Produto oferecido: Sistema para vendedores externos cadastrarem clientes interessados em maquininhas de cartão (PF ou PJ), cada uma com regras de comissão específicas.',
          },
        ],
      },
      precificacao: {
        valorBase: 15000,
        pacoteSelecionado: {
          nome: 'Pacote Essencial',
          valor: 15000,
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
          prazo: '45-60 dias úteis',
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
        termos: gerarContratoPadrao({
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
          prazo: '60-90 dias úteis',
          valorTotal: 25000,
          formaPagamento: {
            tipo: 'parcelado',
            parcelas: 12,
          },
          suporte: 90,
        }),
        clausulas: [
          'Desenvolvimento de aplicativo para vendedores externos venderem os produtos oferecidos (Redução de Energia e Maquininhas PF/PJ)',
          'Cadastro de vendedores externos',
          'Sistema de comissionamento por produto com regras personalizadas',
          'Relatórios de vendas com acompanhamento de status (em andamento/concluído) e ganhos futuros',
          'Área para cadastro de clientes com anexo de documentos',
          'Prazo de entrega: 45-60 dias úteis',
          'Valor total: R$ 15.000,00 (podendo variar conforme plataforma escolhida)',
          'Pagamento parcelado em até 12x no cartão de crédito',
          'Suporte técnico por 90 dias após entrega',
          'Propriedade intelectual do software será do cliente após pagamento integral',
        ],
      },
      dataCriacao: new Date().toISOString(),
      status: 'pendente',
    },
  }

  return propostas[slug] || null
}

