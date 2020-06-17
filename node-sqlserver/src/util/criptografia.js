const bcrypt = require('bcrypt')

const geraSenhaHash = async senha => {
  const salt = await bcrypt.genSalt(10)
  const senhaHash = await bcrypt.hash(senha, salt)
  return senhaHash
}

const hashCode = s => {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0
  }
  return h
}

module.exports = {
  geraSenhaHash,
  hashCode
}

/*
const verificaSenha = (senha, senhaHash) => {
  const isSenhaValida = await bcrypt.compare(senha, senhaHash)
  
  if (!isSenhaValida) {
    throw new Error('Usuário ou senha inválidos');
  }
  return true
}

async function checkUser(username, password) {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
      //login
  }

  //
}
*/

