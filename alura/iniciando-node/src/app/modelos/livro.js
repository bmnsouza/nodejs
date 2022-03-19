const { check } = require('express-validator/check')

class Livro {
  static validacoes() {
    return [
      check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
      check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ]
  }
}

module.exports = Livro