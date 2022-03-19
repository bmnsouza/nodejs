const path = require('path')
const mergeGraphQLSchemas = require('merge-graphql-schemas')

const {
  fileLoader,
  mergeTypes
} = mergeGraphQLSchemas

const arquivos = path.join(__dirname, './')

const arquivosCarregados = fileLoader(arquivos)

const schemas = mergeTypes(arquivosCarregados)

module.exports = schemas
