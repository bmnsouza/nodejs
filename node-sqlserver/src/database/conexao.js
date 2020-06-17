const mssql = require('mssql')

const conexao = () => {
  let conexao = null

  try {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      port: 1433,
      connectionTimeout: 300000,
      requestTimeout: 300000,
      stream: false,
      parseJSON: false,
      pool: {
        max: 70,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        enableArithAbort: true,
        readOnlyIntent: false,
        encrypt: false
      }
    }

    conexao = new mssql.ConnectionPool(config)
  } catch (err) {
    throw err.message
  }

  return conexao
}

module.exports = conexao()