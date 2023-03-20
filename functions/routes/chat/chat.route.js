let app = require('express').Router();
let chatController = require('../../controllers/chat/chat.controller');

app.post('/sendMessage', chatController.sendMessage);
app.delete('/deleteMessage', chatController.deleteMessage);
app.get('/listMessages', chatController.listMessages);
app.get('/getChat', chatController.getChat)

module.exports = app;