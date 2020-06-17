const moment = require('moment')

const data1 = moment('01/01/2018', 'DD/MM/YYYY')
const data2 = moment('30/06/2018', 'DD/MM/YYYY')

console.log('........................................')
console.log('data1:', data1)
console.log('data2:', data2)

console.log('........................................')
console.log('y:', data2.diff(data1, 'years', true))
console.log('y:', data2.diff(data1, 'years'))

console.log('........................................')
console.log('Q:', data2.diff(data1, 'quarters', true))
console.log('Q:', data2.diff(data1, 'quarters'))

console.log('........................................')
console.log('M:', data2.diff(data1, 'months', true))
console.log('M:', data2.diff(data1, 'months'))

console.log('........................................')
console.log('w:', data2.diff(data1, 'weeks', true))
console.log('w:', data2.diff(data1, 'weeks'))

console.log('........................................')
console.log('d:', data2.diff(data1, 'days', true))
console.log('d:', data2.diff(data1, 'days'))

console.log('........................................')
console.log('h:', data2.diff(data1, 'hours', true))
console.log('h:', data2.diff(data1, 'hours'))

console.log('........................................')
console.log('m:', data2.diff(data1, 'minutes', true))
console.log('m:', data2.diff(data1, 'minutes'))

console.log('........................................')
console.log('s:', data2.diff(data1, 'seconds', true))
console.log('s:', data2.diff(data1, 'seconds'))

console.log('........................................')
console.log('ms:', data2.diff(data1, 'milliseconds', true))
console.log('ms:', data2.diff(data1, 'milliseconds'))
console.log('ms:', data2.diff(data1))
