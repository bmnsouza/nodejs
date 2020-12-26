const expressValidator = require('express-validator')

const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

const templates = require('../views/templates')

class LivroControlador {

  static rotas() {
    return {
      autenticadas: '/livros*',
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id'
    }
  }

  lista() {
    return (req, res) => {
      const livroDao = new LivroDao(db)
      livroDao.lista()
        .then(livros => res.marko(
          templates.livros.lista,
          { livros: livros }
        ))
        .catch(err => console.log(err))
    }
  }

  formularioCadastro() {
    return (req, res) => {
      res.marko(
        templates.livros.form,
        { livro: {} }
      )
    }
  }

  formularioEdicao() {
    return (req, res) => {
      const id = req.params.id
      const livroDao = new LivroDao(db)

      livroDao.buscaPorId(id)
        .then(livro =>
          res.marko(
            templates.livros.form,
            { livro: livro }
          )
        )
        .catch(err => console.log(err))
    }
  }

  cadastra() {
    return (req, res) => {
      console.log(req.body)
      const livroDao = new LivroDao(db)

      const erros = expressValidator.validationResult(req)

      if (!erros.isEmpty()) {
        return res.marko(
          templates.livros.form,
          {
            livro: req.body,
            errosValidacao: erros.array()
          }
        )
      }

      livroDao.adiciona(req.body)
        .then(res.redirect(LivroControlador.rotas().lista))
        .catch(err => console.log(err))
    }
  }

  edita() {
    return (req, res) => {
      console.log(req.body)
      const livroDao = new LivroDao(db)

      livroDao.atualiza(req.body)
        .then(res.redirect(LivroControlador.rotas().lista))
        .catch(err => console.log(err))
    }
  }

  remove() {
    return (req, res) => {
      const id = req.params.id

      const livroDao = new LivroDao(db)
      livroDao.remove(id)
        .then(() => res.status(200).end())
        .catch(err => console.log(err))
    }
  }
}

module.exports = LivroControlador