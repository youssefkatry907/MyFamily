const app = require('./app')
const chat = require("../modules/Chat/chat.repo")

let server = app.listen(8000, () => {
    console.log(`Server is up and runing on port 8000!`)
})

var io = require('socket.io')(server);

io.on('connection', (socket) => {


    console.log('a user connected');

    socket.on('sendMessage', async (msg) => {
        await chat.create(msg);
        io.emit('sendMessage', msg);
        console.log(msg);
    });

    socket.on('deleteMessage', async (msg) => {
        const result = await chat.remove(msg.messageId);
        io.emit('deleteMessage', result);
    })

    socket.on('listMessages', async (receiver) => { // list
        const messages = await chat.list({ receiver: receiver.userId });
        io.emit('listMessages', messages); //listen , msg ==> receiver, text
        console.log(messages);
    });

    socket.on('disconnected', () => {
        console.log("socket.io : User disconnected: ", socket.id);
    })

});

module.exports = app;