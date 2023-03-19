const app = require('express').Router()
let childController = require('../../controllers/child/child.controller')

app.get('/getChildren', childController.getChildren)

module.exports = app