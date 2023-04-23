let Calendar = require('./calendar.model')
let Event = require('../Event/event.model')
let Child = require('../Child/child.model')

exports.isExist = async (filter) => {
    try {
        const event = await Event.findOne(filter).lean();
        if (event) {
            return {
                success: true,
                record: event,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Event is not found!"
            };
        }

    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }

}

exports.add = async (form) => {
    try {
        let event = await Event.findOne({ child: form.child })
        let child = await Child.findOne({ _id: form.child })
        if (!child) {
            return {
                success: false,
                code: 404,
                error: "Child is not found!"
            };
        }
        if (!event) {
            let calendar = new Calendar(form)
            let newEvent = new Event(form)
            await calendar.save()
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

exports.get = async (filter) => {
    try {
        let events = await Calendar.find({ filter }).lean()
        if (events) {
            return {
                success: true,
                code: 200,
                events
            }
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Events are not found!"
            }
        }
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}