const app = require('express').Router()
let helperController = require('../../controllers/helper/notification.controller')

app.get('/list', helperController.listNotifications)

module.exports = app