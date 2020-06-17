const Model = require('../../model/procon')
const validator = require('../validator/procon')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/procon'

module.exports = app => {

  // Procon
  app.get(`${ROTA}/lista`, (req, res) => {
    Model.lista()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/busca/:cpf`, validator.busca(), validateRules, (req, res) => {
    Model.busca(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/alteraSituacao`, validator.alteraSituacao(), validateRules, (req, res) => {
    Model.alteraSituacao(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/cadastra`, validator.cadastra(), validateRules, (req, res) => {
    Model.cadastra(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

}