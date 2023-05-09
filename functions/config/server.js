const app = require('./app')
const chatRepo = require("../modules/Chat/chat.repo")
const groupRepo = require("../modules/Group/group.repo")

let server = app.listen(8000, () => {
    console.log(`Server is up and runing on port 8000!`)
})

var io = require('socket.io')(server);

io.on('connection', (socket) => {


    console.log('a user connected');

    socket.on('sendMessage', async (msg) => {
        let check = await chatRepo.sendMessage(msg);
        let chatId = check.create ? check.chatId : msg.chatId
        const chat = await chatRepo.find({ _id: chatId });
        const messages = chat.records.messages;
        io.emit('listMessages', messages);
    });

    socket.on('listMessages', async (id) => { // list
        const chat = await chatRepo.find(id.chat ? { _id: id.chat } : {sender: id.sender});
        const messages = chat.records ? chat.records.messages : [];
        io.emit('listMessages', messages); //listen , msg ==> receiver, text
    });

    socket.on('sendGroupMessage', async (msg) => {
        let check = await groupRepo.sendMessage(msg);
        let groupId;
        if (check.success) {
            groupId = msg.chatId;
            const group = await groupRepo.get({ _id: groupId });
            const messages = group.record.messages;
            io.emit('listGroupMessages', messages);
        }
    });

    socket.on('listGroupMessages', async (groupId) => { // list
        const group = await groupRepo.get({ _id: groupId });
        const messages = group.record.messages;
        io.emit('listGroupMessages', messages);
    });

    socket.on('deleteMessage', async (msg) => {
        const result = await chatRepo.remove(msg.messageId);
        io.emit('deleteMessage', result);
    })

    socket.on('disconnected', () => {
        console.log("socket.io : User disconnected: ", socket.id);
    })

});

module.exports = app;