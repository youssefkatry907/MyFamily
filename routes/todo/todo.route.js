const app = require('express').Router()
let todoController = require('../../controllers/parent/todo.controller')

app.post('/addTask', todoController.addTask);

module.exports = app