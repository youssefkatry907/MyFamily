let notification = require('../../modules/Notification/notification.repo')
let checker = require('jsonwebtoken');

exports.listNotifications = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let child = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let result = await notification.list({ userId: child._id });
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}