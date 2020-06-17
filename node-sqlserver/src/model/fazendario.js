const Repository = require('../repository/fazendario')
const { linhasAfetadas, parametros, retorno } = require('../util/model')
const { ValidationError } = require('../util/erro')

class Fazendario {

  // Fazendario
  lista() {
    const promise = Repository.lista()
    return retorno(promise)
  }

  busca(params) {
    const promise = Repository.busca(parametros(params))
    return retorno(promise)
  }

  listaPerfil() {
    const promise = Repository.listaPerfil()
    return retorno(promise)
  }

  altera(params) {
    const promise = Repository.altera(parametros(params))
    return retorno(promise)
  }

  buscaPortalLogin(params) {
    const promise = Repository.buscaPortalLogin(parametros(params))
    return retorno(promise)
  }

  buscaPortalNome(params) {
    const promise = Repository.buscaPortalNome(parametros(params))
    return retorno(promise)
  }

  async isLoginCadastrado(login) {
    const promise = Repository.busca(parametros({ login }))
    const linhas = await linhasAfetadas(promise)
    return (linhas > 0)
  }

  async cadastra(params) {
    const isLoginCadastrado = await this.isLoginCadastrado(params.login)
    if (isLoginCadastrado > 0) {
      throw new ValidationError('login', `Login ${login} já cadastrado`)
    }

    const promise = Repository.cadastra(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Fazendario()