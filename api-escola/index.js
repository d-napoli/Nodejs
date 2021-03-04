const customExpress = require('./config/customExpress')
const conection = require('./infraestrutura/database/conection')

conection.connect(error => {
    if(error)
        console.log(error)
    else {
        console.log("Conected with the database")
        const app = customExpress()
        app.listen(3000, () => console.log('App running on the port 3000'))
    }
})