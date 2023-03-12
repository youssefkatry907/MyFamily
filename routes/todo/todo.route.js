const app = require('express').Router()
let todoController = require('../../controllers/parent/todo.controller')

app.post('/addTask', todoController.addTask);
app.get('/getTasks', todoController.getTasks);

module.exports = app