const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async(requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch(erro) {
        resposta.status(400).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch(erro) {
        resposta.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id }) // novo objeto criado com o id do fornecedor informado
        const fornecedor = new Fornecedor(dados) // cria um objeto de fornecedor com os dados
        await fornecedor.atualizar()
        resposta.end()
    } catch(erro) {
        resposta.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        // não é necessário enviar parâmetro para essas funções porque elas são métodos da classe fornecedor
        // basta chamar o método carrega, pois uma vez que o fornecedor não existir, já retornaria um erro e já iria direto para o catch, informando para o user
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.end()
    } catch(erro) {
        resposta.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador