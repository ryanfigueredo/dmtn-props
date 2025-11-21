'use client'

import { DadosInteresse } from './InteresseProposta'
import { Proposta } from '@/types/proposta'
import Logo from './Logo'

interface InteresseSucessoProps {
  dadosInteresse: DadosInteresse
  proposta: Proposta
  valorAtual: number
}

export default function InteresseSucesso({
  dadosInteresse,
  proposta,
  valorAtual,
}: InteresseSucessoProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-dmtn-purple-dark mb-2">
          Interesse Enviado com Sucesso!
        </h2>
        <p className="text-gray-600 text-lg">
          Recebemos seu interesse na proposta. Entraremos em contato em breve.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <h3 className="text-lg font-semibold text-dmtn-purple-dark mb-4">
          Detalhes do Interesse
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Nome:</strong> {dadosInteresse.nome}
          </p>
          <p>
            <strong>Email:</strong> {dadosInteresse.email}
          </p>
          <p>
            <strong>Telefone:</strong> {dadosInteresse.telefone}
          </p>
          <p>
            <strong>Projeto:</strong> {proposta.projeto.nome}
          </p>
          <p>
            <strong>Investimento:</strong> {formatCurrency(valorAtual)}
          </p>
          <p>
            <strong>Data:</strong>{' '}
            {new Date(dadosInteresse.dataInteresse).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">Próximos Passos</h4>
        <ul className="text-left text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Enviaremos o contrato completo por email</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Entraremos em contato pelo telefone informado</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Responderemos suas dúvidas e finalizaremos a negociação</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a
          href="https://dmtn.com.br"
          className="bg-dmtn-purple hover:bg-dmtn-purple-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Voltar ao Site Principal
        </a>
        <button
          onClick={() => window.print()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Imprimir Comprovante
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Dúvidas? Entre em contato:{' '}
          <a
            href="mailto:contato@dmtn.com.br"
            className="text-dmtn-purple hover:underline"
          >
            contato@dmtn.com.br
          </a>{' '}
          ou{' '}
          <a href="tel:+5521997624873" className="text-dmtn-purple hover:underline">
            +55 21 99762-4873
          </a>
        </p>
      </div>
    </div>
  )
}

