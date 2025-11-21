/**
 * Template padrão de contrato de prestação de serviços
 * Personalizável por cliente através de placeholders
 */

export interface DadosContrato {
  objeto: string
  funcionalidades: string[]
  tecnologias?: {
    frontend?: string[]
    backend?: string[]
    bancoDados?: string
    relatorios?: string[]
    autenticacao?: string
    hospedagem?: string
    integracoes?: string[]
  }
  prazo: string
  valorTotal: number
  formaPagamentoTexto?: string // Texto já formatado da forma de pagamento
  formaPagamento?: {
    tipo: 'parcelado' | 'etapas' | 'vista'
    parcelas?: number
    etapas?: Array<{ descricao: string; valor: number; quando: string }>
  }
  suporte: number // dias
}

export function gerarContratoPadrao(dados: DadosContrato): string {
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(dados.valorTotal)

  // A forma de pagamento será substituída dinamicamente no componente Contrato

  // Gerar texto de tecnologias
  const tecnologiasTexto = dados.tecnologias
    ? `
Parágrafo 2º. Para o desenvolvimento da plataforma digital, a CONTRATADA utilizará as tecnologias a seguir descritas: ${
        dados.tecnologias.frontend
          ? `Frontend: ${dados.tecnologias.frontend.join(', ')}; `
          : ''
      }${
        dados.tecnologias.backend
          ? `Backend: ${dados.tecnologias.backend.join(', ')}; `
          : ''
      }${
        dados.tecnologias.bancoDados
          ? `Banco de Dados: ${dados.tecnologias.bancoDados}; `
          : ''
      }${
        dados.tecnologias.relatorios
          ? `Relatórios: ${dados.tecnologias.relatorios.join(', ')}; `
          : ''
      }${
        dados.tecnologias.autenticacao
          ? `Autenticação: ${dados.tecnologias.autenticacao}; `
          : ''
      }${
        dados.tecnologias.hospedagem
          ? `Hospedagem: ${dados.tecnologias.hospedagem}; `
          : ''
      }${
        dados.tecnologias.integracoes
          ? `Integrações: ${dados.tecnologias.integracoes.join(', ')}.`
          : ''
      }`
    : ''

  // Gerar texto de funcionalidades
  const funcionalidadesTexto = dados.funcionalidades
    .map((func, index) => `${index + 1}) ${func}`)
    .join('; ')

  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE DESENVOLVIMENTO DE SOFTWARE

CONTRATANTE: [NOME DO CLIENTE]
CNPJ/CPF: [CNPJ/CPF]
ENDEREÇO: [ENDEREÇO COMPLETO]

CONTRATADO: DMTN DIGITAL TECNOLOGIA E SOLUCOES LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 59.171.428/0001-40, com endereço eletrônico contato@dmtn.com.br e telefone: +55 21 99762-4873, sediada na Rua Visconde de Pirajá, 414, sala 718, Ipanema, Rio de Janeiro - RJ, neste ato representada pelo seu sócio administrador RYAN D' OLIVEIRA LOPES FIGUEREDO, brasileiro, empresário, inscrito no CPF sob o nº 047.083.635-08.

Têm, entre si, justo e acertado o presente contrato de prestação de serviços celebrado em conformidade com a Lei nº 10.406/2002, mediante as seguintes cláusulas e condições:

I. DO OBJETO.

Cláusula 1ª. O presente Contrato tem por objeto ${dados.objeto}, conforme escopo definido pelas partes.

Parágrafo 1º. A plataforma digital será desenvolvida com foco em segurança, mediante a utilização de criptografia de dados sensíveis, conforme padrões bancários e LGPD, e autenticação de dois fatores (2FA), da seguinte forma: ${funcionalidadesTexto}.${tecnologiasTexto}

II. DA FORMA DE EXECUÇÃO DOS SERVIÇOS E PRAZOS.

Cláusula 2ª. A plataforma digital será desenvolvida pela CONTRATADA mediante as seguintes etapas: 1ª) Planejamento - definição do escopo detalhado, criação das primeiras telas (wireframes) no Figma e configuração de ambiente de desenvolvimento; 2ª) Desenvolvimento (MVP) - implementação das funcionalidades previstas na Cláusula 1ª e desenvolvimento de relatórios básicos; 3ª) Testes e Homologação - validação de segurança, correção de bugs e ajustes de UX; 4º) Entrega e treinamento.

Parágrafo 1º. As etapas de trabalho serão distribuídas e executadas durante o período de ${dados.prazo}, contados da assinatura do presente contrato, findo o qual a CONTRATADA procederá com a entrega final e treinamento básico da equipe da CONTRATANTE.

Parágrafo 2º. Durante a execução das etapas previstas nesta cláusula, a CONTRATANTE poderá ser demandada pela CONTRATADA, ocasião em que deverá fornecer informações, sugerir alterações e/ou aprovar os serviços no prazo de até 05 (cinco) dias da solicitação, sob pena de aceitação tácita.

