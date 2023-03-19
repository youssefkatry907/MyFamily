const app = require('express').Router()
let studyController = require('../../controllers/parent/study.controller')

app.post('/addSubject', studyController.addSubject)
app.get('/getStudies', studyController.getStudies)

module.exports = app