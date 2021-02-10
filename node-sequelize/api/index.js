const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json()) // informando que durante a execução do servidor,
                          // o BodyParser funcionará como espécie de middleware
                         // para as requisições de JSON

const port = 3000 // porta que o servidor será utilizado, 3000 é padrão para serviços que usam express


// app.get utiliza dois parâmetros para a execução
// o primeiro parâmetro é o caminho, string, rota em que o código será executado
// o segundo parâmetro é um objeto, que recebe requisição e resposta
app.get('/teste', (req, res) => res
    .status(200)
    .send({ mensagem: 'Boas Vindas à API'
}))

// express continuar ouvindo o servidor para checar se as coisas estão indo okay
// recebe dois parâmetros, o primeiro é a porta que ele deve usar
// segundo parâmetro é um callback para retorno das informações
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`))

module.exports = app