const express = require('express')
const app = express()
const databaseConnection = require('./database').connection
const routes = require('../routes/index.route')
const { handleFileUploadErrors } = require('../helpers/uploader.helper')
require('dotenv').config()

databaseConnection();
// app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(routes);
app.use(handleFileUploadErrors)


app.get('/', (req, res) => {
    res.send('hello world!')
})

const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
    target: "https://us-central1-family-88c8c.cloudfunctions.net",
    ws: true,
});

const server = http.createServer((req, res) => {
    // Proxy all incoming requests to the target server
    proxy.web(req, res);
});

const port = 0;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


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
        const chat = await chatRepo.find(id.chat ? { _id: id.chat } : { sender: id.sender });
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

module.exports = app