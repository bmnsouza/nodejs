const body = require('./express/body')
const param = require('./express/param')
const query = require('./express/query')

module.exports = {

  // Solicitação de Resgate
  obtemRelatorioAnterior: () => query.isDataValida('dtRelatAnterior'),



  // Resgates Solicitados
  buscaTransferencias: () => [
    body.isCpfValido('cpf', false),
    body.isStringIsLengthMinMax('nome', 5, 60),
    body.isDataValida('dataResgate', false),
    body.isDataValida('dataRelatorio', false)
  ],



  // Bloqueio Resgate
  cadastraBloqueio: () => [
    body.isDataValida('dtInicioBloqueio'),
    body.isStringIsLengthMinMax('msgBloqueio', 10, 300)
  ],



  // Conta Inválida
  buscaTransferencia: () => param.isCpfValido('cpf'),

  marcaTransferenciaInvalida: () => param.isStringIsNumericIsLengthMinMax('codmov', 1, 19)

}