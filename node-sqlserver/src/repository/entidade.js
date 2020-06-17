const { executaStoredProcedure } = require('../database/requisicao')

class Entidade {

   // Entidade
  lista() {
    const storedProcedure = 'USUARIOCAT..sp_listar_entidade'
    return executaStoredProcedure(storedProcedure)
  }

  busca(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CNPJ_Busca'
    return executaStoredProcedure(storedProcedure, params)
  }

  alteraEstado(params) {
    const storedProcedure = 'USUARIOCAT..sp_alterar_estado_entidade'
    return executaStoredProcedure(storedProcedure, params)
  }

  altera(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CNPJ_Altera1'
    return executaStoredProcedure(storedProcedure, params)
  }

  cadastra(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CNPJ_Inclui1'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Entidade()