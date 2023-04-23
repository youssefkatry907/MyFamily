let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;
//let parentModel = require('../Parent/parent.model')

let eventSchema = mongoose.Schema({
    child: { type: mongoose.Types.ObjectId, ref: 'childrens', required: true },
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



let eventModel = mongoose.model('events', eventSchema)

module.exports = eventModel

