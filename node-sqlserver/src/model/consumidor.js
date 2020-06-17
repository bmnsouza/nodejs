const Repository = require('../repository/consumidor')
const { parametros, retorno } = require('../util/model')

class Consumidor {

  // Dados do Consumidor
  buscaPorCPF(params) {
    const promise = Repository.buscaPorCPF(parametros(params))
    return retorno(promise)
  }

  buscaPorNome(params) {
    const promise = Repository.buscaPorNome(parametros(params))
    return retorno(promise)
  }

  buscaPorId(params) {
    const promise = Repository.buscaPorId(parametros(params))
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


  // Créditos do Consumidor
  obtemConta(params) {
    const promise = Repository.obtemConta(parametros(params))
    return retorno(promise)
  }

  obtemExtrato(params) {
    const promise = Repository.obtemExtrato(parametros(params))
    return retorno(promise)
  }

  obtemSaldo(params) {
    const promise = Repository.obtemSaldo(parametros(params))
    return retorno(promise)
  }

  bloqueioContaCorrente(params) {
    const promise = Repository.bloqueioContaCorrente(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Consumidor()