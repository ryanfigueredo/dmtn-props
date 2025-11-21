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

    // Validação básica
    if (!dados.nome.trim()) {
      setErro('Por favor, informe seu nome.')
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
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nome"
            value={dados.nome}
            onChange={(e) => setDados({ ...dados, nome: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
            required
            placeholder="Seu nome completo"
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

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {erro}
          </div>
        )}

        <div className="bg-dmtn-purple-lighter border border-dmtn-purple-light rounded-lg p-4">
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

