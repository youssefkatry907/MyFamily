const app = require('express').Router()
let childController = require('../../controllers/child/notification.controller')

app.get('/list', childController.listNotifications)

module.exports = app