const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute') // importando as rotas de pessoas
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

// exportando uma função, que recebe como parâmetro um "app" retornando uma arrow function de callback
module.exports = app => {
    app.use(bodyParser.json())   // informando que durante a execução do servidor,
                                // o BodyParser funcionará como espécie de middleware para as requisições de JSON

    app.use(
        pessoas,
        niveis,
        turmas
    ) // indicando para utilizar a rotas de pessoas

    // app.get utiliza dois parâmetros para a execução o primeiro parâmetro é o caminho, string, rota em que o código será executado
    // o segundo parâmetro é um objeto, que recebe requisição e resposta
    // app.get('/', (req, res) => res.send('Olá Mundo!'))
}