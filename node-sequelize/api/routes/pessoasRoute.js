const { Router } = require('express') // Módulo router da lib do express
const PessoaController = require('../controllers/PessoaController') // importando o controller de pessoas

const router = Router()

// não é necessário declarar a classe PessoaContoller, porque lá no controller foi inicializado como Static
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)

router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)

module.exports = router