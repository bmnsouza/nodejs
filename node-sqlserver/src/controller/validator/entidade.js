const body = require('./express/body')
const param = require('./express/param')
const dados = require('./validate/dados')

module.exports = {

  // Entidade
  busca: () => param.isCnpjValido('cnpj'),

  alteraEstado: () => [
    body.isCnpjValido('cnpj'),
    body.isCpfValido('responsavel'),
    body.isStringIsLengthMinMax('justificativa', 10, 255),
    body.isStringIsIn('estado', dados.ESTADO_CONTA)
  ],

  altera: () => [
    body.isCnpjValido('cnpj'),
    body.isStringIsLengthMinMax('razao', 10, 150),
    body.isStringIsLengthMinMax('nomerepresentantelegal', 5, 70),
    body.isCpfValido('cpfrepresentantelegal'),
    body.isStringIsLengthMinMax('logradouro', 5, 60),
    body.isNumeroValido('numero'),
    body.isStringIsLengthMax('complemento', 50),
    body.isStringIsLengthMinMax('bairro', 5, 50),
    body.isStringIsIn('uf', dados.UF),
    body.isStringIsLengthMinMax('municipio', 5, 50),
    body.isCepValido('cep', 'uf'),
    body.isEmailValido('email', 150),
    body.isStringIsNumericIsLength('ddd1', 2),
    body.isStringIsNumericIsLengthMinMax('tel1', 8, 9),
    body.isStringIsNumericIsLengthMax('ramal1', 4),
    body.isCpfValido('resp'),
    body.isStringIsLengthMinMax('justificativa', 10, 255)
  ],

  cadastra: () => [
    body.isCnpjValido('cnpj'),
    body.isStringIsLengthMinMax('razao', 10, 150),
    body.isStringIsLengthMinMax('nomerepresentantelegal', 5, 70),
    body.isCpfValido('cpfrepresentantelegal'),
    body.isStringIsLengthMinMax('logradouro', 5, 60),
    body.isNumeroValido('numero'),
    body.isStringIsLengthMax('complemento', 50),
    body.isStringIsLengthMinMax('bairro', 5, 50),
    body.isStringIsIn('uf', dados.UF),
    body.isStringIsLengthMinMax('municipio', 5, 50),
    body.isCepValido('cep', 'uf'),
    body.isEmailValido('email', 150),
    body.isStringIsNumericIsLength('ddd1', 2),
    body.isStringIsNumericIsLengthMinMax('tel1', 8, 9),
    body.isStringIsNumericIsLengthMax('ramal1', 4),
    body.isStringIsLengthMax('frase', 128),
    body.isStringIsLengthMax('fraseemail', 128),
    body.isCpfValido('resp'),
    body.isStringIsLengthMinMax('senha', 6, 60),
    body.isConfirmaSenhaValida('senha', 'confirmaSenha')
  ]

}