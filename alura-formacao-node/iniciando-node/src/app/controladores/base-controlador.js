const LivroControlador = require('./livro-controlador')

const templates = require('../views/templates')

class BaseControlador {
  static rotas() {
    return {
      home: '/',
      login: '/login'
    }
  }

  home() {
    return (req, res) => {
      res.marko(templates.base.home)
    }
  }

  login() {
    return (req, resp) => {
      resp.marko(templates.base.login)
    }
  }

  efetuaLogin() {
    return (req, resp, next) => {
      const passport = req.passport
      passport.authenticate('local', (erro, usuario, info) => {
        if (info) {
          return resp.marko(templates.base.login)
        }

        if (erro) {
          return next(erro)
        }

        req.login(usuario, (erro) => {
          if (erro) {
            return next(erro)
          }

          return resp.redirect(LivroControlador.rotas().lista)
        })
      }) (req, resp, next)
    }
  }
}

module.exports = BaseControlador;