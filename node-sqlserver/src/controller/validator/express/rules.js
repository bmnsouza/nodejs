const { matchedData, validationResult } = require('express-validator')
const { validacao } = require('../../../util/controller')

module.exports = {

  validateRules: (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      req.matchedData = matchedData(req)
      return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    validacao(res, extractedErrors)
  }

}