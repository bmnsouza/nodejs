/**
 * Retorna a quantidade de linhas afetadas
 * @param {*} promise
 */
const linhasAfetadas = promise => {
  return promise.then(result => {
    return Array.isArray(result.rowsAffected) ?
      result.rowsAffected[result.rowsAffected.length - 1] :
        result.rowsAffected
  })
}

/**
 * Retorna o array de parâmetros que será utilizado para realizar a requisição no banco de dados
 * @param {*} params JSON que será transformado em Array [{ name, value }, ...]
 */
const parametros = params => {
  params = Array.isArray(params) ? params[0] : params
  return Object.keys(params).map(item => ({ name: item, value: params[item] }))
}

/**
 * Retorna o result do banco de dados tratado
 * @param {*} promise 
 */
const retorno = promise => {
  return promise.then(result => {
    result = result.recordset ? result.recordset : Array.isArray(result.rowsAffected) ?
      { linhasAfetadas: result.rowsAffected[result.rowsAffected.length - 1] } :
        { linhasAfetadas: result.rowsAffected }

    return (result.length == 0) ? result = {} : result
  })
}

module.exports = {
  linhasAfetadas,
  parametros,
  retorno
}

/*
const parametros = params => {
  return Object.keys(params).map(item => ({ name: item, value: params[item] }))
}

*/

// Retorna Array SOMENTE quando tem mais de 1 registro
/*
const retorno = promise => {
  return promise.then(result => {
    result = result.recordset ? result.recordset : Array.isArray(result.rowsAffected) ?
      { linhasAfetadas: result.rowsAffected[result.rowsAffected.length - 1] } :
        { linhasAfetadas: result.rowsAffected }

    return (result.length == 0) ? result = {} :
      (result.length == 1) ? result[0] : result
  })
}
*/

// Retorna Array SEMPRE que tem informação
/*
const retorno = promise => {
  return promise.then(result => {
    console.log(result)
    result = result.recordset ? result.recordset : Array.isArray(result.rowsAffected) ?
      [{ linhasAfetadas: result.rowsAffected[result.rowsAffected.length - 1] }] :
        [{ linhasAfetadas: result.rowsAffected }]

    return (result.length == 0) ? result = {} : result
  })
}
*/
