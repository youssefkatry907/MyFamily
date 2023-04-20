let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;
//let parentModel = require('../Parent/parent.model')

let eventSchema = mongoose.Schema({
    child: { type: mongoose.Types.ObjectId, ref: 'childrens', required: true },
    eventName: { type: String, required: true },
    events: { type: Array },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now }
})



let eventModel = mongoose.model('events', eventSchema)

module.exports = eventModel

