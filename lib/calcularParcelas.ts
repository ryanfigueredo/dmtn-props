/**
 * Calcula o valor das parcelas considerando juros
 * Até 5x: sem juros
 * Acima de 5x: com juros da operadora (taxa média de ~2.99% ao mês)
 */

export interface ParcelaCalculada {
  numero: number
  valorParcela: number
  valorTotal: number
  temJuros: boolean
  taxaJuros?: number
}

export function calcularParcelas(
  valorTotal: number,
  numeroParcelas: number
): ParcelaCalculada {
  const TAXA_JUROS_MENSAL = 0.0299 // 2.99% ao mês (taxa média de maquininha)
  const PARCELAS_SEM_JUROS = 5

  if (numeroParcelas <= PARCELAS_SEM_JUROS) {
    // Sem juros
    const valorParcela = valorTotal / numeroParcelas
    return {
      numero: numeroParcelas,
      valorParcela,
      valorTotal,
      temJuros: false,
    }
  } else {
    // Com juros
    // Fórmula: PV = PMT * [(1 - (1 + i)^-n) / i]
    // Onde: PV = valor presente, PMT = valor da parcela, i = taxa, n = número de parcelas
    // Isolando PMT: PMT = PV * [i / (1 - (1 + i)^-n)]
    const taxa = TAXA_JUROS_MENSAL
    const denominador = 1 - Math.pow(1 + taxa, -numeroParcelas)
    const valorParcela = valorTotal * (taxa / denominador)
    const valorTotalComJuros = valorParcela * numeroParcelas

    return {
      numero: numeroParcelas,
      valorParcela,
      valorTotal: valorTotalComJuros,
      temJuros: true,
      taxaJuros: TAXA_JUROS_MENSAL * 100,
    }
  }
}

export function formatarParcela(parcela: ParcelaCalculada): string {
  const valorParcelaFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parcela.valorParcela)

  const valorTotalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parcela.valorTotal)

  if (parcela.temJuros) {
    return `${parcela.numero}x de ${valorParcelaFormatado} (Total: ${valorTotalFormatado} - com juros de ${parcela.taxaJuros?.toFixed(2)}% a.m.)`
  }

  return `${parcela.numero}x de ${valorParcelaFormatado} sem juros`
}

