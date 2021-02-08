const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept') // formato que o cliente está solicitando

    if (formatoRequisitado === '*/*')
        formatoRequisitado = 'application/json'

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) { // checando se o formato requisitado é um dos aceitos
        resposta.status(406).end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, requisicao, resposta, proximo) => {
    let status = 500

    if( erro instanceof NaoEncontrado )
        status = 404
    
    if( erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos )
        status = 400

    if( erro instanceof ValorNaoSuportado )
        status = 406

    resposta.status(status)

    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type')
    )

    resposta.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(3000, () => {
    console.log('A api está funcionando!')
})