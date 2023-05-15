const app = require('./app')
const socketIo = require('socket.io')
const http = require('http')
const socketHandler = require('./socket')

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type']
};

//connect server

let server = http.createServer(app)

let io = socketIo(server, {
    cors: corsOptions
})

socketHandler(io)

server.listen(process.env.PORT, () => {
    console.log("listening on the port!")
})

module.exports = server;