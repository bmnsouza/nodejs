require('marko/node-require').install()
require('marko/express')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const rotas = require('../app/rotas/rotas')
rotas(app)

app.use((req, res, next) => {
  return res.status(404).marko(
    require('../app/views/base/erros/404.marko')
  )
})

app.use((err, req, res, next) => {
  return res.status(500).marko(
    require('../app/views/base/erros/500.marko')
  )
})

module.exports = app