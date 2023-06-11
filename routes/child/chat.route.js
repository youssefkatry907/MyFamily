let app = require('express').Router();
let chatController = require('../../controllers/child/chat.controller');

app.get('/list', chatController.listChat);
app.get('/listMessages', chatController.listMessages);

module.exports = app;