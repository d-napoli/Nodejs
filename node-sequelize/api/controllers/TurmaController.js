const database = require('../models')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll()
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params

        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json( umaTurma )

        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body // informacoes que recebemos do usuario via requisicao

        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novosDados = req.body

        try {
            await database.Turmas.update(novosDados, { where: { id: Number(id) } })
            const TurmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(TurmaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params

        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `Turma de id ${id} deletado com sucesso` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController