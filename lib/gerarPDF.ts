import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export interface DadosContratoPDF {
  dadosCliente: {
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
  }
  dadosProjeto: {
    nome: string
    descricao: string
    prazo: string
  }
  dadosPagamento: {
    valorTotal: number
    formaPagamento: string
    parcelas?: number
    valorParcela?: number
    formaPagamentoDetalhada: string[]
  }
  dadosContratado: {
    nome: string
    cnpj: string
    endereco: string
    email?: string
    telefone?: string
    representante?: {
      nome: string
      cpf: string
      cargo: string
    }
  }
  dataAssinatura: string
  local: string
}

export async function gerarPDFContrato(dados: DadosContratoPDF): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  // Função para adicionar nova página se necessário
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  // Título
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE DESENVOLVIMENTO DE SOFTWARE', pageWidth / 2, yPosition, {
    align: 'center',
  })
  yPosition += 10

  // Dados do Contratante
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('CONTRATANTE:', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const contratanteLines = [
    dados.dadosCliente.tipoPessoa === 'PJ' ? `Razão Social: ${dados.dadosCliente.razaoSocial}` : `Nome: ${dados.dadosCliente.nome}`,
    dados.dadosCliente.tipoPessoa === 'PJ' ? `CNPJ: ${dados.dadosCliente.cnpj}` : `CPF: ${dados.dadosCliente.cpf}`,
    `Email: ${dados.dadosCliente.email}`,
    `Telefone: ${dados.dadosCliente.telefone}`,
    `Endereço: ${dados.dadosCliente.endereco}`,
    `${dados.dadosCliente.cidade} - ${dados.dadosCliente.estado}, CEP: ${dados.dadosCliente.cep}`,
  ]

  contratanteLines.forEach((line) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Dados do Contratado
  checkNewPage(20)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CONTRATADO:', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const contratadoLines = [
    `Nome: ${dados.dadosContratado.nome}`,
    `CNPJ: ${dados.dadosContratado.cnpj}`,
    `Endereço: ${dados.dadosContratado.endereco}`,
    dados.dadosContratado.email ? `Email: ${dados.dadosContratado.email}` : '',
    dados.dadosContratado.telefone ? `Telefone: ${dados.dadosContratado.telefone}` : '',
    dados.dadosContratado.representante
      ? `Representante: ${dados.dadosContratado.representante.nome}, CPF: ${dados.dadosContratado.representante.cpf}, ${dados.dadosContratado.representante.cargo}`
      : '',
  ].filter(Boolean)

  contratadoLines.forEach((line) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Objeto do Contrato
  checkNewPage(30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 1 - DO OBJETO', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const objetoText = `O presente contrato tem por objeto a prestação de serviços de desenvolvimento de software, especificamente: ${dados.dadosProjeto.nome}. ${dados.dadosProjeto.descricao}`
  const objetoLines = doc.splitTextToSize(objetoText, pageWidth - 2 * margin)
  objetoLines.forEach((line: string) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Prazo
  checkNewPage(15)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 2 - DO PRAZO', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const prazoText = `O prazo para desenvolvimento e entrega do software é de ${dados.dadosProjeto.prazo}, contados a partir da assinatura do contrato e pagamento da primeira parcela.`
  const prazoLines = doc.splitTextToSize(prazoText, pageWidth - 2 * margin)
  prazoLines.forEach((line: string) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Valor e Forma de Pagamento
  checkNewPage(40)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 3 - DO VALOR E FORMA DE PAGAMENTO', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(dados.dadosPagamento.valorTotal)

  doc.setFont('helvetica', 'bold')
  doc.text(`Valor Total: ${valorFormatado}`, margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.text('Forma de Pagamento:', margin, yPosition)
  yPosition += 7

  dados.dadosPagamento.formaPagamentoDetalhada.forEach((pagamento) => {
    checkNewPage(7)
    doc.text(`• ${pagamento}`, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Obrigações do Contratado
  checkNewPage(30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 4 - DAS OBRIGAÇÕES DO CONTRATADO', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const obrigacoesContratado = [
    'Desenvolver o software conforme especificações acordadas',
    'Fornecer documentação técnica do sistema',
    'Prestar suporte técnico pelo período acordado',
    'Garantir a segurança dos dados do cliente',
  ]

  obrigacoesContratado.forEach((obrigacao) => {
    checkNewPage(7)
    doc.text(`• ${obrigacao}`, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Obrigações do Contratante
  checkNewPage(30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 5 - DAS OBRIGAÇÕES DO CONTRATANTE', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const obrigacoesContratante = [
    'Fornecer todas as informações necessárias para o desenvolvimento',
    'Realizar os pagamentos conforme acordado',
    'Testar e aprovar as funcionalidades desenvolvidas',
    'Fornecer feedback em tempo hábil',
  ]

  obrigacoesContratante.forEach((obrigacao) => {
    checkNewPage(7)
    doc.text(`• ${obrigacao}`, margin + 5, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Propriedade Intelectual
  checkNewPage(20)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('CLÁUSULA 6 - DA PROPRIEDADE INTELECTUAL', margin, yPosition)
  yPosition += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const propriedadeText =
    'O software desenvolvido será de propriedade do CONTRATANTE após o pagamento integral do projeto.'
  const propriedadeLines = doc.splitTextToSize(propriedadeText, pageWidth - 2 * margin)
  propriedadeLines.forEach((line: string) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Assinaturas
  checkNewPage(40)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('ASSINATURAS', margin, yPosition)
  yPosition += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const assinaturaText = `E, por estarem assim justos e acordados, as partes assinam o presente contrato em ${dados.local}, aos ${new Date(dados.dataAssinatura).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}.`
  const assinaturaLines = doc.splitTextToSize(assinaturaText, pageWidth - 2 * margin)
  assinaturaLines.forEach((line: string) => {
    checkNewPage(7)
    doc.text(line, margin, yPosition)
    yPosition += 7
  })

  yPosition += 15

  // Espaço para assinaturas
  checkNewPage(30)
  const signatureY = yPosition
  doc.line(margin, signatureY, margin + 80, signatureY)
  doc.text('CONTRATANTE', margin + 40, signatureY + 5, { align: 'center' })
  doc.text(dados.dadosCliente.nome, margin + 40, signatureY + 10, { align: 'center' })

  doc.line(pageWidth - margin - 80, signatureY, pageWidth - margin, signatureY)
  doc.text('CONTRATADO', pageWidth - margin - 40, signatureY + 5, { align: 'center' })
  const nomeContratado = dados.dadosContratado.representante
    ? `${dados.dadosContratado.nome}\n${dados.dadosContratado.representante.nome}`
    : dados.dadosContratado.nome
  const nomeContratadoLines = doc.splitTextToSize(nomeContratado, 80)
  nomeContratadoLines.forEach((line: string, index: number) => {
    doc.text(line, pageWidth - margin - 40, signatureY + 10 + index * 5, {
      align: 'center',
    })
  })

  // Salvar PDF
  const nomeArquivo = `Contrato_${dados.dadosCliente.nome.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`
  doc.save(nomeArquivo)
}

