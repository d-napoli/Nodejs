const express = require('express')
const routes = require('./routes') // requisitando o arquivo index.js dentro de routes

const app = express()
const port = 3000 // porta que o servidor será utilizado, 3000 é padrão para serviços que usam express

routes(app) // iniciando o método que está dentro do index.js de routes, e estamos passando como parâmetro o app

// express continuar ouvindo o servidor para checar se as coisas estão indo okay
// recebe dois parâmetros, o primeiro é a porta que ele deve usar
// segundo parâmetro é um callback para retorno das informações
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`))

module.exports = app