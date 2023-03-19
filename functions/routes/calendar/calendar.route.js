let app = require('express').Router()
let calendarController = require('../../controllers/parent/calendar.controller')

app.get('/getEvents', calendarController.getEvents)
app.post('/addEvent', calendarController.addEvent)

module.exports = app