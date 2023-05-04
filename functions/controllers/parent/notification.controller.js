let notification = require('../../modules/Notification/notification.repo')
let checker = require('jsonwebtoken');

exports.listNotifications = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = checker.verify(token, "MyFamilyTeam");
        let result = await notification.list({ userId: parent._id });
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

exports.forwardNotification = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = checker.verify(token, "MyFamilyTeam");
        let result = await notification.forward(parent._id, req.body.notificationId);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}