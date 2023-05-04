const app = require('express').Router()
let parentController = require('../../controllers/parent/notification.controller')

app.get('/list', parentController.listNotifications)

module.exports = app