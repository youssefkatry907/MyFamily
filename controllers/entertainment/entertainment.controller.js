let entertainmentRepo = require('../../modules/Entertainment/entertainment.repo');
let Notification = require('../../modules/Notification/notification.model');
const jwt = require('jsonwebtoken');
const { use } = require('../../routes/entertainment/entertainment.route');

exports.addEntertainment = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const entertainmentTitle = req.body;
        const entertainment = await entertainmentRepo.add(entertainmentTitle, parent.familyUserName);
        if (entertainment.success) {
            return res.status(201).json({
                success: true,
                record: entertainment.record
            });
        } else {
            return res.status(entertainment.code).json({
                success: false,
                error: entertainment.error
            });
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            error: "Unexpected Error!"
        });
    }
}

exports.getAllEntertainment = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const entertainment = await entertainmentRepo.getAll(parent.familyUserName);
        if (entertainment.success) {
            return res.status(200).json({
                success: true,
                record: entertainment.record
            });
        } else {
            return res.status(entertainment.code).json({
                success: false,
                error: entertainment.error
            });
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            error: "Unexpected Error!"
        });
    }
}


exports.removeEntertainment = async (req, res) => {
    try {
        const entertainmentTitle = req.body._id;
        const entertainment = await entertainmentRepo.remove(entertainmentTitle);
        if (entertainment.success) {
            return res.status(201).json({
                success: true,
                record: entertainment.record
            });
        } else {
            return res.status(entertainment.code).json({
                success: false,
                error: entertainment.error
            });
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            error: "Unexpected Error!"
        });
    }
}

exports.voteSuggestion = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const form = req.body;
        const entertainment = await entertainmentRepo.vote(form);
        if (entertainment.success) {
            let msg = "Someone Voted for " + form.suggestion + " in " + form.title + " entertainment";
            if (user.role != "parent") {

                let newNotification = new Notification({
                    text: msg,
                    type: user.role,
                    date: Date.now(),
                    userId: user.parent
                });
                await newNotification.save();
            }
            else {
                let newNotification = new Notification({
                    text: msg,
                    type: user.role,
                    date: Date.now(),
                });
                await newNotification.save();
            }
            res.status(201).json({
                success: true,
                record: entertainment.record,
            });
        } else {
            res.status(entertainment.code).json({
                success: false,
                error: entertainment.error
            });
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}