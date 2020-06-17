const body = require('./express/body')
const param = require('./express/param')
const dados = require('./validate/dados')

module.exports = {

  // Procon
  busca: () => param.isCpfValido('cpf'),

  alteraSituacao: () => [
    body.isCpfValido('cpf'),
    body.isCpfValido('resp'),
    body.isStringIsIn('situacao', dados.SITUACAO_PROCON)
  ],

  cadastra: () => [
    body.isCpfValido('cpf'),
    body.isStringIsLengthMinMax('senha', 6, 60),
    body.isStringIsLengthMinMax('nome', 5, 60),
    body.isEmailValido('email', 60),
    body.isCpfValido('resp')
  ]

}