module.exports = {
  exists: () => 'Deve existir',

  informaCampos: (...campos) => `Deve ser informado um dos campos: ${campos}`,

  isArrayMin: min => `Deve ter no mínimo ${min} elemento(s)`,

  isArrayMinMax: (min, max) => `Deve ter no mínimo ${min} e no máximo ${max} elementos`,

  isEmail: () => 'Deve ser e-mail válido',

  isFloatMax: max => `Deve ter valor máximo ${max}`,

  isFloatMinMax: (min, max) => `Deve ter valor mínimo ${min} e máximo ${max}`,

  isIn: (...valores) => `Deve conter um dos valores: ${valores}`,

  isIntMinMax: (min, max) => `Deve ter valor mínimo ${min} e máximo ${max}`,

  isLength: length => `Deve ter ${length} caracteres`,

  isLengthMax: max => `Deve ter no máximo ${max} caracteres`,

  isLengthMinMax: (min, max) => `Deve ter no mínimo ${min} e no máximo ${max} caracteres`,

  isLengthOr: (valor1, valor2) => `Deve ter ${valor1} ou ${valor2} caracteres`,

  isNumeric: () => 'Deve ser numérico',

  isNumericOr: valor => `Deve ser numérico ou ${valor}`,

  isString: () => 'Deve ser string',

  notIsString: () => 'Não deve ser string'
}