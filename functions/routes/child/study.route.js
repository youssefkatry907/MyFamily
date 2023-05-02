const app = require('express').Router()

let childController = require('../../controllers/child/study.controller')

app.post('/add', childController.add)
app.get('/list', childController.list)

module.exports = app