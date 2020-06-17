const BLOQUEIO_CONTA = ['S', 'N']

const CAMPOS_EMPRESA = ['CNPJ', 'IE']

const ESTADO_CONSUMIDOR = ['', 'ATIVO', 'INATIVO', 'BLOQUEADO']

const ESTADO_CONTA = ['A', 'I']

const FILTRO = ['0', '1']

const MOD = ['CF', '01', '02', '56', 'NFC', 'NFE']

const SEM_NUMERO = 'S/N'

const SITUACAO_PROCON = ['ATIVO', 'INATIVO', 'PENDENTE']

const TP_PREMIO = ['C', 'E']

const UF = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
  'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
]

const isConfirmaSenhaValida = (senha, confirmaSenha) => {
  if (senha != confirmaSenha) {
    throw new Error('Confirmação da senha está inválida')
  }
  return true
}

const isCepValido = (cep, uf) => {
  const CEP_INVALIDO = `CEP ${cep} é inválido para UF ${uf}`

  if (!cep || !uf || !UF.includes(uf)) {
    throw new Error(CEP_INVALIDO)
  }

  cep = String(cep).replace(/[^\d]+/g, '')

  if (cep.length != 8 || /^(\d)\1+$/.test(cep)) {
    throw new Error(CEP_INVALIDO)
  }

  cep = Number(cep.slice(0, 3))

  const isInvalido = uf => {
    return {
      'SE': (cep < 490 || cep > 499),
      'BA': (cep < 400 || cep > 489),
      'SP': (cep < 10 || cep > 199),
      'PR': (cep < 800 || cep > 879),
      'AL': (cep < 570 || cep > 579),
      'PA': (cep < 660 || cep > 688),
      'RS': (cep < 900 || cep > 999),
      'GO': ((cep < 728 || cep > 767) || (cep > 729 && cep < 737)),
      'PI': (cep < 640 || cep > 649),
      'RJ': (cep < 200 || cep > 289),
      'CE': (cep < 600 || cep > 639),
      'MG': (cep < 300 || cep > 399),
      'DF': ((cep < 700 || cep > 736) || (cep > 727 && cep < 730)),
      'PE': (cep < 500 || cep > 569),
      'PB': (cep < 580 || cep > 589),
      'MA': (cep < 650 || cep > 659),
      'AM': (cep < 690 || cep > 698 || cep == 693),
      'MT': (cep < 780 || cep > 788),
      'SC': (cep < 880 || cep > 899),
      'RN': (cep < 590 || cep > 599),
      'RO': (cep < 768 || cep > 769),
      'ES': (cep < 290 || cep > 299),
      'MS': (cep < 790 || cep > 799),
      'RR': cep != 693,
      'TO': (cep < 770 || cep > 779),
      'AC': cep != 699,
      'AP': cep != 689
    }[uf]
  }

  if (isInvalido(uf)) {
    throw new Error(CEP_INVALIDO)
  }

  return true
}

const isCnpjValido = cnpj => {
  const CNPJ_INVALIDO = `CNPJ ${cnpj} é inválido`

  if (!cnpj) {
    throw new Error(CNPJ_INVALIDO)
  }

  cnpj = String(cnpj).replace(/[^\d]+/g, '')

  if (cnpj.length != 14 || /^(\d)\1+$/.test(cnpj)) {
    throw new Error(CNPJ_INVALIDO)
  }

  const t = cnpj.length - 2,
    d = cnpj.substring(t),
    d1 = parseInt(d.charAt(0)),
    d2 = parseInt(d.charAt(1)),
    calc = x => {
      let n = cnpj.substring(0, x),
        y = x - 7,
        s = 0,
        r = 0

      for (let i = x; i >= 1; i--) {
        s += n.charAt(x - i) * y--;
        if (y < 2) {
          y = 9
        }
      }

      r = 11 - s % 11
      return r > 9 ? 0 : r
    }

  if (!(calc(t) === d1 && calc(t + 1) === d2)) {
    throw new Error(CNPJ_INVALIDO)
  }

  return true
}

const isCpfValido = cpf => {
  const CPF_INVALIDO = `CPF ${cpf} é inválido`

  if (!cpf) {
    throw new Error(CPF_INVALIDO)
  }

  cpf = String(cpf).replace(/[^\d]+/g, '')

  if (cpf.length != 11 || /^(\d)\1+$/.test(cpf)) {
    throw new Error(CPF_INVALIDO)
  }

  let add = 0
  for (i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i)
  }

  let rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) {
    rev = 0
  }

  if (rev != parseInt(cpf.charAt(9))) {
    throw new Error(CPF_INVALIDO)
  }

  add = 0
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i)
  }

  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) {
    rev = 0
  }

  if (rev != parseInt(cpf.charAt(10))) {
    throw new Error(CPF_INVALIDO)
  }

  return true
}

module.exports = {
  BLOQUEIO_CONTA,
  CAMPOS_EMPRESA,
  ESTADO_CONSUMIDOR,
  ESTADO_CONTA,
  FILTRO,
  MOD,
  SEM_NUMERO,
  SITUACAO_PROCON,
  TP_PREMIO,
  UF,
  isConfirmaSenhaValida,
  isCepValido,
  isCnpjValido,
  isCpfValido
}