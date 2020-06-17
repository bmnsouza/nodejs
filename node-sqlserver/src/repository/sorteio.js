const { executaBulk, executaStoredProcedure, executaQuery, executaTransaction } = require('../database/requisicao')
const mssql = require('mssql')

class Sorteio {

  // Listar Sorteio
  lista() {
    const query = 'select * from NFP_ContaCorrente..TB_SOR_SORTEIO'
    return executaQuery(query)
  }

  consulta(params) {
    const query = 'select * from NFP_ContaCorrente..TB_SOR_SORTEIO where sor_codSorteio = @codSorteio'
    return executaQuery(query, params)
  }

  consultaPremios(params) {
    const query = `select val_premio, quantidade, tp_premio from (select sop_valPremio
      val_premio, count(sop_valpremio) quantidade, sop_tppremio tp_premio from
      NFP_ContaCorrente..TB_SOP_SORTEIO_PREMIO where sor_codSorteio = @codSorteio
      group by sop_valPremio, sop_tppremio) sop order by tp_premio, val_premio desc`
    return executaQuery(query, params)
  }

  cadastra(params) {
    let query = [
      `insert into NFP_ContaCorrente..TB_SOR_SORTEIO (sor_codSorteio, sor_dtInicio, sor_dtFim,
      sor_dtRealizacao, sor_dscObservacao) values (${params.codSorteio}, '${params.dtInicio}', 
      '${params.dtFim}', '${params.dtRealizacao}', '${params.dscObservacao}')`
    ]

    let codPremio = 0
    params.premios.forEach(premio => {
      for (let i = 1; i <= premio.qtdPremio; i++) {
        query.push(
          `insert into NFP_ContaCorrente..TB_SOP_SORTEIO_PREMIO (sor_codSorteio, sop_codPremio, sop_valPremio,
          sop_tpPremio) values (${params.codSorteio}, ${++codPremio}, ${premio.valPremio}, '${premio.tpPremio}')`
        )
      }
    })

    return executaTransaction(query)
  }

  totalBilhetes(params) {
    const query = `select isnull(sum(crc_vlCredito), 0) totalBilhetes from (select vw.crc_cpfCnpj,
      (cast(sum(vw.crc_vlCredito)/100 as int)) crc_vlCredito from NFP_ContaCorrente..vw_crc_credito_consumidor vw
      where cast(vw.crc_dtMovimentacao as date) between @dtInicio and @dtFim group by vw.crc_cpfCnpj) vw
      where vw.crc_vlCredito > 0`
    return executaQuery(query, params)
  }

  bilhetesGerados(params) {
    const query = `select count(*) quantidade from NFP_ContaCorrente..TB_BIL_BILHETE where sor_codSorteio = @codSorteio`
    return executaQuery(query, params)
  }

  cadastrarBilhetes(params) {
    // Adicona as colunas da tabela
    let table = new mssql.Table('TB_BIL_BILHETE')
    table.create = true
    table.columns.add('bil_numBilhete', mssql.Int, { nullable: false })
    table.columns.add('sor_codSorteio', mssql.Int, { nullable: false })
    table.columns.add('sop_codPremio', mssql.Int, { nullable: true })
    table.columns.add('bil_cpfCnpj', mssql.VarChar(11), { nullable: false })
    table.columns.add('bil_cnpjEntidade', mssql.VarChar(14), { nullable: true })

    // Adiciona as linhas da tabela
    for (let i = 0; i < params.length; i++) {
      table.rows.add(params[i].numBilhete, params[i].codSorteio, null,
        params[i].cpfConsumidor, params[i].cnpjEntidade)
    }

    return executaBulk(table)
  }

  bilhetesConsumidor(params) {
    const query = `select crc_cpfCnpj consumidor, crc_vlCredito quantidade, crc_cnpjEntidade entidade
      from (select crc.crc_cpfCnpj, (cast(sum(crc.crc_vlCredito)/100 as int)) crc_vlCredito,
      (select ucn.cnpj from UsuarioCAT..tb_UsuarioCat_CNPJ ucn where upper(ucn.estado) in ('ATIVO', 'BLOQUEADO')
      and upper(ucn.situacao) = 'ATIVO' and ucn.idcnpj = ucp.idcnpj) crc_cnpjEntidade
      from NFP_ContaCorrente..vw_crc_credito_consumidor crc join UsuarioCAT..tb_UsuarioCat_CPF ucp
      on (crc.crc_cpfCnpj = ucp.cpf) where cast(crc.crc_dtMovimentacao as date) between @dtInicio and @dtFim
      group by crc.crc_cpfCnpj, ucp.idcnpj) crc where crc.crc_vlCredito > 0 order by 1`
    return executaQuery(query, params)
  }

  atualiza(params) {
    const query = `update NFP_ContaCorrente..TB_SOR_SORTEIO set sor_numFaixaIni = 1,
      sor_numFaixaFim = @numFaixaFim, sor_numSemente = @numSemente, sor_flSorteio = 1
      where sor_codSorteio = @codSorteio`
    return executaQuery(query, params)
  }

  bilhetesPremiados(params) {
    const query = `select sop.sop_codPremio COD_PREMIO, sop.sop_valPremio VAL_PREMIO, bil.bil_numBilhete
      NUM_BILHETE, sop.sop_tpPremio TP_PREMIO from NFP_ContaCorrente..TB_SOP_SORTEIO_PREMIO sop 
      left join NFP_ContaCorrente..TB_BIL_BILHETE bil on (sop.sop_codPremio = bil.sop_codPremio and 
      sop.sor_codSorteio = bil.sor_codSorteio) where sop.sor_codSorteio = @codSorteio`
    return executaQuery(query, params)
  }

  transferePremios(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_transferir_premios_sorteio'
    return executaStoredProcedure(storedProcedure, params)
  }


  // Relatório Premiação
  relatorioPremiacao(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_rel_premiacao_sorteio'
    return executaStoredProcedure(storedProcedure, params)
  }



  // Expiração Prêmios
  premiosExpirados() {
    const storedProcedure = 'NFP_ContaCorrente..sp_premios_expirados'
    return executaStoredProcedure(storedProcedure)
  }

  premiosNaoExpirados() {
    const storedProcedure = 'NFP_ContaCorrente..sp_premios_nao_expirados'
    return executaStoredProcedure(storedProcedure)
  }



  // Relatório Entidades
  entidadeIndicacao(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_entidade_indicacao_sorteio'
    return executaStoredProcedure(storedProcedure, params)
  }

  entidadeBilhete(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_entidade_bilhete_sorteio'
    return executaStoredProcedure(storedProcedure, params)
  }



  // Relatório Consumidor Bilhete
  consumidorBilhete(params) {
    const storedProcedure = 'NFP_ContaCorrente..sp_consumidor_bilhete_sorteio'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new Sorteio()