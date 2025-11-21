'use client'

import { useState } from 'react'
import { Proposta } from '@/types/proposta'

interface InteressePropostaProps {
  proposta: Proposta
  valorAtual: number
  onEnviarInteresse: (dados: DadosInteresse) => void
}

export interface DadosInteresse {
  nome: string
  email: string
  telefone: string
  tipoPessoa: 'PF' | 'PJ'
  cpf?: string
  cnpj?: string
  razaoSocial?: string
  endereco: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  propostaId: string
  valorProjeto: number
  plataformaEscolhida?: string
  dataInteresse: string
}

export default function InteresseProposta({
  proposta,
  valorAtual,
  onEnviarInteresse,
}: InteressePropostaProps) {
  const [dados, setDados] = useState<DadosInteresse>({
    nome: proposta.cliente.nome || '',
    email: proposta.cliente.email || '',
    telefone: proposta.cliente.telefone || '',
    tipoPessoa: 'PF',
    cpf: '',
    cnpj: '',
    razaoSocial: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    propostaId: proposta.id,
    valorProjeto: valorAtual,
    dataInteresse: new Date().toISOString(),
  })

  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    // Validação completa
    if (!dados.nome.trim()) {
      setErro('Por favor, informe seu nome completo.')
      return
    }

    if (!dados.email.trim() || !dados.email.includes('@')) {
      setErro('Por favor, informe um email válido.')
      return
    }

    if (!dados.telefone.trim()) {
      setErro('Por favor, informe seu telefone.')
      return
    }

    if (dados.tipoPessoa === 'PF' && !dados.cpf?.trim()) {
      setErro('Por favor, informe seu CPF.')
      return
    }

    if (dados.tipoPessoa === 'PJ') {
      if (!dados.cnpj?.trim()) {
        setErro('Por favor, informe o CNPJ.')
        return
      }
      if (!dados.razaoSocial?.trim()) {
        setErro('Por favor, informe a Razão Social.')
        return
      }
    }

    if (!dados.endereco.trim()) {
      setErro('Por favor, informe o endereço.')
      return
    }

    if (!dados.numero.trim()) {
      setErro('Por favor, informe o número do endereço.')
      return
    }

    if (!dados.bairro.trim()) {
      setErro('Por favor, informe o bairro.')
      return
    }

    if (!dados.cidade.trim()) {
      setErro('Por favor, informe a cidade.')
      return
    }

    if (!dados.estado.trim()) {
      setErro('Por favor, informe o estado.')
      return
    }

    if (!dados.cep.trim()) {
      setErro('Por favor, informe o CEP.')
      return
    }

    setEnviando(true)

    try {
      // Enviar para API
      const response = await fetch('/api/interesse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar dados')
      }

      // Chamar callback de sucesso
      onEnviarInteresse(dados)
    } catch (error) {
      console.error('Erro ao enviar interesse:', error)
      setErro('Erro ao enviar dados. Por favor, tente novamente.')
      setEnviando(false)
    }
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dmtn-purple-dark mb-2">
          Tenho Interesse na Proposta
        </h2>
        <p className="text-gray-600">
          Preencha seus dados abaixo e entraremos em contato para enviar o contrato e finalizar a
          negociação.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-dmtn-purple-lighter border border-dmtn-purple-light rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Resumo da Proposta:</strong>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Projeto:</strong> {proposta.projeto.nome}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Investimento:</strong> {formatCurrency(valorAtual)}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-dmtn-purple-dark mb-4">Dados Pessoais</h3>
        </div>

        <div>
          <label htmlFor="tipoPessoa" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Pessoa <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoPessoa"
            value={dados.tipoPessoa}
            onChange={(e) => setDados({ ...dados, tipoPessoa: e.target.value as 'PF' | 'PJ' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
          >
            <option value="PF">Pessoa Física (PF)</option>
            <option value="PJ">Pessoa Jurídica (PJ)</option>
          </select>
        </div>

        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            {dados.tipoPessoa === 'PJ' ? 'Nome do Representante' : 'Nome Completo'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nome"
            value={dados.nome}
            onChange={(e) => setDados({ ...dados, nome: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
            placeholder={dados.tipoPessoa === 'PJ' ? 'Nome do representante legal' : 'Seu nome completo'}
          />
        </div>

        {dados.tipoPessoa === 'PJ' && (
          <div>
            <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-700 mb-1">
              Razão Social <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="razaoSocial"
              value={dados.razaoSocial}
              onChange={(e) => setDados({ ...dados, razaoSocial: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              placeholder="Razão Social da empresa"
            />
          </div>
        )}

        <div>
          <label htmlFor={dados.tipoPessoa === 'PF' ? 'cpf' : 'cnpj'} className="block text-sm font-medium text-gray-700 mb-1">
            {dados.tipoPessoa === 'PF' ? 'CPF' : 'CNPJ'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={dados.tipoPessoa === 'PF' ? 'cpf' : 'cnpj'}
            value={dados.tipoPessoa === 'PF' ? dados.cpf : dados.cnpj}
            onChange={(e) =>
              setDados({
                ...dados,
                [dados.tipoPessoa === 'PF' ? 'cpf' : 'cnpj']: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
            placeholder={dados.tipoPessoa === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={dados.email}
            onChange={(e) => setDados({ ...dados, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telefone"
            value={dados.telefone}
            onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6">
          <h3 className="text-lg font-semibold text-dmtn-purple-dark mb-4">Endereço Completo</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
              Logradouro (Rua, Avenida, etc.) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="endereco"
              value={dados.endereco}
              onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
              placeholder="Rua, Avenida, etc."
            />
          </div>
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
              Número <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="numero"
              value={dados.numero}
              onChange={(e) => setDados({ ...dados, numero: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
              placeholder="123"
            />
          </div>
        </div>

        <div>
          <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-1">
            Complemento
          </label>
          <input
            type="text"
            id="complemento"
            value={dados.complemento}
            onChange={(e) => setDados({ ...dados, complemento: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            placeholder="Apto, Bloco, etc. (opcional)"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 mb-1">
              Bairro <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bairro"
              value={dados.bairro}
              onChange={(e) => setDados({ ...dados, bairro: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
              placeholder="Bairro"
            />
          </div>
          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
              CEP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cep"
              value={dados.cep}
              onChange={(e) => setDados({ ...dados, cep: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
              placeholder="00000-000"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cidade"
              value={dados.cidade}
              onChange={(e) => setDados({ ...dados, cidade: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
              placeholder="Cidade"
            />
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado (UF) <span className="text-red-500">*</span>
            </label>
            <select
              id="estado"
              value={dados.estado}
              onChange={(e) => setDados({ ...dados, estado: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
              required
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-gradient-to-r from-dmtn-purple-dark to-dmtn-purple hover:from-dmtn-purple hover:to-dmtn-purple-light text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {enviando ? 'Enviando...' : 'Tenho Interesse - Enviar Dados'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Ao enviar, você concorda em receber o contrato e ser contactado pela DMTN para finalizar a
          negociação.
        </p>
      </form>
    </section>
  )
}

