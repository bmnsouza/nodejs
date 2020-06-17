# api-auth-jwt
API REST com `Node.js`, banco de dados `MongoDB` junto com `mongoose` para criação de esquemas e modelos dos dados.

Biblioteca `bcryptjs` para criptografar senhas e `jsonwebtoken` **(JSON Web Tokens - JWT)** para autenticar rotas particulares.

## Configuração

### Criar package.json
``` node
npm init
```

### Alterar package.json
``` json
"scripts": {
  "start": "nodemon app.js"
}
```

### Instalar Dependências
``` node
npm install @hapi/joi
npm install bcryptjs
npm install cors
npm install dotenv
npm install express
npm install jsonwebtoken
npm install mongoose
npm install nodemon --save-dev
```
