const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const formatoData = 'YYYY-MM-DD HH:MM:SS'
        
        const dataCriacao = moment().format(formatoData)
        const data = moment(atendimento.data, 'DD/MM/YYYY').format(formatoData)
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) // validando se a data não é no passado
        const clienteEhValido = atendimento.cliente.length >= 5 // validando o tamanho do nome do cliente

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nomes precisam ter no mínimo 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            const sql = "INSERT INTO Atendimentos SET ?"
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro) // altera o status do request para 400 em caso de erro, daí o usuário fica ciente de que alguma coisa errada aconteceu
                } else {
                    res.status(201).json(atendimento) // em caso de sucesso, retorna o status de 201, significa que foi criado com sucesso
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]

            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        // a função altera, retorna para o usuário, as informações que ele mesmo alterou
        // uma vez que os dados já tiverem ido para o banco de dados, é uma boa ideia fazer isso
        // mais semântico e prático na hora de retornar as informações
        if(valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    delete(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`
        
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Atendimento