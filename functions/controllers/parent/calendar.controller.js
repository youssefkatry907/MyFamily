let calendar = require('../../modules/calendar/calendar.repo')

exports.addEvent = async (req, res) => {
    try {
        let form = req.body
        let record = await calendar.add(form)
        res.status(record.code).json({ record })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        })
    }
}

exports.getEvents = async (req, res) => {
    try {
        let events = await calendar.get()
        res.status(events.code).json({ events })
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        })
    }
}