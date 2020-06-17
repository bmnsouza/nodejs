const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
require('dotenv').config()

module.exports = () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  consign({ cwd: 'src/controller' })
    .include('rota')
    .into(app)

  return app
}