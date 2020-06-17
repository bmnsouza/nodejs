class ValidationError extends Error {
  constructor(param, message) {
    super(message)

    this.param = param
    this.name = 'ValidationError'
  }
}

module.exports = {
  ValidationError
}