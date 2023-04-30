const app = require('express').Router()
let childController = require('../../controllers/child/child.controller')

app.get('/getChildren', childController.getChildren)
app.post('/login', childController.login)
app.put('/logout', childController.logout)

module.exports = app