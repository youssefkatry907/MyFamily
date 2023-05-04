let Notification = require('./notification.model')

exports.create = async (form) => {
    try {
        let notification = new Notification(form)
        let result = await notification.save()
        return {
            success: true,
            code: 201,
            message: "Notification created successfully!",
            result
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        }
    }
}

exports.list = async (filter) => {
    try {
        let notifications = await Notification.find(filter).lean()
        return {
            success: true,
            code: 200,
            notifications
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        }
    }
}