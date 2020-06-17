const body = require('./express/body')
const param = require('./express/param')
const dados = require('./validate/dados')
const data = require('./validate/data')

module.exports = {

  // Listar Sorteio
  consulta: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),

  consultaPremios: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),

  cadastra: () => [
    body.notIsStringIsNumericIsLengthMinMax('codSorteio', 1, 9),
    body.isDataValidaIgualOuAntes('dtInicio', 'dtFim'),
    body.isDataValidaDiferencaMenor('dtFim', 'dtInicio', 1, data.UNIDADE.ANOS),
    body.isDataValidaIgualOuDepois('dtRealizacao', 'dtFim'),
    body.isStringIsLengthMax('dscObservacao', 255),
    body.isArrayMinMax('premios', 1, 10),
    body.isNumericIsFloatMinMax('premios.*.valPremio', 0.01, 99999999999999.99),
    body.isNumericIsIntMinMax('premios.*.qtdPremio', 1, 999999),
    body.isStringIsIn('premios.*.tpPremio', dados.TP_PREMIO)
  ],

  totalBilhetes: () => [
    body.isDataValidaIgualOuAntes('dtInicio', 'dtFim'),
    body.isDataValidaDiferencaMenor('dtFim', 'dtInicio', 1, data.UNIDADE.ANOS)
  ],

  geraBilhetes: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),

  bilhetesPremiados: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),

  transferePremios: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),



  // Relatório Premiação
  relatorioPremiacao: () => [
    body.notIsStringIsNumericIsLengthMinMax('codSorteio', 1, 9),
    body.isStringIsIn('tpPremio', dados.TP_PREMIO)
  ],



  // Relatório Entidades
  entidadeIndicacao: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),

  entidadeBilhete: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),



  // Relatório Consumidor Bilhete
  consumidorBilhete: () => param.isNumericIsLengthMinMax('codSorteio', 1, 9),
  
}