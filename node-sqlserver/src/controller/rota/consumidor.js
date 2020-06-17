const Model = require('../../model/consumidor')
const validator = require('../validator/consumidor')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/consumidor'

module.exports = app => {

  // Dados do Consumidor
  app.get(`${ROTA}/buscaPorCPF`, validator.buscaPorCPF(), validateRules, (req, res) => {
    Model.buscaPorCPF(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/buscaPorNome`, validator.buscaPorNome(), validateRules, (req, res) => {
    Model.buscaPorNome(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/buscaPorId/:idcpf`, validator.buscaPorId(), validateRules, (req, res) => {
    Model.buscaPorId(req.params)
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



  // Créditos do Consumidor
  app.get(`${ROTA}/obtemConta/:strCNPJCPF`, validator.obtemConta(), validateRules, (req, res) => {
    Model.obtemConta(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/obtemExtrato/:codContaCorrente`, validator.obtemExtrato(), validateRules, (req, res) => {
    Model.obtemExtrato(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/obtemSaldo/:pkConta`, validator.obtemSaldo(), validateRules, (req, res) => {
    Model.obtemSaldo(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/bloqueioContaCorrente`, validator.bloqueioContaCorrente(), validateRules, (req, res) => {
    Model.bloqueioContaCorrente(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

}