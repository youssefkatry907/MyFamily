let app = require('express').Router();
let helperController = require('../../controllers/helper/helper.controller');

app.get('/getHelpers', helperController.getHelpers);
app.post('/login', helperController.login);
app.put('/logout', helperController.logout);

module.exports = app;