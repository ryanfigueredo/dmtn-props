'use client'

import { OpcaoPlataforma } from '@/types/proposta'

interface SelecaoPlataformaProps {
  opcoes: OpcaoPlataforma[]
  selecionado: string | null
  onSelecionar: (id: string) => void
}

export default function SelecaoPlataforma({
  opcoes,
  selecionado,
  onSelecionar,
}: SelecaoPlataformaProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-dmtn-purple">
        Escolha a Plataforma
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {opcoes.map((opcao) => {
          const isSelecionado = selecionado === opcao.id
          return (
            <button
              key={opcao.id}
              onClick={() => onSelecionar(opcao.id)}
              className={`
                relative p-6 rounded-lg border-2 transition-all text-left
                ${
                  isSelecionado
                    ? 'border-dmtn-purple bg-dmtn-purple-lighter shadow-md'
                    : 'border-gray-200 bg-white hover:border-dmtn-purple-light hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          isSelecionado
                            ? 'border-dmtn-purple bg-dmtn-purple'
                            : 'border-gray-300'
                        }
                      `}
                    >
                      {isSelecionado && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <h4 className="font-semibold text-dmtn-purple-dark text-lg">
                      {opcao.nome}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{opcao.descricao}</p>
                  {opcao.valorAdicional !== 0 && (
                    <p className="text-sm font-semibold text-dmtn-purple">
                      {opcao.valorAdicional > 0 ? '+' : ''}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(opcao.valorAdicional)}
                    </p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

