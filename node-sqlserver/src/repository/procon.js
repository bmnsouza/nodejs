const { executaStoredProcedure, executaQuery } = require('../database/requisicao')

class Procon {

  // Procon
  lista() {
    const query = 'select idcpf, cpf, nome, situacao from USUARIOCAT..tb_UsuarioCat_Procon order by situacao, nome'
    return executaQuery(query)
  }

  busca(params) {
    const query = 'select idcpf, cpf, nome, situacao from USUARIOCAT..tb_UsuarioCat_Procon where cpf=@cpf'
    return executaQuery(query, params)
  }

  alteraSituacao(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_Procon_AlteraSituacao'
    return executaStoredProcedure(storedProcedure, params)
  }

  cadastra(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_Procon_Inclui'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Procon()