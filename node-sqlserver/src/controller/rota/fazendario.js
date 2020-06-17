const Model = require('../../model/fazendario')
const validator = require('../validator/fazendario')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/fazendario'

module.exports = app => {

  // Fazendario
  app.get(`${ROTA}/lista`, (req, res) => {
    Model.lista()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/busca/:login`, validator.busca(), validateRules, (req, res) => {
    Model.busca(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/listaPerfil`, (req, res) => {
    Model.listaPerfil()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/altera`, validator.altera(), validateRules, (req, res) => {
    Model.altera(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/buscaPortalLogin/:login`, validator.buscaPortalLogin(), validateRules, (req, res) => {
    Model.buscaPortalLogin(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/buscaPortalNome/:nome`, validator.buscaPortalNome(), validateRules, (req, res) => {
    Model.buscaPortalNome(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/cadastra`, validator.cadastra(), validateRules, (req, res) => {
    Model.cadastra(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

}