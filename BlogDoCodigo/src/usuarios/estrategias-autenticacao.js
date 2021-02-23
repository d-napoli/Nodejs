const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

const Usuario = require('./usuarios-modelo')
const { InvalidArgumentError } = require('../erros')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

function verificaUsuario(usuario) {
    if(!usuario)
        throw new InvalidArgumentError('Não existe o usuário com esse e-mail')
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(!senhaValida)
        throw new InvalidArgumentError('E-mail ou senha inválidos')
}

passport.use (
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false // o sistema não usa sessão, usa Json Web Token, por isso a sessão é false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email)
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senhaHash)
            done(null, usuario) // dois parâmetros o primeiro é o de erro, por isso é informado nulo
        } catch (erro) {
            done(erro)
        }
    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const usuario = await Usuario.buscaPorId(payload.id)
                done(null, usuario)
            } catch (erro) {
                done(erro)
            }
        }
    )
)