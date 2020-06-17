const Repository = require('../repository/procon')
const { linhasAfetadas, parametros, retorno } = require('../util/model')
const { geraSenhaHash } = require('../util/criptografia')
const { ValidationError } = require('../util/erro')

class Procon {

  // Procon
  lista() {
    const promise = Repository.lista()
    return retorno(promise)
  }

  busca(params) {
    const promise = Repository.busca(parametros(params))
    return retorno(promise)
  }

  alteraSituacao(params) {
    const promise = Repository.alteraSituacao(parametros(params))
    return retorno(promise)
  }

  async isCpfCadastrado(cpf) {
    const promise = Repository.busca(parametros({ cpf }))
    const linhas = await linhasAfetadas(promise)
    return (linhas > 0)
  }

  async cadastra(params) {
    const isCpfCadastrado = await this.isCpfCadastrado(params.cpf)
    if (isCpfCadastrado) {
      throw new ValidationError('cpf', `CPF ${cpf} já cadastrado`)
    }

    // Substitui a senha pelo hash
    params.senha = await geraSenhaHash(params.senha)
    
    const promise = Repository.cadastra(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Procon()