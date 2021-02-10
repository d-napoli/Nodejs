const { Router } = require('express') // Módulo router da lib do express
const PessoaController = require('../controllers/PessoaController') // importando o controller de pessoas

const router = Router()

// não é necessário declarar a classe PessoaContoller, porque lá no controller foi inicializado como Static
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)

// quanto tem :id quer dizer que é uma variável que a rota deve receber por parte do usuário
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router