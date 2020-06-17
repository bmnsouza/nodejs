const moment = require('moment')

const data1 = moment()
// Copia data1 para data2, mas data2 sofrerá alterações posteriores
const data2 = data1
// Copia data1 para data3, mas data3 não sofrerá alterações posteriores
const data3 = data1.clone()

console.log('........................................')
console.log('data1:', data1)
console.log('data2:', data2)
console.log('data3:', data3)

console.log('........................................')
data1.add(1, 'years')
console.log('y >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'quarters')
console.log('Q >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'months')
console.log('M >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'weeks')
console.log('w >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'days')
console.log('d >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'hours')
console.log('h >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'minutes')
console.log('m >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(1, 'seconds')
console.log('s >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)

console.log('........................................')
data1.add(10000, 'milliseconds')
console.log('ms >>>', 'data1:', data1, 'data2:', data2, 'data3:', data3)
