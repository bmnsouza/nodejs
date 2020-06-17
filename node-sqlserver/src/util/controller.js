const { ValidationError } = require('./erro')

/**
 * Retorna mensagens de validação ou erro em um JSON padronizado
 * @param {*} res
 * @param {*} err
 * @param {*} status
 */
const erro = (res, err, status = 400) => {
  const message = err.message || err

  if (err instanceof ValidationError) {
    res.status(422)
    res.json(resultValidacao(res.statusCode, [{ [err.param]: message }]))
  } else {
    res.status(status)
    res.json(resultErro(res.statusCode, message))
  }
}

/**
 * Retorna o resultado em um JSON padronizado
 * @param {*} res
 * @param {*} result
 * @param {*} status
 */
const sucesso = (res, result, status = 200) => {
  res.status(status)
  res.json(resultSucesso(res.statusCode, 'Sucesso', result))
}

/**
 * Retorna resultValidacao em um JSON padronizado.
 * @param {*} res
 * @param {*} err
 * @param {*} status
 */
const validacao = (res, err, status = 422) => {
  res.status(status)
  res.json(resultValidacao(res.statusCode, err))
}

const resultErro = (cdRetorno, msgTecnica) => {
  return result = {
    result: {
      cdRetorno: cdRetorno.toString(),
      msgTecnica,
      msgUsuario: '',
      dados: {}
    }
  }
}

const resultSucesso = (cdRetorno, msgUsuario, dados) => {
  return result = {
    result: {
      cdRetorno: cdRetorno.toString(),
      msgTecnica: '',
      msgUsuario,
      dados
    }
  }
}

const resultValidacao = (cdRetorno, msgUsuario) => {
  return result = {
    result: {
      cdRetorno: cdRetorno.toString(),
      msgTecnica: '',
      msgUsuario,
      dados: {}
    }
  }
}

module.exports = {
  erro,
  sucesso,
  validacao
}