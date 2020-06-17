const Repository = require('../repository/sorteio')
const { linhasAfetadas, parametros, retorno } = require('../util/model')
const moment = require('moment')
const { FORMATO } = require('../controller/validator/validate/data')
const { ValidationError } = require('../util/erro')
const { hashCode } = require('../util/criptografia')
const Random = require('../util/random')

class Sorteio {

  // Listar Sorteio
  lista() {
    const promise = Repository.lista()
    return retorno(promise)
  }

  consulta(params) {
    const promise = Repository.consulta(parametros(params))
    return retorno(promise)
  }

  consultaPremios(params) {
    const promise = Repository.consultaPremios(parametros(params))
    return retorno(promise)
  }

  async isSorteioCadastrado(codSorteio) {
    const promise = Repository.consulta(parametros({ codSorteio }))
    const linhas = await linhasAfetadas(promise)
    return (linhas > 0)
  }

  async cadastra(params) {
    const isSorteioCadastrado = await this.isSorteioCadastrado(params.codSorteio)
    if (isSorteioCadastrado) {
      throw new ValidationError('codSorteio', `Sorteio ${params.codSorteio} já cadastrado`)
    }

    params.dtInicio = moment(params.dtInicio, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    params.dtFim = moment(params.dtFim, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    params.dtRealizacao = moment(params.dtRealizacao, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)

    const promise = Repository.cadastra(params)
    return retorno(promise)
  }

  totalBilhetes(params) {
    params.dtInicio = moment(params.dtInicio, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    params.dtFim = moment(params.dtFim, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)

    const promise = Repository.totalBilhetes(parametros(params))
    return retorno(promise)
  }

  async geraBilhetes(params) {
    const codSorteio = params.codSorteio

    // Verifica se o sorteio está cadastrado
    const sorteio = (await this.consulta({ codSorteio }))[0]
    if (!sorteio) {
      throw new ValidationError('codSorteio', `Sorteio ${codSorteio} não cadastrado`)
    }
    
    // Verifica se o sorteio possui bilhete gerado
    const quantidade = await Repository.bilhetesGerados(parametros(params))
      .then(result => result.recordset[0].quantidade)
    if (quantidade > 0) {
      throw new ValidationError('codSorteio', `Sorteio ${codSorteio} já possui bilhetes gerados`)
    }

    // Datas no formato DD/MM/YYYY
    let dtInicio = moment.utc(sorteio.sor_dtInicio).format(FORMATO.DD_MM_YYYY)
    let dtFim = moment.utc(sorteio.sor_dtFim).format(FORMATO.DD_MM_YYYY)

    // Obtém o total de bilhetes a partir das datas início e fim do sorteio
    const totalBilhetes = await this.totalBilhetes({ dtInicio, dtFim })
      .then(result => result[0].totalBilhetes)
    if (totalBilhetes <= 0) {
      throw new ValidationError('codSorteio', `No período de ${dtInicio} a ${dtFim} não há bilhetes disponíveis para geração`)
    }

    // String formada pelo código do sorteio + data no formato DDMMYYYY
    const numSemente = String(codSorteio).padStart(3, '0') + moment().format(FORMATO.DDMMYYY)
    
    // Código hash da string numSemente, utilizado para a geração dos números randômicos do embaralhamento dos bilhetes
    const hashCodeSemente = hashCode(numSemente)

    // Gera os bilhetes
    let numeros = []
    for (let i = 1; i <= totalBilhetes; i++) {
      numeros[i - 1] = i
    }

    // Embaralha os bilhetes
    const random = new Random(hashCodeSemente)
    for (let i = 0; i < totalBilhetes; i++) {
      let a = random.next(totalBilhetes)
      let temp = numeros[i]
      numeros[i] = numeros[a]
      numeros[a] = temp
    }

    // Atribui os bilhetes embaralhados ao objeto bilhetes
    let bilhetes = []
    for (let i = 0; i < totalBilhetes; i++) {
      let bilhete = {
        codSorteio,
        codPremio: 0,
        cpfConsumidor: null,
        cnpjEntidade: null,
        numBilhete: numeros[i]
      }
      bilhetes[i] = bilhete
    }

    // Datas no formato YYYY-MM-DD
    dtInicio = moment(dtInicio, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)
    dtFim = moment(dtFim, FORMATO.DD_MM_YYYY).format(FORMATO.YYYY_MM_DD)

    // Obtém a entidade e quantidade de bilhetes de cada consumidor
    const bilhetesConsumidor = await Repository.bilhetesConsumidor(
      parametros({ dtInicio, dtFim })).then(result => result.recordset)

    // Distribui a entidade e quantidade de bilhetes de cada consumidor no objeto bilhetes
    let j = 0
    for (let x in bilhetesConsumidor) {
      for (let i = 0; i < bilhetesConsumidor[x].quantidade; i++) {
        bilhetes[j].cpfConsumidor = bilhetesConsumidor[x].consumidor
        bilhetes[j].cnpjEntidade = bilhetesConsumidor[x].entidade
        j++
      }
    }

    // Verifica a quantidade de bilhetes gerados com a quantidade de bilhetes distribuídos
    if (j != bilhetes.length) {
      throw new Error('Quantidade de bilhetes gerados é diferente da quantidade de bilhetes a serem distribuídos')
    }

    // Cadastra os bilhetes
    let promise = Repository.cadastrarBilhetes(bilhetes)

    // Atualiza o sorteio com o total de bilhetes e semente
    Repository.atualiza(parametros({ numFaixaFim: totalBilhetes, numSemente, codSorteio }))

    return retorno(promise)
  }

  bilhetesPremiados(params) {
    const promise = Repository.bilhetesPremiados(parametros(params))
    return retorno(promise)
  }

  transferePremios(params) {
    const promise = Repository.transferePremios(parametros(params))
    return retorno(promise)
  }



  // Relatório Premiação
  relatorioPremiacao(params) {
    const promise = Repository.relatorioPremiacao(parametros(params))
    return retorno(promise)
  }



  // Expiração Prêmios
  premiosExpirados() {
    const promise = Repository.premiosExpirados()
    return retorno(promise)
  }

  premiosNaoExpirados() {
    const promise = Repository.premiosNaoExpirados()
    return retorno(promise)
  }



  // Relatório Entidades
  entidadeIndicacao(params) {
    const promise = Repository.entidadeIndicacao(parametros(params))
    return retorno(promise)
  }

  entidadeBilhete(params) {
    const promise = Repository.entidadeBilhete(parametros(params))
    return retorno(promise)
  }



  // Relatório Consumidor Bilhete
  consumidorBilhete(params) {
    const promise = Repository.consumidorBilhete(parametros(params))
    return retorno(promise)
  }

}

module.exports = new Sorteio()