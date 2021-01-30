const fs = require('fs') // requiring file system
const path = require('path') // lib nativa do node, serve para utilizar com arquivos e caminhos

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho) // descobrindo a extensão do arquivo
    
    // checando se a extensão do arquivo informado consta nos tipos válidos
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1
    
    if(tipoEhValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe( fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = `Extensão de arquivo ${tipo} é inválida`
        console.log('Erro! Tipo de arquivo inválido')
        callbackImagemCriada(erro)
    }
}