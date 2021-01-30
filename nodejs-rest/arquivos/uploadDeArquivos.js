const fs = require('fs') // requiring file system


fs.createReadStream('./assets/salsisha.jpg')
    .pipe( fs.createWriteStream('./assets/salsisha-stream.jpg'))
    .on('finish', () => console.log('Imagem foi escrita com sucesso via stream'))