let mongoose = require('mongoose')

let calendarSchema = mongoose.Schema({
    eventList: [
        {
            child: {type: mongoose.Types.ObjectId, ref: 'childrens'},
            eventName: {type: String, required: true},
            description: {type: String},
            Date: {type: String},
            startTime: {type: String},
            endTime: {type: String},
        }
    ]
})

let calendarModel = mongoose.model('calendars', calendarSchema)

module.exports = calendarModel