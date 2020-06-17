const { executaStoredProcedure, executaQuery } = require('../database/requisicao')

class Resgate {

  // Solicitação de Resgate
  verificaRelatorioConferencia() {
    const storedProcedure = 'NFP_ContaCorrente..pr_NFP_ContaCorrente_VerificarExistenciaRelatorioConferenciaAtivo'
    return executaStoredProcedure(storedProcedure)
  }

  relatorioConferencia(params) {
    const storedProcedure = 'NFP_ContaCorrente..pr_NFP_ContaCorrente_GerarRelatorioConferenciaResgate'
    return executaStoredProcedure(storedProcedure, params)
  }

  atualizaConferencia() {
    const storedProcedure = 'NFP_ContaCorrente..pr_NFP_ContaCorrente_ConferenciaResgate'
    return executaStoredProcedure(storedProcedure)
  }

  listaGeracaoRelatorio() {
    const query = `select cast(dtGeracaoRelatorio as date) dtGeracaoRelatorio, count(*) quantidade
      from NFP_ContaCorrente..Transferencia where dtGeracaoRelatorio is not null group by 
      cast(dtGeracaoRelatorio as date) order by 1 desc`
    return executaQuery(query)
  }

  obtemRelatorioAnterior(params) {
    const query = `select u.nome strNome, u.cpf strCpfCnpjUser, (u.logradouro + ', ' + u.numero) Endereco,
      upper(u.bairro) Bairro, (u.municipio + '-' + u.uf) Cidade, u.cep, t.codBanco,
      (select nomeBanco from NFP_ContaCorrente..NFA_Bancos where convert(int, pkBanco) = t.codBanco) nomeBanco,
      t.strAgencia, (case upper(t.strDigAgencia) when 'X' then 0 else t.strDigAgencia end) strDigAgencia,
      (case m.codTipoMov when 1 then 'CONTA CORRENTE' else 'POUPANÇA' end) TipoConta,
      right('0000000' + convert(varchar(12), t.strNumConta), 6) strNumConta,
      (case upper(t.strDigConta) when 'X' then 0 else t.strDigConta end) strDigConta,
      t.valValorCredito, t.operacao, t.valValorCreditoBruto, t.valValorDescontoIR
      from NFP_ContaCorrente..Transferencia t, NFP_ContaCorrente..Movimentacao m, UsuarioCAT..tb_UsuarioCat_CPF u
      where t.codMovimentacao = m.codMovimentacao and t.strCpfCnpjUser = u.cpf
      and t.codBanco = 47 and m.codTipoMov in (1, 2) and t.tra_status >= 2
      and cast(dtGeracaoRelatorio as date) = @dtRelatAnterior order by strNome`
    return executaQuery(query, params)
  }

  geraRelatorioAtual() {
    const query = `update NFP_ContaCorrente..Transferencia set tra_status = 2, dtGeracaoRelatorio = getdate()
      where pkTransf in (select pkTransf  from NFP_ContaCorrente..Transferencia t, NFP_ContaCorrente..Movimentacao m
      where t.codMovimentacao = m.codMovimentacao and codBanco = 47 and tra_status = 1 and m.codTipoMov in (1, 2))`
    return executaQuery(query)
  }




  // Resgates Solicitados
  buscaTransferencias(params) {
    const storedProcedure = 'NFP_ContaCorrente..BuscaTransferencias'
    return executaStoredProcedure(storedProcedure, params)
  }



  // Resgate Não Realizado
  naoRealizado() {
    const storedProcedure = 'NFP_ContaCorrente..sp_resgate_nao_realizado'
    return executaStoredProcedure(storedProcedure)
  }



  // Bloqueio Resgate
  listaBloqueio() {
    const storedProcedure = 'NFP_ContaCorrente..sp_listar_bloqueio_resgate'
    return executaStoredProcedure(storedProcedure)
  }

  excluiBloqueio() {
    const storedProcedure = 'NFP_ContaCorrente..sp_excluir_bloqueio_resgate'
    return executaStoredProcedure(storedProcedure)
  }

  cadastraBloqueio(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_cadastrar_bloqueio_resgate'
    return executaStoredProcedure(storedProcedure, params)
  }

  buscaBloqueio(params) {
    const query = `select blr_dtiniciobloqueio from NFP_ContaCorrente..tb_blr_bloqueio_resgate 
      where blr_dtiniciobloqueio = @dtInicioBloqueio`
    return executaQuery(query, params)
  }



  // Conta Inválida
  buscaTransferencia(params) {
    const storedProcedure = 'NFP_ContaCorrente..BuscaTransferenciaPorPessoaGestor'
    return executaStoredProcedure(storedProcedure, params)
  }

  marcaTransferenciaInvalida(params) {
    const storedProcedure = 'NFP_ContaCorrente..Marcacontainvalida'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Resgate()