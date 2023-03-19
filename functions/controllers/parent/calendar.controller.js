let calendar = require('../../modules/calendar/calendar.repo')

exports.addEvent = async (req, res) => {
    let event = await calendar.add(req.body)
    res.status(200).json(event)
}

exports.getEvents = async (req, res) => {
    let events = await calendar.get()
    res.status(200).json(events)
}