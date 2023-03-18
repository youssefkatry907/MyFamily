let chat = require("../../modules/Chat/chat.repo")
let child = require("../../modules/Child/child.repo")

exports.listMessages = async (req, res) => {
    try {
        const receiver = await child.isExist(req.body.receiver);
        if (receiver.success) {
            const messages = await chat.list({ receiver: receiver.record._id });
            return res.status(200).json({
                success: true,
                messages,
                code: 200,
            });
        } else {
            return res.json(404).send("user not found");
        }
    } catch (err) {
        console.log(err.message, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const receiver = await child.isExist(req.body.receiver);
        if (receiver.success) {
            const msg = {
                sender: req.body.sender,
                receiver: req.body.receiver,
                message: req.body.message
            }
            await chat.create(msg);
            return res.status(200).json({
                success: true,
                msg,
                code: 200,
            });
        } else {
            return res.status(404).json({
                success: false,
                code: 404,
                error: "user not found"
            });
        }
    }
    catch (err) {
        console.log(err.message, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        if (req.body._id) {
            const result = await chat.remove(req.body.messageId);
            res.status(200).json({
                success: true,
                code: 200,
                message: "message deleted"
            });
        }
        else {
            res.status(400).json({
                success: false,
                code: 400,
                message: "message not found"
            });
        }

    } catch (err) {
        console.log(err.message, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}