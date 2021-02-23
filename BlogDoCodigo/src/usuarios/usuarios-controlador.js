const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');

const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const moment = require('moment')

function criaTokenJWT(usuario) {
  const payload = { id: usuario.id }
  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' }) // puxa a chave usando o arquivo .env
  return token
}

function criaTokenOpaco(usuario) {
  const tokenOpaco = crypto.randomBytes(24).toString('hex')
  const dataExpiracao = moment().add(5, 'd').unix() // momento atual + 5 dias

  return tokenOpaco
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha)
      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  async login(req, res) {
    try {
      const accessToken = criaTokenJWT(req.user)
      const refreshToken = criaTokenOpaco(req.user)

      res.set('Authorization', accessToken)
      res.status(200).json({ refreshToken })
    } catch (erro) {
      res.status(500).json({ erro: erro.message })
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
