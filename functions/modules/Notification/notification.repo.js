let Notification = require('./notification.model')
let Helper = require('../Helper/helper.model')
let Parent = require('../Parent/parent.model')

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

exports.forward = async (_id, notificationId) => {
    try {
        let notification = await Notification.findOne({ _id: notificationId })
        let parent = await Parent.findOne({ _id })

        if (notification) {
            let helpers = parent.helpers
            for (let i = 0; i < helpers.length; i++) {
                let helper = await Helper.findOneAndUpdate({ email: helpers[i].email }, { $push: { notifications: notification } }, { new: true })
                await helper.save()
            }
            return {
                success: true,
                code: 200,
                message: "Notification forwarded successfully!",
            }
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Notification not found!"
            }
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