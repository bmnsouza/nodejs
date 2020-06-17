const Model = require('../../model/documento-fiscal')
const validator = require('../validator/documento-fiscal')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/documentoFiscal'

module.exports = app => {

  // Documentos Fiscais
  app.get(`${ROTA}/consulta`, validator.consulta(), validateRules, (req, res) => {
    Model.consulta(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

}