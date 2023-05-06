const app = require('./app')
const chatRepo = require("../modules/Chat/chat.repo")
const chatController = require("../controllers/parent/chat.controller")

let server = app.listen(8000, () => {
    console.log(`Server is up and runing on port 8000!`)
})

var io = require('socket.io')(server);

io.on('connection', (socket) => {


    console.log('a user connected');

    socket.on('sendMessage', async (msg) => {
        let check = await chatRepo.sendMessage(msg);
        let chatId = check.create ? check.chatId : msg.chatId
        const chat = await chatRepo.list({ _id: chatId });
        const messages = chat.messages;
        io.emit('listMessages', messages.records);
        console.log(msg);
    });

    socket.on('deleteMessage', async (msg) => {
        const result = await chatRepo.remove(msg.messageId);
        io.emit('deleteMessage', result);
    })

    socket.on('listMessages', async (chatId) => { // list
        const chat = await chatRepo.list({ _id: chatId });
        const messages = chat.messages;
        io.emit('listMessages', messages); //listen , msg ==> receiver, text
        console.log(messages);
    });

    socket.on('disconnected', () => {
        console.log("socket.io : User disconnected: ", socket.id);
    })

});

module.exports = app;