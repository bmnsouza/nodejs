const body = require('./express/body')
const param = require('./express/param')

module.exports = {

  // Fazendario
  busca: () => param.isCpfValido('login'),

  altera: () => [
    body.isCpfValido('login'),
    body.notIsStringIsNumericIsLengthMinMax('codPerfil', 1, 9),
    body.isBoolean('flUsuario'),
    body.isCpfValido('loginResp')
  ],

  buscaPortalLogin: () => param.isCpfValido('login'),

  buscaPortalNome: () => param.isStringIsLengthMinMax('nome', 5, 70),

  cadastra: () => [
    body.isCpfValido('login'),
    body.isStringIsLengthMinMax('nome', 5, 70),
    body.notIsStringIsNumericIsLengthMinMax('codPerfil', 1, 9),
    body.isCpfValido('loginResp')
  ]

}