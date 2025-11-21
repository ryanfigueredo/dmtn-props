export interface Funcionalidade {
  id: string
  titulo: string
  descricao: string
  complexidade?: string
  tempoEstimado?: string
}

export interface Produto {
  id: string
  nome: string
  descricao: string
}

export interface Pacote {
  nome: string
  valor: number
  descricao: string
  itens: string[]
  prazo: string
  formaPagamento: string[]
}

export interface OpcaoPlataforma {
  id: string
  nome: string
  descricao: string
  valorAdicional: number
  icone?: string
}

export interface Proposta {
  id: string
  cliente: {
    nome: string
    email: string
    empresa?: string
    telefone?: string
  }
  projeto: {
    nome: string
    descricao: string
    funcionalidades: Funcionalidade[]
    produtos?: Produto[]
  }
  precificacao: {
    pacoteSelecionado: Pacote
    opcoes?: Pacote[]
    opcoesPlataforma?: OpcaoPlataforma[]
    valorBase: number
  }
  contrato: {
    termos: string
    clausulas: string[]
  }
  dataCriacao: string
  status: 'pendente' | 'assinado' | 'recusado'
}

