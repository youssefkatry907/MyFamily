let event = require('../../modules/Event/event.repo');


exports.listEvents = async (req, res) => {
    try {
        const child = req.tokenData._id;
        const filter = req.query;
        const result = await event.list(filter);
        res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.getEvent = async (req, res) => {
    try {
        const result = await event.get(req.query._id);
        res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}