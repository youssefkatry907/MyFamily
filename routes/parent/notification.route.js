const app = require('express').Router()
let parentController = require('../../controllers/parent/notification.controller')

app.get('/list', parentController.listNotifications)
app.post('/forward', parentController.forwardNotification)

module.exports = app