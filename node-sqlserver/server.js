const customExpress = require('./src/config/custom-express')
const conexao = require('./src/database/conexao')
const v8 = require('v8')

const totalHeapSize = v8.getHeapStatistics().total_available_size
const totalHeapSizaInMB = (totalHeapSize/1024/1024).toFixed(2)
console.log('>>> Total Heap Size =', totalHeapSizaInMB, 'MB')

conexao.connect()
  .then(() => {
    console.log('>>> Banco de Dados = OK')

    const app = customExpress()
    app.listen(process.env.PORT, () => {
      console.log('>>> Servidor = OK')
    })
  })
  .catch(err => {
    console.log(err)
  })