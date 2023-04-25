const Event = require('./event.model');
const Child = require('../Child/child.model');

exports.add = async (form) => {
    try {
        let event = await Event.findOne({ eventName: form.eventName })
        let child = await Child.findOne({ _id: form.child })
        if (!child) {
            return {
                success: false,
                code: 404,
                error: "Child is not found!"
            };
        }
        if (!event || (event && event.child != form.child)) {
            let newEvent = new Event(form)
            await newEvent.save()

            return {
                success: true,
                code: 201,
                message: "Event is added successfully!",
            }
        }
        else {
            return {
                success: false,
                code: 409,
                error: "Event is already exist!"
            };
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}


exports.list = async (familyUserName) => {
    try {
        let events = await Event.find({ familyUserName }).lean();
        const eventsByDate = {}
        for (const event of events) {
            const date = event.Date;
            if (!eventsByDate[date]) {
                eventsByDate[date] = [];
            }
            eventsByDate[date].push({
                _id: event._id,
                child: event.child,
                eventName: event.eventName,
                description: event.description,

                startTime: `${event.startTime}`,
                endTime: `${event.endTime}`,
            })
        }

        return {
            success: true,
            code: 200,
            eventsByDate,
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}
