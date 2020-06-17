const { param } = require('express-validator')
const mensagem = require('../validate/mensagem')
const dados = require('../validate/dados')

module.exports = {

  isCpfValido: cpf => {
    return param(cpf)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min: 11, max: 11 }).withMessage(mensagem.isLength(11))
      .custom(cpf => dados.isCpfValido(cpf))
  },

  isCnpjValido: cnpj => {
    return param(cnpj)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min: 14, max: 14 }).withMessage(mensagem.isLength(14))
      .custom(cnpj => dados.isCnpjValido(cnpj))
  },

  isIeOrCnpjValido: ieCnpj => {
    return param(ieCnpj)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .if(param(ieCnpj).not().isLength({ min: 9, max: 9 }))
      .if(param(ieCnpj).not().isLength({ min: 14, max: 14 }))
      .isEmpty().withMessage(mensagem.isLengthOr(9, 14))
  },

  isNumericIsLengthMinMax: (campo, min, max) => {
    return param(campo)
      .exists().withMessage(mensagem.exists())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  },

  isStringIsLengthMinMax: (campo, min, max) => {
    return param(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  },

  isStringIsNumericIsLengthMinMax: (campo, min, max) => {
    return param(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .isNumeric().withMessage(mensagem.isNumeric())
      .isLength({ min, max }).withMessage(mensagem.isLengthMinMax(min, max))
  }

}