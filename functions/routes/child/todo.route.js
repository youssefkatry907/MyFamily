const app = require('express').Router()

let childController = require('../../controllers/child/todo.controller')

app.get('/list', childController.list)
app.put('/update', childController.update)

module.exports = app