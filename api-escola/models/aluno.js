const Views = require('../views/aluno')
const CampoInvalido = require('../erros/CampoInvalido')

class Student {
    constructor({ matricula, primeiro_nome, ultimo_nome, email, dt_nascimento, sexo_id, turmas_id }) {
        this.matricula = matricula
        this.primeiro_nome = primeiro_nome
        this.ultimo_nome = ultimo_nome
        this.email = email
        this.dt_nascimento = dt_nascimento
        this.sexo_id = sexo_id
        this.turmas_id = turmas_id
    }

    async add() {
        this.validar()
        const result = await Views.add({
            primeiro_nome: this.primeiro_nome,
            ultimo_nome: this.ultimo_nome,
            email: this.email,
            dt_nascimento: this.dt_nascimento,
            sexo_id: this.sexo_id,
            turmas_id: this.turmas_id
        })

        this.matricula = result.matricula
    }

    async findById() {
        const result = await Views.findById( this.matricula )
        try {
            const result_ = JSON.parse(JSON.stringify(result[0]))
            this.matricula = result_.matricula
            this.primeiro_nome = result_.primeiro_nome
            this.ultimo_nome = result_.ultimo_nome
            this.email = result_.email
            this.dt_nascimento = result_.dt_nascimento
            this.sexo_id = result_.sexo
            this.turmas_id = result_.turmas_id
        } catch(error) {
            throw new Error('Aluno não encontrado')
        }
    }

    async delete() {
        try {
            await Views.delete( this.matricula )
        } catch(error) {
            throw new Error(`Erro ao deletar ${error}`)
        }
    }

    validar() {
        // campos que são obrigatórios para a criação do usuário
        const camposObrigatorios = {
            "primeiro_nome": {
                "minLength": 3,
                "maxLength": 45,
                "type": "string"
            },
            "ultimo_nome": {
                "minLength": 3,
                "maxLength": 45,
                "type": "string"
            },
            "email": {
                "minLength": 3,
                "maxLength": 45,
                "type": "string"
            },
            "dt_nascimento": {
                "minLength": 3,
                "maxLength": 45,
                "type": "string"
            },
            "sexo_id": {
                "minLength": 1,
                "maxLength": 45,
                "type": "string"
            },
            "turmas_id": {
                "minLength": 1,
                "maxLength": 45,
                "type": "string"
            }
        }

        for (var key in camposObrigatorios) {
            if (camposObrigatorios.hasOwnProperty(key)) {                
                // campo => key
                // índices do dicionario => camposObrigatorios[key]['campo']
                // valor Informado pelo user => this[key]

                if (typeof this[key] !== "undefined") {
                    if(this[key].length < camposObrigatorios[key]['minLength'] || this[key].length > camposObrigatorios[key]['maxLength'])
                        throw new CampoInvalido(key)

                    if(typeof this[key] !== camposObrigatorios[key]['type'])
                        throw new CampoInvalido(key)
                } else {
                    throw new CampoInvalido(key)
                }
            }
        }
    }
}

module.exports = Student