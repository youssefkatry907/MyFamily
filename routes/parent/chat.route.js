let app = require('express').Router();
let chatController = require('../../controllers/parent/chat.controller');

app.post('/sendMessage', chatController.sendMessage);
app.delete('/deleteMessage', chatController.deleteMessage);
app.get('/listMessages', chatController.listMessages);
app.get('/list', chatController.listChat)

module.exports = app;