Parágrafo 3º. As etapas previstas no caput somente serão concluídas após a respectiva aprovação pelo CONTRATANTE, ou caso ultrapassado o prazo definido no parágrafo anterior sem qualquer manifestação, de modo que eventual atraso, decorrente de culpa exclusiva da parte contratante, não poderá ser atribuído à CONTRATADA.

Parágrafo 4º. O prazo de conclusão dos serviços poderá sofrer alteração de acordo com a complexidade das alterações propostas pela CONTRATANTE ao fim de cada etapa.

Parágrafo 5º. A liberação de acesso ao produto desenvolvido somente será realizada após o pagamento dos valores previstos na Cláusula 3ª.

Parágrafo 6º. A CONTRATADA oferecerá o serviço de suporte, manutenção, correção e atualização básica, caso necessário, durante o período de ${dados.suporte} (${dados.suporte === 30 ? 'trinta' : dados.suporte === 60 ? 'sessenta' : dados.suporte === 90 ? 'noventa' : dados.suporte.toString()}) dias após a entrega final.

III. DO VALOR E FORMA DE PAGAMENTO.

Cláusula 3ª. A CONTRATANTE compromete-se a pagar à CONTRATADA o valor total de ${valorFormatado}, a ser efetuado da seguinte forma: [FORMA DE PAGAMENTO]

Parágrafo 1º. Os pagamentos serão efetuados pela CONTRATANTE mediante transferência via PIX, boleto bancário ou cartão de crédito, conforme dados fornecidos pela CONTRATADA nos respectivos vencimentos.

Parágrafo 2º. Na hipótese de atraso do pagamento por culpa exclusiva da CONTRATANTE, haverá a incidência de multa de 2% (dois por cento) sobre o valor da parcela inadimplida, juros moratórios de 1% (um por cento) ao mês, além de correção monetária, calculada sobre o índice IPCA-E, até a data do efetivo pagamento.

Parágrafo 3º. O atraso no pagamento de qualquer das parcelas pela CONTRATANTE autoriza a suspensão da execução dos serviços pela CONTRATADA, até a regularização da inadimplência, não se podendo atribuir à CONTRATADA a responsabilidade pelo atraso na entrega do projeto final.

Parágrafo 4º. O projeto final somente será entregue à CONTRATANTE após a quitação integral dos valores previstos neste contrato, podendo a parte CONTRATADA suspender o acesso da parte CONTRATANTE ao sistema desenvolvido até a regularização da inadimplência.

Parágrafo 5º. Eventuais alterações no escopo do projeto, ou alterações de maior complexidade, deverão ser formalizadas por escrito, e poderão implicar ajustes no valor e prazo do contrato, mediante assinatura das partes em termo aditivo contratual.

Parágrafo 6º. Havendo interesse da CONTRATANTE na continuidade dos serviços de suporte pela CONTRATADA, as partes deverão ajustar novo contrato.

Cláusula 4ª. Em caso de atraso na entrega do sistema, por culpa exclusiva da CONTRATADA, será aplicada multa de 0,5% (meio por cento) do valor total do contrato por dia de atraso, limitada a 10% (dez por cento) do valor total.

IV. DAS OBRIGAÇÕES DAS PARTES.

Cláusula 5ª. A CONTRATANTE obriga-se a: I - Fornecer todas as informações, documentos e dados necessários para o desenvolvimento do produto ora contratado, com clareza, precisão e agilidade, sob pena de responsabilizar-se pelas consequências advindas da inobservância desta cláusula; II - Designar um responsável para acompanhar a execução do projeto, fornecer informações, documentos e dados, tomar decisões e aprovar o produto, quando necessário; III - Fornecer as informações, documentos e dados, quando solicitado pela CONTRATADA, no prazo de até 05 (cinco) dias após a solicitação; IV - Efetuar os pagamentos devidos à CONTRATADA na forma e nas datas ajustadas; V - Comunicar imediatamente à CONTRATADA, por escrito ou por e-mail, a ocorrência de qualquer falha ou mau funcionamento, especificando o tipo de defeito, e fornecer todos os dados e informações necessárias ao seu saneamento;

Cláusula 6ª. A CONTRATADA obriga-se a: I - Executar fielmente os serviços, dentro da boa técnica, dos padrões usuais e do prazo acordado; II - Desenvolver a plataforma digital ora contratada em conformidade com o objeto deste contrato, escopo e cronograma previamente aprovados pela CONTRATANTE; III - Fornecer treinamento básico para a equipe do CONTRATANTE após a entrega do sistema; IV - Prestar o devido suporte técnico durante ${dados.suporte} (${dados.suporte === 30 ? 'trinta' : dados.suporte === 60 ? 'sessenta' : dados.suporte === 90 ? 'noventa' : dados.suporte.toString()}) dias após a entrega do sistema; V - Corrigir erros no prazo de até 05 (cinco) dias úteis após a comunicação de eventual falha e/ou mau funcionamento do sistema, durante o período de teste; VI - Manter sigilo sobre todas as informações e dados fornecidos pela CONTRATANTE.

