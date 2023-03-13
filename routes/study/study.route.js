const app = require('express').Router()
let studyController = require('../../controllers/parent/study.controller')

app.post('/addSubject', studyController.addSubject)

module.exports = app