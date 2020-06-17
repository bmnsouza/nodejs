const body = require('./express/body')
const dados = require('./validate/dados')
const data = require('./validate/data')

module.exports = {

  // Documentos Fiscais
  consulta: () => [
    body.isCnpjValido('CNPJ_emit'),
    body.isCpfValido('CNPJ_dest'),
    body.isStringIsIn('mod', dados.MOD),
    body.isDataValidaIgualOuAntes('dataIni', 'dataFim'),
    body.isDataValidaDiferencaMenor('dataFim', 'dataIni', 6, data.UNIDADE.MESES)
  ]

}