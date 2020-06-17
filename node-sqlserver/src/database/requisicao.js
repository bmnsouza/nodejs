const conexao = require('./conexao')
const async = require('async')
const mssql = require('mssql')
const { ValidationError } = require('../util/erro')

module.exports = {

  executaBulk: async table => {
    return executa(TIPO_STATEMENT.BULK, table)
  },

  executaQuery: async (query, params = []) => {
    return executa(TIPO_STATEMENT.QUERY, query, params)
  },

  executaStoredProcedure: async (storedProcedure, params = []) => {
    return executa(TIPO_STATEMENT.STORED_PROCEDURE, storedProcedure, params)
  },

  executaTransaction: async (query = []) => {
    return new Promise(async (resolve, reject) => {
      const pool = await conexao.connect()
      const transaction = new mssql.Transaction(pool)

      return transaction.begin(err => {
        const request = new mssql.Request(transaction)
        if (err) {
          reject(err)
        }
        return async.eachSeries(query, async query => {
          return request.query(query)
        }, async (err) => {
          if (err) {
            transaction.rollback(() => {
              pool.close()
              reject(err)
            })
          } else {
            transaction.commit(() => {
              pool.close()
              resolve({ rowsAffected: query.length })
            })
          }
        })
      })
    })
  }

}

const TIPO_STATEMENT = {
  BULK: 'BULK',
  QUERY: 'QUERY',
  STORED_PROCEDURE: 'STORED_PROCEDURE'
}

const executa = async (tipo, statement, params = []) => {
  const pool = await conexao.connect()

  try {
    const request = pool.request()

    params.forEach(param => {
      param.type ? request.input(param.name, param.type, param.value) :
        request.input(param.name, param.value)
    })

    const result = (tipo == TIPO_STATEMENT.STORED_PROCEDURE) ? (await request.execute(statement)) :
      (tipo == TIPO_STATEMENT.QUERY) ? (await request.query(statement)) :
        await request.bulk(statement)

    return result
  } catch (err) {
    throw err.message
  } finally {
    pool.close()
  }
}
