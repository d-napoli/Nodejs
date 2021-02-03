const Sequelize = require('sequelize')

const config = require('config')

const instancia = new Sequelize(
    'petshop', // banco de dados
    'root', // usuário
    'admin', // senha
    {
        host: 'localhost', // host do banco de dados
        dialect: 'mysql' // tipo de banco de dados que estamos utilizando
    }
)

module.exports = instancia