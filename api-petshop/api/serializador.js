const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados) {
        let tag = this.tagSingular

        if(Array.isArray(dados)) {
            tag = this.tagPlural
            
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }

        return jsontoxml({ [tag]: dados })
    }

    serializar(dados) {
        dados = this.filtrar(dados)
        if(this.contentType === 'application/json')
            return this.json(dados)

        if(this.contentType === 'application/xml')
            return this.xml(dados)
            
        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados) { 
        const novoObjeto = {} // novo objeto

        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo))
                novoObjeto[campo] = dados[campo]
        })

        return novoObjeto
    }

    filtrar(dados) {
        if(Array.isArray(dados))  // checando se é um array o que foi informado
            dados = dados.map( item => { return this.filtrarObjeto(item) } ) 
        else 
            dados = this.filtrarObjeto(dados)

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [ // lista de campos públicos de fornecedores
                                // porém é possível adicionar campos extras além desses informados
                                // portanto vamos fazer o concat dos campos extras ao fim da função
                                // caso a variável "campos extras" venha vazia, é informado um array sem nada
            'id',
            'empresa',
            'categoria'
        ].concat(camposExtras || [])
        this.tagSingular = 'fornecedor',
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'mensagem',
            'id'
        ].concat(camposExtras || [])
        this.tagSingular = 'erro',
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}