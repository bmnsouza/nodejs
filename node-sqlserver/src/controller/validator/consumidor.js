const body = require('./express/body')
const param = require('./express/param')
const dados = require('./validate/dados')

module.exports = {

  // Dados do Consumidor
  buscaPorCPF: () => [
    body.isCpfValido('numero'),
    body.isStringIsIn('estado', dados.ESTADO_CONSUMIDOR)
  ],

  buscaPorNome: () => [
    body.isStringIsLengthMinMax('nome', 5, 60),
    body.isStringIsIn('estado', dados.ESTADO_CONSUMIDOR)
  ],

  buscaPorId: () => param.isStringIsNumericIsLengthMinMax('idcpf', 1, 19),

  alteraEstado: () => [
    body.isCpfValido('cpf'),
    body.isCpfValido('responsavel'),
    body.isStringIsLengthMinMax('justificativa', 10, 255),
    body.isStringIsIn('estado', dados.ESTADO_CONTA)
  ],

  altera: () => [
    body.isCpfValido('cpf'),
    body.isStringIsLengthMinMax('nome', 5, 60),
    body.isStringIsLengthMinMax('logradouro', 5, 40),
    body.isNumeroValido('numero'),
    body.isStringIsLengthMax('complemento', 21),
    body.isStringIsLengthMinMax('bairro', 5, 20),
    body.isCepValido('cep', 'uf'),
    body.isStringIsIn('uf', dados.UF),
    body.isStringIsLengthMinMax('municipio', 5, 50),
    body.isStringIsNumericIsLength('ddd', 2),
    body.isStringIsNumericIsLengthMinMax('fone', 8, 9),
    body.isEmailValido('email', 150),
    body.isCpfValido('resp'),
    body.isStringIsLengthMinMax('justificativa', 10, 255)
  ],



  // Créditos do Consumidor
  obtemConta: () => param.isCpfValido('strCNPJCPF'),

  obtemExtrato: () => param.isStringIsNumericIsLengthMinMax('codContaCorrente', 1, 19),

  obtemSaldo: () => param.isStringIsNumericIsLengthMinMax('pkConta', 1, 19),

  bloqueioContaCorrente: () => [
    body.isCpfValido('cpf'),
    body.isCpfValido('resp'),
    body.isStringIsLengthMinMax('justificativa', 10, 255),
    body.isStringIsIn('contaBloqueada', dados.BLOQUEIO_CONTA)
  ]

}