const moment = require('moment')

const data1 = moment('01/01/2018', 'DD/MM/YYYY')
const data2 = moment('01/01/2018', 'DD/MM/YYYY')
console.log('data1:', data1)
console.log('data2:', data2)

const isBefore = moment(data1).isBefore(data2)
console.log('isBefore:', isBefore)

const isSame = moment(data1).isSame(data2)
console.log('isSame:', isSame)

const isAfter = moment(data1).isAfter(data2)
console.log('isAfter:', isAfter)

const isSameOrBefore = moment(data1).isSameOrBefore(data2)
console.log('isSameOrBefore:', isSameOrBefore)

const isSameOrAfter = moment(data1).isSameOrAfter(data2)
console.log('isSameOrAfter:', isSameOrAfter)

const isBetween = moment(data1).isBetween(data2, '2018-12-31')
console.log('isBetween:', isBetween)

const isLeapYear = moment(data1).isLeapYear
console.log('isLeapYear:', isLeapYear)

const isMoment = moment.isMoment(data1)
console.log('isMoment:', isMoment)

const isDate = moment.isDate(data1)
console.log('isDate:', isDate)
