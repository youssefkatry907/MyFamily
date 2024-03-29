let mongoose = require('mongoose')

let notificationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true },

})

let notificationModel = mongoose.model('notifications', notificationSchema)

module.exports = notificationModel