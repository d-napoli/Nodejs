class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente VARCHAR(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime not null, status varchar(20) not null, observacoes text, primary key(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela atendimentos criada com sucesso!')
            }
        })
    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id INT NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, imagem varchar(200), PRIMARY KEY(id))'

        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela pets criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas