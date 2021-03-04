const Student = require('../models/aluno')
const StudentView = require('../views/aluno')

module.exports = app => {
    app.post('/alunos', async (req, res) => {
        try {
            const receivedData = req.body
            const student = new Student(receivedData)
            await student.add()
            res.status(201)
            res.send( res.json({ student }) )
        } catch (error) {
            res.status(400)
            res.send( res.json({ message: error.message, id: error.idErro } ) )
        }
    })

    app.get('/alunos', async (req, res) => {
        try {
            const results = await StudentView.findAll()
            
            res.status(200)
            res.send( res.json({ results }) )
        } catch (error) {
            res.status(400)
            res.send( res.json({ message: error.message, id: error.idErro }) )
        }
    })

    app.delete('/alunos/:matricula', async(req, res) => {
        try {
            const matricula = req.params.matricula

            const student = new Student({ matricula: matricula })
            await student.findById()
            await student.delete()

            res.status(201)
            res.send()
        } catch (error) {
            res.status(500)
            res.send( res.json({ message: error.message, id: error.idError }) )
        }
    })

    app.put('/alunos/:matricula', async(req, res) => {
        try {
            const matricula = req.params.matricula
            const receivedData = req.body
            const data = Object.assign( {}, receivedData, { matricula: matricula } )
            const student = new Student(data)
            await student.update()
            res.status(201)
            res.send( res.json({ student }) )
        } catch(error) {
           res.status(500)
           res.send( res.json({ message: error.message, id: error.idError }) )
        }
    })

    app.get('/alunos/:matricula', async (req, res) => {
        try {
            const matricula = req.params.matricula

            const student = new Student({ matricula: matricula })
            await student.findById()

            res.status(200)
            res.send( res.json({ student }) )
        } catch (error) {
            res.status(500)
            res.send( res.json({ message: error.message, id: error.idError }) )
        }
    })
}