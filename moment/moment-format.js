const moment = require('moment')

console.log('A')
console.log(moment('30/06/2018', 'DD/MM/YYYY').format('YYYY-MM-DD'))
console.log(moment('30/06/2018', 'DD/MM/YYYY').format('DD/MM/YYYY'))
console.log(moment('30/06/2018', 'DD/MM/YYYY').format())

console.log('')
console.log('B')
console.log(moment('30/06/2018 21:38:59', 'DD/MM/YYYY HH:mm:ss').format())
console.log(moment('30/06/2018 21:38:59', 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'))

console.log('')
console.log('C')
console.log(moment().format())
console.log(moment().format('DD/MM/YYYY HH:mm:ss'))
