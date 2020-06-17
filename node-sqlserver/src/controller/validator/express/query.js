const { query } = require('express-validator')
const mensagem = require('../validate/mensagem')
const data = require('../validate/data')

module.exports = {

  isDataValida: campo => {
    return query(campo)
      .exists().withMessage(mensagem.exists())
      .isString().withMessage(mensagem.isString())
      .custom(campo => data.isDataValida(campo))
  }

}