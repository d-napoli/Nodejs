const axios = require('axios')
const moment = require('moment')
const { query } = require('../infraestrutura/database/conexao')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimentos')

class Atendimento {
    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao) // validando se a data não é no passado
        this.clienteEhValido = tamanho => tamanho >= 5 // validando o tamanho do nome do cliente

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Nomes precisam ter no mínimo 5 caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const formatoData = 'YYYY-MM-DD HH:MM:SS'
        
        const dataCriacao = moment().format(formatoData)
        const data = moment(atendimento.data, 'DD/MM/YYYY').format(formatoData)

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado).then(resultados => {
                const id = resultados.insertId
                return ({ ...atendimento, id })
            })
        }
    }

    lista(res) {
        return repositorio.lista()
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente

            if(erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                
                atendimento.cliente = data
                
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