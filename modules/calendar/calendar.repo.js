let Calendar = require('./calendar.model')

exports.add = async (form) => {
    let event = new Calendar(form)
    return await event.save()
}

exports.get = async () => {
    return await Calendar.find()
}