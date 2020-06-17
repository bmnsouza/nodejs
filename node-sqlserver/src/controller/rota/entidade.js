const Model = require('../../model/entidade')
const validator = require('../validator/entidade')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/entidade'

module.exports = app => {

  // Entidade
  app.get(`${ROTA}/lista`, (req, res) => {
    Model.lista()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/busca/:cnpj`, validator.busca(), validateRules, (req, res) => {
    Model.busca(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/alteraEstado`, validator.alteraEstado(), validateRules, (req, res) => {
    Model.alteraEstado(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.put(`${ROTA}/altera`, validator.altera(), validateRules, (req, res) => {
    Model.altera(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/cadastra`, validator.cadastra(), validateRules, (req, res) => {
    Model.cadastra(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

}