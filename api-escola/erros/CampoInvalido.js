class CampoInvalido extends Error {
    constructor(campo) {
        const mensagem = `The field '${campo}' is invalid`
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido