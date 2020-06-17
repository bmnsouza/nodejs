const moment = require('moment')

const FORMATO = {
  DD_MM_YYYY: 'DD/MM/YYYY',
  DDMMYYY: 'DDMMYYYY',
  MM: 'MM',
  YYYY: 'YYYY',
  YYYY_MM_DD: 'YYYY-MM-DD'
}

const UNIDADE = {
  ANOS: 'y',
  TRIMETRES: 'Q',
  MESES: 'M',
  SEMANAS: 'w',
  DIAS: 'd',
  HORAS: 'h',
  MINUTOS: 'm',
  SEGUNDOS: 's',
  MILISSEGUNDOS: 'ms'
}

const descricaoUnidade = unidade => {
  return (unidade == UNIDADE.ANOS) ? 'ano(s)' :
    (unidade == UNIDADE.TRIMETRES) ? 'trimestre(s)' :
      (unidade == UNIDADE.MESES) ? 'mese(s)' :
        (unidade == UNIDADE.SEMANAS) ? 'semana(s)' :
          (unidade == UNIDADE.DIAS) ? 'dia(s)' :
            (unidade == UNIDADE.HORAS) ? 'hora(s)' :
              (unidade == UNIDADE.MINUTOS) ? 'minuto(s)' :
                (unidade == UNIDADE.SEGUNDOS) ? 'segundo(s)' :
                  'milissegundo(s)'
}

const isDataValida = data => {
  if (!criaMoment(data).isValid()) {
    throw new Error(`Data ${data} é inválida, deve ser informada no formato ${FORMATO.DD_MM_YYYY}`)
  }
  return true
}

const isDataIgualOuAntes = (dataAntes, dataIgual) => {
  if (!criaMoment(dataAntes).isSameOrBefore(criaMoment(dataIgual))) {
    throw new Error(`Data ${dataAntes} deve ser igual ou antes de ${dataIgual}`)
  }
  return true
}

const isDataIgualOuDepois = (dataDepois, dataIgual) => {
  if (!criaMoment(dataDepois).isSameOrAfter(criaMoment(dataIgual))) {
    throw new Error(`Data ${dataDepois} deve ser igual ou depois de ${dataIgual}`)
  }
  return true
}

const isDiferencaMaior = (dataFinal, dataInicial, quantidade, unidade) => {
  if (diferenca(dataFinal, dataInicial, unidade) <= quantidade) {
    throw new Error(`Diferença entre data ${dataInicial} e ${dataFinal} deve ser maior que ${quantidade} ${descricaoUnidade(unidade)}`)
  }
  return true
}

const isDiferencaMenor = (dataFinal, dataInicial, quantidade, unidade) => {
  if (diferenca(dataFinal, dataInicial, unidade) >= quantidade) {
    throw new Error(`Diferença entre data ${dataInicial} e ${dataFinal} deve ser menor que ${quantidade} ${descricaoUnidade(unidade)}`)
  }
  return true
}

const isAnoValido = ano => {
  if (!moment(ano, FORMATO.YYYY, true).isValid()) {
    throw new Error(`Ano ${ano} é inválido, deve ser informado no formato ${FORMATO.YYYY}`)
  }
  return true
}

const isMesValido = mes => {
  if (!moment(mes, FORMATO.MM, true).isValid()) {
    throw new Error(`Mês ${mes} é inválido, deve ser informado no formato ${FORMATO.MM}`)
  }
  return true
}

const criaMoment = data => {
  return moment(data, FORMATO.DD_MM_YYYY, true)
}

const diferenca = (dataFinal, dataInicial, unidade) => {
  return criaMoment(dataFinal).diff(criaMoment(dataInicial), unidade, true)
}

module.exports = {
  FORMATO,
  UNIDADE,
  isDataValida,
  isDataIgualOuAntes,
  isDataIgualOuDepois,
  isDiferencaMaior,
  isDiferencaMenor,
  isAnoValido,
  isMesValido
}