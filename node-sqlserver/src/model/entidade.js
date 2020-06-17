const Repository = require('../repository/entidade')
const { linhasAfetadas, parametros, retorno } = require('../util/model')
const { geraSenhaHash } = require('../util/criptografia')
const { ValidationError } = require('../util/erro')

class Entidade {

  // Entidade
  lista() {
    const promise = Repository.lista()
    return retorno(promise)
  }

  busca(params) {
    const promise = Repository.busca(parametros(params))
    return retorno(promise)
  }

  alteraEstado(params) {
    const promise = Repository.alteraEstado(parametros(params))
    return retorno(promise)
  }

  altera(params) {
    const promise = Repository.altera(parametros(params))
    return retorno(promise)
  }
  
  async isCnpjCadastrado(cnpj) {
    const promise = Repository.busca(parametros({ cnpj }))
    const linhas = await linhasAfetadas(promise)
    return (linhas > 0)
  }

  async cadastra(params) {
    const isCnpjCadastrado = await this.isCnpjCadastrado(params.cnpj)
    if (isCnpjCadastrado)  {
      throw new ValidationError('cnpj', `CNPJ ${cnpj} já cadastrado`)
    }

    // Substitui a senha pelo hash
    params.senha = await geraSenhaHash(params.senha)
    delete params.confirmaSenha

    const promise = Repository.cadastra(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Entidade()