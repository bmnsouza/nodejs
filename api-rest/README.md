# api-rest
API REST usando o `Node.js`, biblioteca `express`, banco de dados `MongoDB` junto com `mongoose` para criação de esquemas e modelos dos dados.

APIs REST nos ajudam a separar nosso código backend do frontend para que possamos usá-lo em vários aplicativos (mobile apps, web apps, etc).

Neste projeto criamos uma API simples com todos os métodos úteis (GET, POST, DELETE, PATCH).

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
npm install cors
npm install dotenv
npm install express
npm install mongoose
npm install nodemon --save-dev
```
