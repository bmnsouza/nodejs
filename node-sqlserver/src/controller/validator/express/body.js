const { body } = require('express-validator')
const mensagem = require('../validate/mensagem')
const dados = require('../validate/dados')
const data = require('../validate/data')

module.exports = {

  isAnoValido: (ano, obrigatorio = true) => {
    return [
      body(ano)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(ano)
        .optional({ checkFalsy: obrigatorio })
        .if(body(ano).notEmpty())
        .custom(ano => data.isAnoValido(ano)),

      body(ano)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(ano).isEmpty())
        .custom(ano => data.isAnoValido(ano))
    ]
  },

  isArrayMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isArray({ min, max }).withMessage(mensagem.isArrayMinMax(min, max))
  },

  isBoolean: campo => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isBoolean().withMessage(mensagem.isIn([0, 1, false, true]))
  },

  isCepValido: (cep, uf) => {
    return body(cep)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min: 8, max: 8 }).withMessage(mensagem.isLength(8))
      .custom((cep, { req }) => dados.isCepValido(cep, req.body[uf]))
  },

  isCnpjValido: (cnpj, obrigatorio = true) => {
    return [
      body(cnpj)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(cnpj)
        .optional({ checkFalsy: obrigatorio })
        .if(body(cnpj).notEmpty())
        .isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 14, max: 14 }).withMessage(mensagem.isLength(14))
        .custom(cnpj => dados.isCnpjValido(cnpj)),

      body(cnpj)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(cnpj).isEmpty())
        .isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 14, max: 14 }).withMessage(mensagem.isLength(14))
        .custom(cnpj => dados.isCnpjValido(cnpj))
    ]
  },

  isConfirmaSenhaValida: (senha, confirmaSenha) => {
    return body(confirmaSenha)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isLength({ min: 6, max: 60 }).withMessage(mensagem.isLengthMinMax(6, 60))
      .custom((confirmaSenha, { req }) => dados.isConfirmaSenhaValida(req.body[senha], confirmaSenha))
  },

  isCpfValido: (cpf, obrigatorio = true) => {
    return [
      body(cpf)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(cpf)
        .optional({ checkFalsy: obrigatorio })
        .if(body(cpf).notEmpty())
        .isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 11, max: 11 }).withMessage(mensagem.isLength(11))
        .custom(cpf => dados.isCpfValido(cpf)),

      body(cpf)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(cpf).isEmpty())
        .isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 11, max: 11 }).withMessage(mensagem.isLength(11))
        .custom(cpf => dados.isCpfValido(cpf))
    ]
  },

  isDataValida: (campo, obrigatorio = true) => {
    return [
      body(campo)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(campo)
        .optional({ checkFalsy: obrigatorio })
        .if(body(campo).notEmpty())
        .custom(campo => data.isDataValida(campo)),

      body(campo)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(campo).isEmpty())
        .custom(campo => data.isDataValida(campo))
    ]
  },

  isDataValidaDiferencaMenor: (dataFinal, dataInicial, quantidade, unidade) => {
    return body(dataFinal)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .custom((dataFinal, { req }) => data.isDataValida(dataFinal) &&
        data.isDiferencaMenor(dataFinal, req.body[dataInicial], quantidade, unidade))
  },

  isDataValidaIgualOuAntes: (dataAntes, dataIgual) => {
    return body(dataAntes)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .custom((dataAntes, { req }) => data.isDataValida(dataAntes) &&
        data.isDataIgualOuAntes(dataAntes, req.body[dataIgual]))
  },

  isDataValidaIgualOuDepois: (dataDepois, dataIgual) => {
    return body(dataDepois)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .custom((dataDepois, { req }) => data.isDataValida(dataDepois) &&
        data.isDataIgualOuDepois(dataDepois, req.body[dataIgual]))
  },

  isEmailValido: (email, max) => {
    return body(email)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isEmail().withMessage(mensagem.isEmail)
      .isLength({ max }).withMessage(mensagem.isLengthMax(max))
  },

  isIeOrCnpjInformado: (ie, cnpj) => {
    return body(ie)
      .if(body(ie).isEmpty())
      .if(body(cnpj).isEmpty())
      .notEmpty().withMessage(mensagem.informaCampos(dados.CAMPOS_EMPRESA))
  },

  isIeValida: (ie, obrigatorio = true) => {
    return [
      body(ie)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(ie)
        .optional({ checkFalsy: obrigatorio })
        .if(body(ie).notEmpty()).isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 9, max: 9 }).withMessage(mensagem.isLength(9)),

      body(ie)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(ie).isEmpty()).isNumeric().withMessage(mensagem.isNumeric())
        .isLength({ min: 9, max: 9 }).withMessage(mensagem.isLength(9))
    ]
  },

  isMesValido: (mes, obrigatorio = true) => {
    return [
      body(mes)
        .exists().withMessage(mensagem.exists())
        .isString().withMessage(mensagem.isString()),

      body(mes)
        .optional({ checkFalsy: obrigatorio })
        .if(body(mes).notEmpty())
        .custom(mes => data.isMesValido(mes)),

      body(mes)
        .optional({ checkFalsy: !obrigatorio })
        .if(body(mes).isEmpty())
        .custom(mes => data.isMesValido(mes))
    ]
  },

  isNumericIsFloatMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isFloat({ min, max }).withMessage(mensagem.isFloatMinMax(min, max))
  },

  isNumericIsIntMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isInt({ min, max }).withMessage(mensagem.isIntMinMax(min, max))
  },

  isNumeroValido: numero => {
    return body(numero)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .if(body(numero).not().equals(dados.SEM_NUMERO))
      .isNumeric().withMessage(mensagem.isNumericOr(dados.SEM_NUMERO))
      .isLength({ min: 1, max: 6 }).withMessage(mensagem.isLengthMinMax(1, 6))
  },

  isRbaValida: rba => {
    return body(rba)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .if(body(rba).notEmpty())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isFloat({ max: 99999999999999.99 }).withMessage(mensagem.isFloatMax(99999999999999.99))
  },

  isStringIsIn: (campo, valores) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isIn(valores).withMessage(mensagem.isIn(valores))
  },

  isStringIsLengthMax: (campo, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isLength({ max }).withMessage(mensagem.isLengthMax(max))
  },

  isStringIsLengthMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  },

  isStringIsNumericIsLength: (campo, length) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min: length, max: length }).withMessage(mensagem.isLength(length))
  },

  isStringIsNumericIsLengthMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  },

  isStringIsNumericIsLengthMax: (campo, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .if(body(campo).notEmpty()).isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ max }).withMessage(mensagem.isLengthMax(max))
  },

  notIsStringIsNumericIsLengthMinMax: (campo, min, max) => {
    return body(campo)
      .exists().withMessage(mensagem.exists())
      .not().isString().withMessage(mensagem.notIsString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  }

}