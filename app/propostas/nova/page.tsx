'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NovaPropostaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    slug: '',
    clienteNome: '',
    clienteEmail: '',
    clienteTelefone: '',
    clienteEmpresa: '',
    projetoNome: '',
    projetoDescricao: '',
    prazo: '45-60 dias úteis',
    valorBase: '',
    valorFinal: '',
    plataformaEscolhida: 'web',
    status: 'pendente',
    contratoObjeto: '',
  })

  const [funcionalidades, setFuncionalidades] = useState([
    { titulo: '', descricao: '', complexidade: 'Média', tempoEstimado: '' },
  ])

  const [produtos, setProdutos] = useState([{ nome: '', descricao: '' }])

  const addFuncionalidade = () => {
    setFuncionalidades([...funcionalidades, { titulo: '', descricao: '', complexidade: 'Média', tempoEstimado: '' }])
  }

  const removeFuncionalidade = (index: number) => {
    setFuncionalidades(funcionalidades.filter((_, i) => i !== index))
  }

  const updateFuncionalidade = (index: number, field: string, value: string) => {
    const updated = [...funcionalidades]
    updated[index] = { ...updated[index], [field]: value }
    setFuncionalidades(updated)
  }

  const addProduto = () => {
    setProdutos([...produtos, { nome: '', descricao: '' }])
  }

  const removeProduto = (index: number) => {
    setProdutos(produtos.filter((_, i) => i !== index))
  }

  const updateProduto = (index: number, field: string, value: string) => {
    const updated = [...produtos]
    updated[index] = { ...updated[index], [field]: value }
    setProdutos(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/propostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          valorBase: parseFloat(formData.valorBase),
          valorFinal: parseFloat(formData.valorFinal),
          funcionalidades: funcionalidades.filter((f) => f.titulo && f.descricao),
          produtos: produtos.filter((p) => p.nome && p.descricao),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao criar proposta')
      }

      router.push('/propostas')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar proposta')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/propostas">
              <Logo className="h-8 w-auto" />
            </Link>
            <Link
              href="/propostas"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-dmtn-purple-dark mb-6">Nova Proposta</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Cliente */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-dmtn-purple-dark mb-4">Dados do Cliente</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clienteNome}
                  onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="exemplo-cliente"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /proposta/{formData.slug || 'slug'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.clienteEmail}
                  onChange={(e) => setFormData({ ...formData, clienteEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.clienteTelefone}
                  onChange={(e) => setFormData({ ...formData, clienteTelefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
              </div>
            </div>
          </section>

          {/* Dados do Projeto */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-dmtn-purple-dark mb-4">Dados do Projeto</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Projeto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projetoNome}
                  onChange={(e) => setFormData({ ...formData, projetoNome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.projetoDescricao}
                  onChange={(e) => setFormData({ ...formData, projetoDescricao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prazo *</label>
                  <input
                    type="text"
                    required
                    value={formData.prazo}
                    onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Base (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.valorBase}
                    onChange={(e) => setFormData({ ...formData, valorBase: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Final (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.valorFinal}
                    onChange={(e) => setFormData({ ...formData, valorFinal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Funcionalidades */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dmtn-purple-dark">Funcionalidades</h2>
              <button
                type="button"
                onClick={addFuncionalidade}
                className="text-dmtn-purple hover:text-dmtn-purple-dark font-medium"
              >
                + Adicionar
              </button>
            </div>
            {funcionalidades.map((func, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Funcionalidade {index + 1}</span>
                  {funcionalidades.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFuncionalidade(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Título da funcionalidade"
                    value={func.titulo}
                    onChange={(e) => updateFuncionalidade(index, 'titulo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descrição"
                    value={func.descricao}
                    onChange={(e) => updateFuncionalidade(index, 'descricao', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                  <div className="grid md:grid-cols-2 gap-3">
                    <select
                      value={func.complexidade}
                      onChange={(e) => updateFuncionalidade(index, 'complexidade', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Tempo estimado (ex: 8-12 horas)"
                      value={func.tempoEstimado}
                      onChange={(e) => updateFuncionalidade(index, 'tempoEstimado', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Produtos */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dmtn-purple-dark">Produtos</h2>
              <button
                type="button"
                onClick={addProduto}
                className="text-dmtn-purple hover:text-dmtn-purple-dark font-medium"
              >
                + Adicionar
              </button>
            </div>
            {produtos.map((prod, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Produto {index + 1}</span>
                  {produtos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduto(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    value={prod.nome}
                    onChange={(e) => updateProduto(index, 'nome', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descrição"
                    value={prod.descricao}
                    onChange={(e) => updateProduto(index, 'descricao', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple"
                  />
                </div>
              </div>
            ))}
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-dmtn-purple-dark to-dmtn-purple hover:from-dmtn-purple hover:to-dmtn-purple-light text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Salvando...' : 'Criar Proposta'}
            </button>
            <Link
              href="/propostas"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

