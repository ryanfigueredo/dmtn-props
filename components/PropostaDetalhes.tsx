'use client'

import { useState, useEffect } from 'react'
import { Proposta } from '@/types/proposta'
import SelecaoPlataforma from './SelecaoPlataforma'

interface PropostaDetalhesProps {
  proposta: Proposta
  onValorMudar?: (novoValor: number) => void
}

export default function PropostaDetalhes({
  proposta,
  onValorMudar,
}: PropostaDetalhesProps) {
  const [plataformaSelecionada, setPlataformaSelecionada] = useState<string | null>(
    proposta.precificacao.opcoesPlataforma?.[0]?.id || null
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const calcularValorTotal = () => {
    const valorBase = proposta.precificacao.valorBase || proposta.precificacao.pacoteSelecionado.valor
    if (!plataformaSelecionada || !proposta.precificacao.opcoesPlataforma) {
      return valorBase
    }
    const opcaoSelecionada = proposta.precificacao.opcoesPlataforma.find(
      (op) => op.id === plataformaSelecionada
    )
    return valorBase + (opcaoSelecionada?.valorAdicional || 0)
  }

  const valorTotal = calcularValorTotal()

  const handlePlataformaSelecionar = (id: string) => {
    setPlataformaSelecionada(id)
  }

  useEffect(() => {
    if (onValorMudar) {
      onValorMudar(valorTotal)
    }
  }, [valorTotal, onValorMudar])


  return (
    <div className="space-y-8">
      {/* Informações do Cliente */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-dmtn-purple-dark mb-4">
          Informações do Cliente
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nome</p>
            <p className="font-semibold">{proposta.cliente.nome}</p>
          </div>
          {proposta.cliente.empresa && (
            <div>
              <p className="text-sm text-gray-600">Empresa</p>
              <p className="font-semibold">{proposta.cliente.empresa}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold">{proposta.cliente.email}</p>
          </div>
          {proposta.cliente.telefone && (
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-semibold">{proposta.cliente.telefone}</p>
            </div>
          )}
        </div>
      </section>

      {/* Detalhes do Projeto */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-dmtn-purple-dark mb-4">
          Detalhes do Projeto
        </h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{proposta.projeto.nome}</h3>
          <p className="text-gray-700">{proposta.projeto.descricao}</p>
        </div>

        {/* Funcionalidades */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-dmtn-purple">
            Funcionalidades Incluídas
          </h3>
          <div className="space-y-4">
            {proposta.projeto.funcionalidades.map((func) => (
              <div
                key={func.id}
                className="bg-dmtn-purple-lighter rounded-lg p-4 border-l-4 border-dmtn-purple"
              >
                <h4 className="font-semibold text-dmtn-purple-dark mb-2">
                  {func.titulo}
                </h4>
                <p className="text-gray-700 mb-2">{func.descricao}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  {func.complexidade && (
                    <span>Complexidade: {func.complexidade}</span>
                  )}
                  {func.tempoEstimado && (
                    <span>Tempo: {func.tempoEstimado}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos */}
        {proposta.projeto.produtos && proposta.projeto.produtos.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-dmtn-purple">
              Produtos do Sistema
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {proposta.projeto.produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-dmtn-purple-lighter rounded-lg p-4"
                >
                  <h4 className="font-semibold text-dmtn-purple-dark mb-2">
                    {produto.nome}
                  </h4>
                  <p className="text-gray-700 text-sm">{produto.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Seleção de Plataforma */}
      {proposta.precificacao.opcoesPlataforma &&
        proposta.precificacao.opcoesPlataforma.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6">
            <SelecaoPlataforma
              opcoes={proposta.precificacao.opcoesPlataforma}
              selecionado={plataformaSelecionada}
              onSelecionar={handlePlataformaSelecionar}
            />
          </section>
        )}

      {/* Precificação */}
      <section className="bg-gradient-to-br from-dmtn-purple-dark to-dmtn-purple rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Investimento</h2>
        <div className="mb-6">
          <p className="text-4xl font-bold mb-2">
            {formatCurrency(valorTotal)}
          </p>
          <p className="text-xl mb-4">
            {proposta.precificacao.pacoteSelecionado.nome}
            {plataformaSelecionada &&
              proposta.precificacao.opcoesPlataforma && (
                <span className="text-lg block mt-2 text-dmtn-purple-lighter">
                  {
                    proposta.precificacao.opcoesPlataforma.find(
                      (op) => op.id === plataformaSelecionada
                    )?.nome
                  }
                </span>
              )}
          </p>
          <p className="text-dmtn-purple-lighter">
            {proposta.precificacao.pacoteSelecionado.descricao}
          </p>
          {plataformaSelecionada &&
            proposta.precificacao.opcoesPlataforma && (
              <p className="text-sm text-dmtn-purple-lighter mt-2">
                Valor base: {formatCurrency(proposta.precificacao.valorBase || proposta.precificacao.pacoteSelecionado.valor)}
                {proposta.precificacao.opcoesPlataforma
                  .find((op) => op.id === plataformaSelecionada)
                  ?.valorAdicional !== 0 && (
                  <span>
                    {' '}
                    +{' '}
                    {formatCurrency(
                      proposta.precificacao.opcoesPlataforma.find(
                        (op) => op.id === plataformaSelecionada
                      )?.valorAdicional || 0
                    )}
                  </span>
                )}
              </p>
            )}
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-3">O que está incluído:</h3>
          <ul className="space-y-2">
            {proposta.precificacao.pacoteSelecionado.itens.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-dmtn-purple-lighter mb-1">Prazo de Entrega</p>
            <p className="font-semibold">{proposta.precificacao.pacoteSelecionado.prazo}</p>
          </div>
          <div>
            <p className="text-sm text-dmtn-purple-lighter mb-1">Forma de Pagamento</p>
            <ul className="text-sm space-y-1">
              {proposta.precificacao.pacoteSelecionado.formaPagamento.map((pagamento, index) => (
                <li key={index}>{pagamento}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

