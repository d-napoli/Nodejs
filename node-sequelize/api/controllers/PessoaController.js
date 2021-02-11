const database = require('../models') // pega o arquivo index.js dentro da pasta models

class PessoaController {
    // método para pegar todas as pessoas do banco
    // será um método assincrono
    static async pegaTodasAsPessoas(req, res) {
        // try catch pra poder retornar as informações corretas
        try {
            // dentro dessa const vamos guardar o resultado que vem do banco de dados
            // vai aguardar o banco retornar as infos, antes de continuar a execução do código
            // o próprio sequelize vai consultar a tabela de pessoas
            // ele sabe qual a tabela porque utiliza o "Pessoas" em maiúsculo que vem do objeto "database" importado em cima
            const todasAsPessoas = await database.Pessoas.findAll()

            // retornando as informações
            // coloca o status de 200, quer dizer que está tudo okay
            // depois coloca o método .json para enviar de volta as informações
            return res.status(200).json(todasAsPessoas)
        } catch(error) {
            return res.status(500).json(error.message) // retorna o erro com status de 500 (Internal Server Error)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params

        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json( umaPessoa )

        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body // informacoes que recebemos do usuario via requisicao

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params
        const novosDados = req.body

        try {
            await database.Pessoas.update(novosDados, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(pessoaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa(req, res) {
        const { id } = req.params

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `Pessoa de id ${id} deletado com sucesso` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    /* =========== Matriculas =========== */
    static async atualizarMatricula(req, res) {
        const { matriculaId, estudanteId } = req.params
        const novosDados = req.body

        try {
            await database.Matriculas.update(novosDados, { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            const MatriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            return res.status(200).json(MatriculaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarMatricula(req, res) {
        const { matriculaId, estudanteId } = req.params

        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            return res.status(200).json({ message: `Matricula de id ${matriculaId} deletado com sucesso` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params

        // gerando um novo objeto, é utilizado a técnica de spread, já pega o array que havia sido informado
        // e concatena com a nova informação de estudanteId que recebemos do parâmetro da requisição
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) } // informacoes que recebemos do usuario via requisicao

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res.status(200).json( umaMatricula )

        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController