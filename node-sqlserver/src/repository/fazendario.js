const { executaStoredProcedure, executaQuery } = require('../database/requisicao')

class Fazendario {

  // Fazendario
  lista() {
    const storedProcedure = 'USUARIOCAT..sp_listar_usuario'
    return executaStoredProcedure(storedProcedure)
  }

  busca(params) {
    const storedProcedure = 'USUARIOCAT..sp_buscar_usuario'
    return executaStoredProcedure(storedProcedure, params)
  }

  listaPerfil() {
    const query = 'select * from USUARIOCAT..TB_PER_PERFIL'
    return executaQuery(query)
  }

  altera(params) {
    const storedProcedure = 'USUARIOCAT..sp_alterar_perfil_usuario'
    return executaStoredProcedure(storedProcedure, params)
  }

  buscaPortalLogin(params) {
    const storedProcedure = 'USUARIOCAT..sp_busca_fazendario_portal_login'
    return executaStoredProcedure(storedProcedure, params)
  }

  buscaPortalNome(params) {
    const storedProcedure = 'USUARIOCAT..sp_busca_fazendario_portal_nome'
    return executaStoredProcedure(storedProcedure, params)
  }

  cadastra(params) {
    const storedProcedure = 'USUARIOCAT..sp_inserir_usuario'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Fazendario()