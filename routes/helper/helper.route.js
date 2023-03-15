let app = require('express').Router();
let helperController = require('../../controllers/helper/helper.controller');

app.get('/getHelpers', helperController.getHelpers);

module.exports = app;