const Model = require('../../model/resgate')
const validator = require('../validator/resgate')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/resgate'

module.exports = app => {

  // Solicitação de Resgate
  app.get(`${ROTA}/relatorioConferencia`, (req, res) => {
    Model.relatorioConferencia(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/atualizaConferencia`, (req, res) => {
    Model.atualizaConferencia()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/listaGeracaoRelatorio`, (req, res) => {
    Model.listaGeracaoRelatorio(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/obtemRelatorioAnterior`, validator.obtemRelatorioAnterior(), validateRules, (req, res) => {
    Model.obtemRelatorioAnterior(req.query)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/geraRelatorioAtual`, (req, res) => {
    Model.geraRelatorioAtual()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Resgates Solicitados
  app.get(`${ROTA}/buscaTransferencias`, validator.buscaTransferencias(), validateRules, (req, res) => {
    Model.buscaTransferencias(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Resgate Não Realizado
  app.get(`${ROTA}/naoRealizado`, (req, res) => {
    Model.naoRealizado()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Bloqueio Resgate
  app.get(`${ROTA}/listaBloqueio`, (req, res) => {
    Model.listaBloqueio()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.delete(`${ROTA}/excluiBloqueio`, (req, res) => {
    Model.excluiBloqueio()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/cadastraBloqueio`, validator.cadastraBloqueio(), validateRules, (req, res) => {
    Model.cadastraBloqueio(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })



  // Conta Inválida
  app.get(`${ROTA}/buscaTransferencia/:cpf`, validator.buscaTransferencia(), validateRules, (req, res) => {
    Model.buscaTransferencia(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/marcaTransferenciaInvalida/:codmov`, validator.marcaTransferenciaInvalida(), validateRules, (req, res) => {
    Model.marcaTransferenciaInvalida(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

}