const Model = require('../../model/empresa')
const validator = require('../validator/empresa')
const { validateRules } = require('../validator/express/rules')
const { sucesso, erro } = require('../../util/controller')

const ROTA = '/empresa'

module.exports = app => {

  // Empresas Omissas
  app.get(`${ROTA}/buscaOmissoes`, validator.buscaOmissoes(), validateRules, (req, res) => {
    Model.buscaOmissoes(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })



  // Excluir Omissão
  app.get(`${ROTA}/listaOmissoes/:IECNPJ`, validator.listaOmissoes(), validateRules, (req, res) => {
    Model.listaOmissoes(req.params)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })

  app.delete(`${ROTA}/excluiOmissao`, validator.excluiOmissao(), validateRules, (req, res) => {
    Model.excluiOmissao(req.body)
      .then(result => sucesso(res, result))
      .catch(err => erro(res, err))
  })
}