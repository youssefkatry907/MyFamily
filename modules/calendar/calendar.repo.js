let Calendar = require('./calendar.model')

exports.addEvent = async (form) => {
    let event = new Calendar(form)
    return await event.save()
}

exports.getEvents = async () => {
    return await Calendar.find()
}