const app = require('express').Router();
let eventController = require('../../controllers/parent/event.controller');

app.get('/list', eventController.listEvents);
app.get('/get', eventController.getEvent);

module.exports = app;