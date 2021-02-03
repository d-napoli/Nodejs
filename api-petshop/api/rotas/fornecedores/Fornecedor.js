const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        // após os dados terem sido inseridos no banco de dados
        // vamos retornar as informações para os atributos da classe
        // assim no outro arquivo conseguimos essas informações de volta
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TabelaFornecedor.pegarPorId(this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => { // loop para ver quais valores foram fornecidos pelo request
            const valor = this[campo] // nome do campo dentro do array, ex: empresa, email, categoria
            if(typeof valor === 'string' && valor.length > 0) // checa se é realmente uma string
                dadosParaAtualizar[campo] = valor
        })

        if(Object.keys(dadosParaAtualizar).length === 0) // checar se a dadosParaAtualizar tem dados lá dentro
            throw new Error('Não foram fornecidos dados para atualizar')
        
        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
        
    }

    async remover() {
        return TabelaFornecedor.remover(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0)
                throw new Error(`O campo ${campo} está inválido`) // retornando qual campo está com valor inválido
        })
    }
}

module.exports = Fornecedor