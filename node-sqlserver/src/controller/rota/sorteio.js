const Model = require('../../model/sorteio')
const validator = require('../validator/sorteio')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/sorteio'

module.exports = app => {

  // Listar Sorteio
  app.get(`${ROTA}/lista`, (req, res) => {
    Model.lista()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/consulta/:codSorteio`, validator.consulta(), validateRules, (req, res) => {
    Model.consulta(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/consultaPremios/:codSorteio`, validator.consultaPremios(), validateRules, (req, res) => {
    Model.consultaPremios(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/cadastra`, validator.cadastra(), validateRules, (req, res) => {
    Model.cadastra(req.body)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/totalBilhetes`, validator.totalBilhetes(), validateRules, (req, res) => {
    Model.totalBilhetes(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.post(`${ROTA}/geraBilhetes/:codSorteio`, validator.geraBilhetes(), validateRules, (req, res) => {
    Model.geraBilhetes(req.params)
      .then(result => sucesso(res, result, 201))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/bilhetesPremiados/:codSorteio`, validator.bilhetesPremiados(), validateRules, (req, res) => {
    Model.bilhetesPremiados(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.patch(`${ROTA}/transferePremios/:codSorteio`, validator.transferePremios(), validateRules, (req, res) => {
    Model.transferePremios(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Relatório Premiação
  app.get(`${ROTA}/relatorioPremiacao`, validator.relatorioPremiacao(), validateRules, (req, res) => {
    Model.relatorioPremiacao(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Expiração Prêmios
  app.get(`${ROTA}/premiosExpirados`, (req, res) => {
    Model.premiosExpirados()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/premiosNaoExpirados`, (req, res) => {
    Model.premiosNaoExpirados()
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Relatório Entidades
  app.get(`${ROTA}/entidadeIndicacao/:codSorteio`, validator.entidadeIndicacao(), validateRules, (req, res) => {
    Model.entidadeIndicacao(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.get(`${ROTA}/entidadeBilhete/:codSorteio`, validator.entidadeBilhete(), validateRules, (req, res) => {
    Model.entidadeBilhete(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Relatório Consumidor Bilhete
  app.get(`${ROTA}/consumidorBilhete/:codSorteio`, validator.consumidorBilhete(), validateRules, (req, res) => {
    Model.consumidorBilhete(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

}