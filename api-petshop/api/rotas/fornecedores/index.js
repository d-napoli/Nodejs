const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../serializador').SerializadorFornecedor

roteador.get('/', async(requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
    
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao'] // campos extras que queremos trazer
                                                                  // ao consultar detalhes do fornecedor
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id }) // novo objeto criado com o id do fornecedor informado
        const fornecedor = new Fornecedor(dados) // cria um objeto de fornecedor com os dados
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()
    } catch(erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        // não é necessário enviar parâmetro para essas funções porque elas são métodos da classe fornecedor
        // basta chamar o método carrega, pois uma vez que o fornecedor não existir, já retornaria um erro e já iria direto para o catch, informando para o user
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.end()
    } catch(erro) {
        proximo(erro)
    }
})

module.exports = roteador