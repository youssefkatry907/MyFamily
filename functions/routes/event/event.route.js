const app = require('express').Router();
let eventController = require('../../controllers/parent/event.controller');

app.get('/list', eventController.listEvents);
app.post('/add', eventController.addEvent);

module.exports = app;