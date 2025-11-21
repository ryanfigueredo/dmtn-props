import { DadosAssinatura } from './Contrato'
import { Proposta } from '@/types/proposta'
import { gerarPDFContrato } from '@/lib/gerarPDF'
import { calcularParcelas, formatarParcela } from '@/lib/calcularParcelas'

interface AssinaturaSucessoProps {
  dadosAssinatura: DadosAssinatura
  propostaId: string
  proposta: Proposta
  valorAtual: number
}

export default function AssinaturaSucesso({
  dadosAssinatura,
  propostaId,
  proposta,
  valorAtual,
}: AssinaturaSucessoProps) {
  const handleBaixarPDF = async () => {
    const gerarFormaPagamentoTexto = () => {
      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valorAtual)

      if (dadosAssinatura.formaPagamento === 'cartao') {
        if (dadosAssinatura.parcelas && dadosAssinatura.parcelas > 1) {
          const parcelaCalculada = calcularParcelas(valorAtual, dadosAssinatura.parcelas)
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
        return [`Valor total: ${valorFormatado}`, `Pagamento à vista no cartão de crédito`]
      }

      if (dadosAssinatura.formaPagamento === 'pix') {
        return [
          `Valor total: ${valorFormatado}`,
          `Pagamento via PIX antes do início do desenvolvimento`,
        ]
      }

      return [`Valor total: ${valorFormatado}`, `Pagamento via boleto bancário`]
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
        valorTotal: valorAtual,
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
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-green-600"
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
          Contrato Assinado com Sucesso!
        </h2>
        <p className="text-gray-600">
          Obrigado por confiar na DMTN. Seu projeto será iniciado em breve.
        </p>
      </div>

      <div className="bg-dmtn-purple-lighter rounded-lg p-6 mb-6 text-left">
        <h3 className="font-semibold text-dmtn-purple-dark mb-4">
          Detalhes da Assinatura:
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Assinado por:</span>{' '}
            {dadosAssinatura.tipoPessoa === 'PJ' && dadosAssinatura.razaoSocial
              ? dadosAssinatura.razaoSocial
              : dadosAssinatura.nome}
          </p>
          <p>
            <span className="font-semibold">
              {dadosAssinatura.tipoPessoa === 'PJ' ? 'CNPJ' : 'CPF'}:
            </span>{' '}
            {dadosAssinatura.tipoPessoa === 'PJ' && dadosAssinatura.cnpj
              ? dadosAssinatura.cnpj
              : dadosAssinatura.cpf}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {dadosAssinatura.email}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span> {dadosAssinatura.telefone}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span>{' '}
            {dadosAssinatura.endereco}, {dadosAssinatura.cidade} - {dadosAssinatura.estado}
          </p>
          <p>
            <span className="font-semibold">Forma de Pagamento:</span>{' '}
            {dadosAssinatura.formaPagamento === 'cartao'
              ? dadosAssinatura.parcelas && dadosAssinatura.parcelas > 1
                ? (() => {
                    const parcelaCalculada = calcularParcelas(
                      valorAtual,
                      dadosAssinatura.parcelas
                    )
                    return `Cartão de Crédito - ${formatarParcela(parcelaCalculada)}`
                  })()
                : 'Cartão de Crédito (à vista)'
              : dadosAssinatura.formaPagamento === 'pix'
              ? 'PIX'
              : 'Boleto'}
          </p>
          <p>
            <span className="font-semibold">Data da Assinatura:</span>{' '}
            {new Date(dadosAssinatura.dataAssinatura).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p>
            <span className="font-semibold">ID da Proposta:</span> {propostaId}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Próximos passos:</strong> Você receberá um email de confirmação com uma cópia
          do contrato assinado. Nossa equipe entrará em contato em breve para iniciar o
          desenvolvimento do seu projeto.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleBaixarPDF}
          className="bg-dmtn-purple hover:bg-dmtn-purple-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Baixar Contrato em PDF
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Imprimir Comprovante
        </button>
      </div>
    </div>
  )
}

