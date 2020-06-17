const Repository = require('../repository/empresa')
const { parametros, retorno } = require('../util/model')

class Empresa {

  // Empresas Omissas
  buscaOmissoes(params) {
    const promise = Repository.buscaOmissoes(parametros(params))
    return retorno(promise)
  }



  // Excluir Omissão
  listaOmissoes(params) {
    const promise = Repository.listaOmissoes(parametros(params))
    return retorno(promise)
  }

  excluiOmissao(params) {
    const promise = Repository.excluiOmissao(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Empresa()