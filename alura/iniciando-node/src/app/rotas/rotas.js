const livroRotas = require('./livro-rotas')
const baseRotas = require('./base-rotas')

module.exports = (app) => {
  baseRotas(app)
  livroRotas(app)
}