V. DOS DIREITOS AUTORAIS.

Cláusula 7ª. Os direitos autorais relativos ao sistema desenvolvido pertencem exclusivamente à CONTRATADA, com exceção dos dados, informações e documentos pertencentes exclusivamente à CONTRATANTE, sem que à esta caiba qualquer direito neste sentido.

VI. DA CONFIDENCIALIDADE.

Cláusula 8ª. As partes obrigam-se a manter o sigilo de todas as informações, dados e documentos compartilhados durante a execução do objeto deste contrato, sendo vedada a sua divulgação a terceiros, salvo nos casos expressos em lei ou mediante autorização por escrito.

VII. DAS DESPESAS.

Cláusula 9ª. As despesas atinentes à execução dos serviços ora contratados, mormente aquelas relativas à hospedagem do sistema, serão suportadas pela CONTRATANTE.

VIII. DO DESCUMPRIMENTO E RESCISÃO DO CONTRATO.

Cláusula 10. O presente contrato poderá ser rescindido por extinção de qualquer das partes, decretação de concordata ou falência, escoamento do prazo, conclusão do objeto, inadimplemento, impossibilidade da continuação do contrato por motivo de força maior ou pela rescisão por iniciativa de uma das partes, mediante notificação por escrito com antecedência de 30 dias.

Parágrafo 1º. Na hipótese de rescisão do contrato após o início da execução dos serviços, por iniciativa da parte CONTRATANTE, sem justo motivo, haverá a incidência de multa no percentual de 20% (vinte por cento) sobre o valor do contrato.

Parágrafo 2º. Na hipótese de rescisão do contrato, por iniciativa da parte CONTRATANTE, sem justo motivo, fica a CONTRATADA autorizada a reter integralmente os valores pagos pela CONTRATANTE, sem direito à devolução.

Parágrafo 3º. O inadimplemento por qualquer das partes autoriza a suspensão das obrigações contratuais da parte prejudicada até a regularização da situação de inadimplência, além da imediata execução do título executivo, independente de notificação ou interpelação judicial ou extrajudicial, cujas custas, despesas processuais e honorários advocatícios incumbirão à parte que deu causa à ação.

IX. DAS DISPOSIÇÕES GERAIS.

Cláusula 11. A CONTRATADA poderá transferir ou delegar as atribuições e responsabilidades que assume por força deste contrato a terceiros sob sua responsabilidade.

Cláusula 12. Os signatários do presente contrato asseguram e afirmam que são os representantes legais competentes para assumir em nome das partes as obrigações descritas neste contrato e representar de forma efetiva seus interesses.

Cláusula 13. Qualquer omissão ou tolerância das partes em exigir o fiel cumprimento dos termos e condições deste contrato, ou no exercício de prerrogativas dele decorrentes, não constituirá renúncia, novação, nem afetará, de qualquer forma, o direito da parte tolerante exercê-las a qualquer tempo.

Cláusula 14. Na hipótese de qualquer disposição ou parte de qualquer disposição deste contrato ser considerada nula, anulável ou inexequível, essa disposição será tida como suprimida sem que sejam invalidadas as demais disposições deste contrato.

Cláusula 15. O presente instrumento não cria vínculo empregatício, nem gera direitos trabalhistas de qualquer natureza.

Cláusula 16. Todas as comunicações e notificações decorrentes deste Contrato serão realizadas entre as Partes ou seus representantes, por qualquer meio escrito e eletrônico, no horário comercial, compreendido de segunda a sexta-feira, das 08:00h às 18:00h.

Cláusula 17. A Lei Geral de Proteção de Dados ("LGPD") dispõe que quaisquer dados de terceiros e/ou informações pessoais que possam ser obtidas ou utilizadas por qualquer das partes em decorrência do presente Contrato ("Dados") serão recolhidos, utilizados, armazenados e mantidos de acordo com os padrões geralmente aceitos para coleta de dados, pela legislação aplicável, qual seja a Lei 13.709/2018.

X. DO FORO.

Cláusula 18. Elegem as partes o foro da Comarca da CONTRATANTE, para conhecer e dirimir quaisquer dúvidas ou discussões oriundas deste contrato, com renúncia a qualquer outro, por mais especial e privilegiado que seja.

E, por estarem justos e contratados lavram o presente contrato, em duas vias de igual teor e forma, que assinam abaixo, para as finalidades de direito.

Rio de Janeiro/RJ, [DATA].

____________________________________________
[NOME DO CLIENTE]
CNPJ/CPF: [CNPJ/CPF]
Representado por [NOME REPRESENTANTE]
Contratante

____________________________________________
DMTN DIGITAL TECNOLOGIA E SOLUCOES LTDA
CNPJ nº 59.171.428/0001-40
Representado por RYAN D' OLIVEIRA LOPES FIGUEREDO
Contratada`
}

