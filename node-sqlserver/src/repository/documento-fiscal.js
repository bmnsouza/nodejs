const { executaStoredProcedure } = require('../database/requisicao')

class DocumentoFiscal {

  // Documentos Fiscais
  cupomFiscal(params) {
    const storedProcedure = 'NFP_ECF..pr_NFo_NF_ConsultaFechada4aECF'
    return executaStoredProcedure(storedProcedure, params)
  }

  modelo1(params) {
    const storedProcedure = 'NFP_Mod1_Out..pr_NFoMod1_NF_ConsultaFechada4aNF'
    return executaStoredProcedure(storedProcedure, params)
  }

  modelo2(params) {
    const storedProcedure = 'NFP_Out..pr_NFo_NF_ConsultaFechada4aNF'
    return executaStoredProcedure(storedProcedure, params)
  }

  modeloOnline(params) {
    const storedProcedure = 'NFP_Out..pr_NFo_NF_ConsultaFechada4aNF'
    return executaStoredProcedure(storedProcedure, params)
  }

  nfce(params) {
    const storedProcedure = 'NFP_NFe..sp_nfc_consulta'
    return executaStoredProcedure(storedProcedure, params)
  }

  nfe(params) {
    const storedProcedure = 'NFP_NFe..pr_NFo_NFe_Consulta'
    return executaStoredProcedure(storedProcedure, params)
  }

}

module.exports = new DocumentoFiscal()