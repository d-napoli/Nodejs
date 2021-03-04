const conexao = require('./conection')

const executeQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, params, (errors, results, fields) => {
            if(errors)
                reject(errors)
            else
                resolve(results)
        })
    })
}

module.exports = executeQuery