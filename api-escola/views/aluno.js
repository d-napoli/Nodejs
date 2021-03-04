const query = require('../infraestrutura/database/queries')

module.exports = {
    add(student) {
        const sql = "INSERT INTO aluno SET ?"
        return query(sql, student)
    },

    findAll() {
        const sql = "SELECT * FROM aluno"
        return query(sql)
    },

    delete(matricula) {
        const sql = "DELETE FROM aluno WHERE matricula = ?"
        return query(sql, matricula)
    },

    async findById(matricula) {
        const sql = `
                        SELECT matricula, primeiro_nome, ultimo_nome, dt_nascimento, email, sexo.sexo, turmas_id
                        FROM aluno
                        INNER JOIN sexo ON sexo.id = aluno.sexo_id
                        WHERE matricula = ?
                    `
        const result = await query(sql, matricula)
        return result
    }
}