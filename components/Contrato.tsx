'use client'

import { useState, useEffect } from 'react'
import { Proposta } from '@/types/proposta'
import { gerarPDFContrato } from '@/lib/gerarPDF'
import { calcularParcelas, formatarParcela } from '@/lib/calcularParcelas'

interface ContratoProps {
  proposta: Proposta
  onAssinar: (dadosAssinatura: DadosAssinatura) => void
  valorAtual?: number
}

export interface DadosAssinatura {
  // Dados pessoais
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  tipoPessoa: 'PF' | 'PJ'
  cnpj?: string
  razaoSocial?: string
  
  // Dados de pagamento
  formaPagamento: 'cartao' | 'pix' | 'boleto'
  parcelas?: number
  valorParcela?: number
  valorTotalComJuros?: number
  
  // Assinatura
  dataAssinatura: string
  assinaturaDigital: string
  aceiteTermos: boolean
}

export default function Contrato({
  proposta,
  onAssinar,
  valorAtual,
}: ContratoProps) {
  const valorParaContrato =
    valorAtual ||
    proposta.precificacao.valorBase ||
    proposta.precificacao.pacoteSelecionado.valor

  const [mostrarContrato, setMostrarContrato] = useState(false)
  const [aceiteTermos, setAceiteTermos] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [dadosAssinatura, setDadosAssinatura] = useState<DadosAssinatura>({
    nome: proposta.cliente.nome || '',
    cpf: '',
    email: proposta.cliente.email || '',
    telefone: proposta.cliente.telefone || '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    tipoPessoa: 'PF',
    formaPagamento: 'cartao',
    parcelas: 3,
    dataAssinatura: new Date().toISOString(),
    assinaturaDigital: '',
    aceiteTermos: false,
  })

  // Calcular valor da parcela com juros
  useEffect(() => {
    if (dadosAssinatura.formaPagamento === 'cartao' && dadosAssinatura.parcelas) {
      const parcelaCalculada = calcularParcelas(valorParaContrato, dadosAssinatura.parcelas)
      setDadosAssinatura((prev) => ({
        ...prev,
        valorParcela: parcelaCalculada.valorParcela,
        valorTotalComJuros: parcelaCalculada.valorTotal,
      }))
    } else {
      setDadosAssinatura((prev) => ({
        ...prev,
        valorParcela: valorParaContrato,
        valorTotalComJuros: valorParaContrato,
      }))
    }
  }, [dadosAssinatura.formaPagamento, dadosAssinatura.parcelas, valorParaContrato])

  // Gerar texto de forma de pagamento
  const gerarFormaPagamentoTexto = () => {
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valorParaContrato)

    if (dadosAssinatura.formaPagamento === 'cartao') {
      if (dadosAssinatura.parcelas && dadosAssinatura.parcelas > 1) {
        const parcelaCalculada = calcularParcelas(valorParaContrato, dadosAssinatura.parcelas)
        const textoParcela = formatarParcela(parcelaCalculada)
        
        return [
          `Valor do projeto: ${valorFormatado}`,
          `Pagamento em ${textoParcela} no cartão de crédito`,
          parcelaCalculada.temJuros
            ? `Total a pagar: ${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(parcelaCalculada.valorTotal)}`
            : '',
        ].filter(Boolean)
      }
      return [
        `Valor total: ${valorFormatado}`,
        `Pagamento à vista no cartão de crédito`,
      ]
    }

    if (dadosAssinatura.formaPagamento === 'pix') {
      return [
        `Valor total: ${valorFormatado}`,
        `Pagamento via PIX antes do início do desenvolvimento`,
      ]
    }

    return [
      `Valor total: ${valorFormatado}`,
      `Pagamento via boleto bancário`,
    ]
  }

  // Substituir placeholders no contrato
  const contratoComDados = () => {
    const formaPagamentoTexto = gerarFormaPagamentoTexto()
    const dataFormatada = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    
    return proposta.contrato.termos
      .replace(/\[NOME DO CLIENTE\]/g, dadosAssinatura.nome || proposta.cliente.nome)
      .replace(
        /\[CNPJ\/CPF\]/g,
        dadosAssinatura.tipoPessoa === 'PJ' && dadosAssinatura.cnpj
          ? dadosAssinatura.cnpj
          : dadosAssinatura.cpf || '[CNPJ/CPF]'
      )
      .replace(
        /\[ENDEREÇO COMPLETO\]/g,
        dadosAssinatura.endereco
          ? `${dadosAssinatura.endereco}, ${dadosAssinatura.cidade} - ${dadosAssinatura.estado}, CEP: ${dadosAssinatura.cep}`
          : '[ENDEREÇO COMPLETO]'
      )
      .replace(/\[PRAZO\]/g, proposta.precificacao.pacoteSelecionado.prazo)
      .replace(
        /\[VALOR\]/g,
        valorParaContrato.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      )
      .replace(/\[FORMA DE PAGAMENTO\]/g, formaPagamentoTexto.join('\n'))
      .replace(/\[LOCAL\]/g, 'Rio de Janeiro')
      .replace(/\[DATA\]/g, dataFormatada)
      .replace(/\[NOME REPRESENTANTE\]/g, dadosAssinatura.nome || proposta.cliente.nome)
  }

  const handleAssinar = async () => {
    if (!aceiteTermos) {
      alert('Por favor, aceite os termos do contrato para continuar.')
      return
    }

    if (
      !dadosAssinatura.cpf ||
      !dadosAssinatura.nome ||
      !dadosAssinatura.email ||
      !dadosAssinatura.telefone ||
      !dadosAssinatura.endereco ||
      !dadosAssinatura.cidade ||
      !dadosAssinatura.estado ||
      !dadosAssinatura.cep ||
      !dadosAssinatura.assinaturaDigital
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (dadosAssinatura.tipoPessoa === 'PJ' && !dadosAssinatura.cnpj) {
      alert('Por favor, informe o CNPJ.')
      return
    }

    const dadosCompletos = {
      ...dadosAssinatura,
      aceiteTermos: true,
      dataAssinatura: new Date().toISOString(),
    }

    onAssinar(dadosCompletos)
  }

  const handleBaixarPDF = async () => {
    if (
      !dadosAssinatura.cpf ||
      !dadosAssinatura.nome ||
      !dadosAssinatura.email ||
      !dadosAssinatura.telefone ||
      !dadosAssinatura.endereco ||
      !dadosAssinatura.cidade ||
      !dadosAssinatura.estado ||
      !dadosAssinatura.cep
    ) {
      alert('Por favor, preencha todos os dados antes de baixar o PDF.')
      return
    }

    await gerarPDFContrato({
      dadosCliente: {
        nome: dadosAssinatura.nome,
        cpf: dadosAssinatura.cpf,
        email: dadosAssinatura.email,
        telefone: dadosAssinatura.telefone,
        endereco: dadosAssinatura.endereco,
        cidade: dadosAssinatura.cidade,
        estado: dadosAssinatura.estado,
        cep: dadosAssinatura.cep,
        tipoPessoa: dadosAssinatura.tipoPessoa,
        cnpj: dadosAssinatura.cnpj,
        razaoSocial: dadosAssinatura.razaoSocial,
      },
      dadosProjeto: {
        nome: proposta.projeto.nome,
        descricao: proposta.projeto.descricao,
        prazo: proposta.precificacao.pacoteSelecionado.prazo,
      },
      dadosPagamento: {
        valorTotal: valorParaContrato,
        formaPagamento: dadosAssinatura.formaPagamento,
        parcelas: dadosAssinatura.parcelas,
        valorParcela: dadosAssinatura.valorParcela,
        formaPagamentoDetalhada: gerarFormaPagamentoTexto(),
      },
      dadosContratado: {
        nome: 'DMTN DIGITAL TECNOLOGIA E SOLUCOES LTDA',
        cnpj: '59.171.428/0001-40',
        endereco: 'Rua Visconde de Pirajá, 414, sala 718, Ipanema, Rio de Janeiro - RJ',
        email: 'contato@dmtn.com.br',
        telefone: '+55 21 99762-4873',
        representante: {
          nome: "RYAN D' OLIVEIRA LOPES FIGUEREDO",
          cpf: '047.083.635-08',
          cargo: 'Sócio Administrador',
        },
      },
      dataAssinatura: dadosAssinatura.dataAssinatura,
      local: 'Rio de Janeiro',
    })
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-dmtn-purple-dark mb-4">
        Contrato de Prestação de Serviços
      </h2>

      {!mostrarContrato ? (
        <div className="text-center py-8">
          <button
            onClick={() => setMostrarContrato(true)}
            className="bg-dmtn-purple hover:bg-dmtn-purple-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Visualizar Contrato Completo
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Contrato com dados preenchidos */}
          <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {contratoComDados()}
            </pre>
          </div>

          {!mostrarFormulario ? (
            <div className="text-center space-y-4">
              <button
                onClick={() => setMostrarFormulario(true)}
                className="bg-dmtn-purple hover:bg-dmtn-purple-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Preencher Dados e Assinar Contrato
              </button>
              <button
                onClick={handleBaixarPDF}
                className="block w-full md:w-auto mx-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Baixar Contrato em PDF
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-dmtn-purple-dark">
                Dados para Assinatura
              </h3>

              {/* Tipo de Pessoa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Pessoa *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoPessoa"
                      value="PF"
                      checked={dadosAssinatura.tipoPessoa === 'PF'}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          tipoPessoa: e.target.value as 'PF' | 'PJ',
                        })
                      }
                      className="mr-2"
                    />
                    Pessoa Física
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoPessoa"
                      value="PJ"
                      checked={dadosAssinatura.tipoPessoa === 'PJ'}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          tipoPessoa: e.target.value as 'PF' | 'PJ',
                        })
                      }
                      className="mr-2"
                    />
                    Pessoa Jurídica
                  </label>
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dadosAssinatura.tipoPessoa === 'PJ' ? 'Razão Social *' : 'Nome Completo *'}
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.tipoPessoa === 'PJ' ? dadosAssinatura.razaoSocial || '' : dadosAssinatura.nome}
                    onChange={(e) =>
                      setDadosAssinatura({
                        ...dadosAssinatura,
                        ...(dadosAssinatura.tipoPessoa === 'PJ'
                          ? { razaoSocial: e.target.value, nome: e.target.value }
                          : { nome: e.target.value }),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dadosAssinatura.tipoPessoa === 'PJ' ? 'CNPJ *' : 'CPF *'}
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.tipoPessoa === 'PJ' ? dadosAssinatura.cnpj || '' : dadosAssinatura.cpf}
                    onChange={(e) =>
                      setDadosAssinatura({
                        ...dadosAssinatura,
                        ...(dadosAssinatura.tipoPessoa === 'PJ'
                          ? { cnpj: e.target.value }
                          : { cpf: e.target.value }),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder={dadosAssinatura.tipoPessoa === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={dadosAssinatura.email}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={dadosAssinatura.telefone}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, telefone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço Completo *
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.endereco}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, endereco: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder="Rua, número, complemento"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.cidade}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, cidade: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.estado}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, estado: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder="SP"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    value={dadosAssinatura.cep}
                    onChange={(e) =>
                      setDadosAssinatura({ ...dadosAssinatura, cep: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder="00000-000"
                    required
                  />
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-dmtn-purple-dark mb-4">
                  Forma de Pagamento
                </h4>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="formaPagamento"
                      value="cartao"
                      checked={dadosAssinatura.formaPagamento === 'cartao'}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          formaPagamento: e.target.value as 'cartao' | 'pix' | 'boleto',
                        })
                      }
                      className="mr-2"
                    />
                    <div>
                      <div className="font-semibold">Cartão de Crédito</div>
                      <div className="text-sm text-gray-600">Parcelado</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="formaPagamento"
                      value="pix"
                      checked={dadosAssinatura.formaPagamento === 'pix'}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          formaPagamento: e.target.value as 'cartao' | 'pix' | 'boleto',
                        })
                      }
                      className="mr-2"
                    />
                    <div>
                      <div className="font-semibold">PIX</div>
                      <div className="text-sm text-gray-600">Antes da entrega</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="formaPagamento"
                      value="boleto"
                      checked={dadosAssinatura.formaPagamento === 'boleto'}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          formaPagamento: e.target.value as 'cartao' | 'pix' | 'boleto',
                        })
                      }
                      className="mr-2"
                    />
                    <div>
                      <div className="font-semibold">Boleto</div>
                      <div className="text-sm text-gray-600">Bancário</div>
                    </div>
                  </label>
                </div>

                {dadosAssinatura.formaPagamento === 'cartao' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Parcelas *
                    </label>
                    <select
                      value={dadosAssinatura.parcelas || 3}
                      onChange={(e) =>
                        setDadosAssinatura({
                          ...dadosAssinatura,
                          parcelas: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                        const parcela = calcularParcelas(valorParaContrato, num)
                        const label = num <= 5 ? `${num}x sem juros` : `${num}x com juros`
                        return (
                          <option key={num} value={num}>
                            {label}
                          </option>
                        )
                      })}
                    </select>
                    {dadosAssinatura.parcelas && dadosAssinatura.parcelas > 1 && (
                      <div className="mt-3 p-3 bg-dmtn-purple-lighter rounded-lg">
                        {(() => {
                          const parcelaCalculada = calcularParcelas(
                            valorParaContrato,
                            dadosAssinatura.parcelas
                          )
                          return (
                            <>
                              <p className="text-sm font-semibold text-dmtn-purple-dark mb-1">
                                {formatarParcela(parcelaCalculada)}
                              </p>
                              {parcelaCalculada.temJuros && (
                                <p className="text-xs text-gray-600">
                                  Total com juros:{' '}
                                  {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                  }).format(parcelaCalculada.valorTotal)}
                                </p>
                              )}
                            </>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Assinatura Digital */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assinatura Digital *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">
                    Digite seu nome completo para assinar:
                  </p>
                  <input
                    type="text"
                    value={dadosAssinatura.assinaturaDigital}
                    onChange={(e) =>
                      setDadosAssinatura({
                        ...dadosAssinatura,
                        assinaturaDigital: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dmtn-purple focus:border-transparent"
                    placeholder="Digite seu nome completo"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Ao digitar seu nome, você confirma que leu e concorda com os termos do contrato.
                  </p>
                </div>
              </div>

              {/* Aceite de Termos */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="aceite"
                  checked={aceiteTermos}
                  onChange={(e) => setAceiteTermos(e.target.checked)}
                  className="mt-1 mr-3 w-5 h-5 text-dmtn-purple focus:ring-dmtn-purple"
                  required
                />
                <label htmlFor="aceite" className="text-sm text-gray-700">
                  Declaro que li, compreendi e concordo com todos os termos e condições do
                  contrato apresentado acima. *
                </label>
              </div>

              {/* Botões */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleAssinar}
                  disabled={
                    !aceiteTermos ||
                    !dadosAssinatura.cpf ||
                    !dadosAssinatura.nome ||
                    !dadosAssinatura.email ||
                    !dadosAssinatura.telefone ||
                    !dadosAssinatura.endereco ||
                    !dadosAssinatura.cidade ||
                    !dadosAssinatura.estado ||
                    !dadosAssinatura.cep ||
                    !dadosAssinatura.assinaturaDigital
                  }
                  className="flex-1 bg-gradient-to-r from-dmtn-purple-dark to-dmtn-purple hover:from-dmtn-purple hover:to-dmtn-purple-light text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Confirmar Assinatura do Contrato
                </button>
                <button
                  onClick={handleBaixarPDF}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg transition-colors"
                >
                  Baixar PDF do Contrato
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
