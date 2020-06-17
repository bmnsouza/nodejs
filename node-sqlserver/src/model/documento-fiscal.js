const Repository = require('../repository/documento-fiscal')
const { parametros, retorno } = require('../util/model')
const moment = require('moment')
const { FORMATO } = require('../controller/validator/validate/data')

class DocumentoFiscal {

  // Modelos
  #cumpomFiscal = 'CF'
  #modelo1 = '01'
  #modelo2 = '02'
  #nfce = 'NFC'
  #nfe = 'NFE'

  // Cupom Fiscal, Modelo 1, Modelo 2 e Modelo Online
  #modelos = params => {
    params.situacao = ''
    params.nNFini = ''
    params.nNFfim = ''

    if (params.mod == this.#cumpomFiscal) {
      params.dataIni = moment(params.dataIni, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
      params.dataFim = moment(params.dataFim, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    }

    const parameters = parametros(params)

    const promise = (params.mod == this.#cumpomFiscal) ? Repository.cupomFiscal(parameters) :
      (params.mod == this.#modelo1) ? Repository.modelo1(parameters) :
        (params.mod == this.#modelo2) ? Repository.modelo2(parameters) :
          Repository.modeloOnline(parameters)

    return retorno(promise)
  }

  // NFCe e NFe
  #notas = params => {
    const mod = params.mod
    delete params.mod

    params.dataIni = moment(params.dataIni, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    params.dataFim = moment(params.dataFim, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    params.situacao = ''

    const parameters = parametros(params)

    const promise = (mod == this.#nfce) ?
      Repository.nfce(parameters) : Repository.nfe(parameters)

    return retorno(promise)
  }

  consulta(params) {
    return ([this.#nfce, this.#nfe].includes(params.mod)) ?
      this.#notas(params) : this.#modelos(params)
  }
}

module.exports = new DocumentoFiscal()