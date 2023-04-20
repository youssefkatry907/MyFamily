const Event = require('./event.model');

exports.list = async (filter) => {
    try {
        let events = await Event.find(filter);
        return {
            success: true,
            code: 200,
            events,
        };

    } catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.get = async (filter) => {
    try {
        let event = await Event.findOne(filter).populate({ path: 'child', select: 'name' });
        return {
            success: true,
            code: 200,
            event
        };
    }
    catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}