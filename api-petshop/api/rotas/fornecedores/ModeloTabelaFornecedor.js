const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true, // não alterar o nome da tabela
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao', // traduzindo o nome da coluna para português
    updatedAt: 'dataAtualizacao', // traduzindo o nome da coluna para português
    version: 'versao'
}

module.exports = instancia.define('fornecedor', colunas, opcoes)