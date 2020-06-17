const { executaStoredProcedure } = require('../database/requisicao')

class Empresa {

  // Empresas Omissas
  buscaOmissoes(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_BuscaEmpresasOmissas'
    return executaStoredProcedure(storedProcedure, params)
  }



  // Excluir Omissão
  listaOmissoes(params) {
    const storedProcedure = 'USUARIOCAT..sp_listar_omissao_empresa'
    return executaStoredProcedure(storedProcedure, params)
  }

  excluiOmissao(params) {
    const storedProcedure = 'USUARIOCAT..sp_excluir_omissao_empresa'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Empresa()