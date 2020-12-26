const { v4: uuidv4 } = require('uuid');
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UsuarioDao = require('../app/infra/usuario-dao')
const db = require('./database')

module.exports = (app) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha'
    },
    (email, senha, done) => {
      const usuarioDao = new UsuarioDao(db)
      usuarioDao.buscaPorEmail(email)
        .then(usuario => {
          if (!usuario || senha != usuario.senha) {
            return done(null, false, {
              mensagem: 'Login e senha incorretos'
            })
          }

          return done(null, usuario)
        })
        .catch(err => done(err, false))
    }
  ))

  passport.serializeUser((usuario, done) => {
    const usuarioSessao = {
      nome: usuario.nome_completo,
      email: usuario.email
    }

    done(null, usuarioSessao)
  })

  passport.deserializeUser((usuarioSessao, done) => {
    done(null, usuarioSessao)
  })

  app.use(sessao({
    secret: 'node alura',
    genid: (req) => {
      return uuidv4()
    },
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, resp, next) => {
    req.passport = passport
    next()
  })
}