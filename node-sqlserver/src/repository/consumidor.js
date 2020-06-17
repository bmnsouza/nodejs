const { executaStoredProcedure, executaQuery } = require('../database/requisicao')

class Consumidor {

  // Dados do Consumidor
  buscaPorCPF(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CPF_Lista'
    return executaStoredProcedure(storedProcedure, params)
  }

  buscaPorNome(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CPF_Busca_Por_Nome'
    return executaStoredProcedure(storedProcedure, params)
  }

  buscaPorId(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CPF_Busca_PorId1'
    return executaStoredProcedure(storedProcedure, params)
  }

  alteraEstado(params) {
    const storedProcedure = 'USUARIOCAT..sp_alterar_estado_consumidor'
    return executaStoredProcedure(storedProcedure, params)
  }

  altera(params) {
    const storedProcedure = 'USUARIOCAT..pr_UsuarioCat_CPF_Altera2'
    return executaStoredProcedure(storedProcedure, params)
  }



  // Créditos do Consumidor
  obtemConta(params) {
    const storedProcedure = 'NFP_ContaCorrente..ContaCorrente_GetContaUser'
    return executaStoredProcedure(storedProcedure, params)
  }

  obtemExtrato(params) {
    const storedProcedure = 'NFP_ContaCorrente..ContaCorrente_ExtratoMov'
    return executaStoredProcedure(storedProcedure, params)
  }

  obtemSaldo(params) {
    const storedProcedure = 'NFP_ContaCorrente..ContaCorrente_GetSaldo'
    return executaStoredProcedure(storedProcedure, params)
  }

  bloqueioContaCorrente(params) {
    const query = `insert into NFP_ContaCorrente..ContaCorrente_Bloqueio select pkConta, 
      strCpfCnpjUser, (select nome from UsuarioCat..tb_UsuarioCat_CPF where cpf = @cpf
      union all select razao from UsuarioCat..tb_UsuarioCat_CNPJ where cnpj = @cpf),
      dtmtimeStamp, @contaBloqueada, @resp, @justificativa, getdate()
      from NFP_ContaCorrente..ContaCorrente where strCpfCnpjUser = @cpf`
    return executaQuery(query, params)
  }

}

module.exports = new Consumidor()