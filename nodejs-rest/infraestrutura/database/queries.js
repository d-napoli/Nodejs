const conexao = require('./conexao')

// vamos usar promisses para desacoplar o conteúdo dos arquivos uns dos outros
// as promisses vão permitir que o model e controller fiquem desacoplados
// além de permitir resultados asyncronos da aplicação
// o usuário não vai ficar travado na execução
const executaQuery = (query, parametros = '') => {
    // resolve = tudo ceto
    // resejct = algum erro aconteceu
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erros, resultados, campos) => {
            if(erros) {
                console.log(erros)
                reject(erros) // ao invés de dar um return, vamos mandar um reject
                              // e a camada de cima da aplicação lida com essa informação de rejeição
            } else {
                resolve(resultados) // mesma coisa do reject, vamos mandar um resolve e a camada de cima lida com a info
            }
        })
    })
}

module.exports = executaQuery