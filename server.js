const express = require('express')
//inicializacion del server
const app = express()
const config = require('./config')
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')  
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')

//coneccion con la base de datos 

db(config.dbUrl)

 


//middlewares
app.use(cors())
app.use(bodyParser.json()) 

socket.connect(server)
//routes

router(app)
app.use('/app', express.static('public'))

//ports

server.listen(config.port, function(){
    console.log(`la app se esta ejecutando en ${config.host}:${config.port}`)
})