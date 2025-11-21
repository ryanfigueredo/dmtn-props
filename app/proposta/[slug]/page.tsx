'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import PropostaDetalhes from '@/components/PropostaDetalhes'
import Contrato, { DadosAssinatura } from '@/components/Contrato'
import AssinaturaSucesso from '@/components/AssinaturaSucesso'
import Logo from '@/components/Logo'
import { Proposta } from '@/types/proposta'
import { getPropostaBySlug } from '@/lib/propostas'

export default function PropostaPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [proposta, setProposta] = useState<Proposta | null>(null)
  const [assinado, setAssinado] = useState(false)
  const [dadosAssinatura, setDadosAssinatura] = useState<DadosAssinatura | null>(null)
  const [valorAtual, setValorAtual] = useState<number>(0)

  useEffect(() => {
    if (slug) {
      const propostaData = getPropostaBySlug(slug)
      setProposta(propostaData)
      
      // Inicializar valor atual
      if (propostaData) {
        const valorInicial =
          propostaData.precificacao.valorBase ||
          propostaData.precificacao.pacoteSelecionado.valor
        setValorAtual(valorInicial)
      }
      
      // Verificar se já foi assinado (você pode salvar isso em localStorage ou API)
      const assinaturaSalva = localStorage.getItem(`assinatura_${slug}`)
      if (assinaturaSalva) {
        setAssinado(true)
        setDadosAssinatura(JSON.parse(assinaturaSalva))
      }
    }
  }, [slug])

  const handleAssinar = async (dados: DadosAssinatura) => {
    if (!proposta) return

    try {
      // Salvar assinatura localmente
      localStorage.setItem(`assinatura_${slug}`, JSON.stringify(dados))
      
      // Tentar salvar na API (opcional - funciona mesmo se a API não estiver configurada)
      try {
        const response = await fetch('/api/assinaturas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propostaId: proposta.id, ...dados }),
        })
        
        if (!response.ok) {
          console.warn('API não disponível, usando localStorage')
        }
      } catch (apiError) {
        console.warn('Erro ao salvar na API, usando localStorage:', apiError)
      }

      setAssinado(true)
      setDadosAssinatura(dados)
      
      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Erro ao assinar contrato:', error)
      alert('Erro ao processar assinatura. Por favor, tente novamente.')
    }
  }

  if (!proposta) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-dmtn-purple-dark mb-4">
            Proposta não encontrada
          </h1>
          <p className="text-gray-600">
            A proposta solicitada não foi encontrada. Verifique o link e tente novamente.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {assinado && dadosAssinatura ? (
          <AssinaturaSucesso
            dadosAssinatura={dadosAssinatura}
            propostaId={proposta.id}
            proposta={proposta}
            valorAtual={valorAtual || proposta.precificacao.pacoteSelecionado.valor}
          />
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-dmtn-purple-dark mb-4">
                Proposta Comercial
              </h1>
              <p className="text-gray-600">
                Revise os detalhes do projeto e assine o contrato para iniciar o desenvolvimento
              </p>
            </div>

            <PropostaDetalhes
              proposta={proposta}
              onValorMudar={setValorAtual}
            />

            <div className="mt-8">
              <Contrato
                proposta={proposta}
                onAssinar={handleAssinar}
                valorAtual={valorAtual}
              />
            </div>
          </>
        )}
      </main>

      <footer className="bg-dmtn-purple-dark text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Logo white={true} className="h-10 w-auto" />
          </div>
          <div className="mb-4">
            <a
              href="https://dmtn.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dmtn-purple-lighter hover:text-white transition-colors underline"
            >
              Retornar ao site principal
            </a>
          </div>
          <p className="text-sm text-dmtn-purple-lighter">
            © {new Date().getFullYear()} DMTN. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

