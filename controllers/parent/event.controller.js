let event = require('../../modules/Event/event.repo');
let checker = require('jsonwebtoken');

exports.addEvent = async (req, res) => {
    try {
        let form = req.body
        let record = await event.add(form)
        res.status(record.code).json({
            success: record.success,
            code: record.code,
            message: record.message
        })
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        })
    }
}


exports.listEvents = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const familyUserName = parent.familyUserName;
        const result = await event.list(familyUserName);
        res.status(result.code).json(result.eventsByDate);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}
