let mongoose = require('mongoose')

let calendarSchema = mongoose.Schema({
    child: { type: mongoose.Types.ObjectId, ref: 'childrens' },
    eventList: [
        {
            eventName: { type: String, required: true },
            description: { type: String },
            Date: { type: String },
            startTime: { type: String },
            endTime: { type: String },
        }
    ]
})

let calendarModel = mongoose.model('calendars', calendarSchema)

module.exports = calendarModel