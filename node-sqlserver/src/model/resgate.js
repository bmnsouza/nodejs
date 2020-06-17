const Repository = require('../repository/resgate')
const { linhasAfetadas, parametros, retorno } = require('../util/model')
const moment = require('moment')
const { FORMATO } = require('../controller/validator/validate/data')
const { ValidationError } = require('../util/erro')

class Resgate {

  // Solicitação de Resgate
  relatorioConferencia() {
    let promise = retorno(Repository.verificaRelatorioConferencia())
    promise = promise.then(status => Repository.relatorioConferencia(parametros(status)))
    return retorno(promise)
  }

  atualizaConferencia() {
    const promise = Repository.atualizaConferencia()
    return retorno(promise)
  }

  listaGeracaoRelatorio() {
    const promise = Repository.listaGeracaoRelatorio()
    return retorno(promise)
  }

  obtemRelatorioAnterior(params) {
    params.dtRelatAnterior = moment(params.dtRelatAnterior, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)

    const promise = Repository.obtemRelatorioAnterior(parametros(params))
    return retorno(promise)
  }

  geraRelatorioAtual() {
    const promise = Repository.geraRelatorioAtual()
    return retorno(promise)
  }



  // Resgates Solicitados
  buscaTransferencias(params) {
    const promise = Repository.buscaTransferencias(parametros(params))
    return retorno(promise)
  }



  // Resgate Não Realizado
  naoRealizado() {
    const promise = Repository.naoRealizado()
    return retorno(promise)
  }



  // Bloqueio Resgate
  listaBloqueio() {
    const promise = Repository.listaBloqueio()
    return retorno(promise)
  }

  excluiBloqueio() {
    const promise = Repository.excluiBloqueio()
    return retorno(promise)
  }

  async isDataBloqueioNaoCadastrada(dtInicioBloqueio) {
    const data = dtInicioBloqueio
    dtInicioBloqueio = moment(dtInicioBloqueio, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    
    const promise = Repository.buscaBloqueio(parametros({ dtInicioBloqueio }))
    const linhas = await linhasAfetadas(promise)
    if (linhas > 0) {
      throw new ValidationError('dtInicioBloqueio', `Data de bloqueio ${data} já cadastrada`)
    }
    return true
  }

  async cadastraBloqueio(params) {
    await this.isDataBloqueioNaoCadastrada(params.dtInicioBloqueio)

    params.dtInicioBloqueio = moment(params.dtInicioBloqueio, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    const promise = Repository.cadastraBloqueio(parametros(params))
    return retorno(promise)
  }



  // Conta Inválida
  buscaTransferencia(params) {
    const promise = Repository.buscaTransferencia(parametros(params))
    return retorno(promise)
  }

  marcaTransferenciaInvalida(params) {
    const promise = Repository.marcaTransferenciaInvalida(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Resgate()