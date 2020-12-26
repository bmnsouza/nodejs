const LivroControlador = require('../controladores/livro-controlador')
const livroControlador = new LivroControlador()

const BaseControlador = require('../controladores/base-controlador')

const Livro = require('../modelos/livro')

module.exports = (app) => {
  const rotasLivro = LivroControlador.rotas()

  app.use(rotasLivro.autenticadas, (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect(BaseControlador.rotas().login)
    }
  })

  app.get(rotasLivro.lista, livroControlador.lista())

  app.route(rotasLivro.cadastro)
    .get(livroControlador.formularioCadastro())
    .post(Livro.validacoes(), livroControlador.cadastra())
    .put(livroControlador.edita())

  app.get(rotasLivro.edicao, livroControlador.formularioEdicao())

  app.delete(rotasLivro.delecao, livroControlador.remove())
}