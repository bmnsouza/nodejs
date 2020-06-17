const body = require('./express/body')
const param = require('./express/param')
const dados = require('./validate/dados')

module.exports = {

  // Empresas Omissas
  buscaOmissoes: () => [
    body.isCnpjValido('CNPJ', false),
    body.isIeValida('IE', false),
    body.isIeOrCnpjInformado('IE', 'CNPJ'),
    body.isMesValido('mes', false),
    body.isAnoValido('ano', false),
    body.isRbaValida('RBAde'),
    body.isRbaValida('RBAate'),
    body.isStringIsIn('filtro', dados.FILTRO)
  ],



  // Excluir Omissão
  listaOmissoes: () => param.isIeOrCnpjValido('IECNPJ'),

  excluiOmissao: () => [
    body.isIeValida('IE'),
    body.isCnpjValido('CNPJ'),
    body.isAnoValido('ano'),
    body.isMesValido('mes'),
    body.isCpfValido('login'),
    body.isStringIsNumericIsLength('protocolo', 16)
  ]

}