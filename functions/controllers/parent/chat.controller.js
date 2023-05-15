let chat = require("../../modules/Chat/chat.repo")
let child = require("../../modules/Child/child.repo")
let checker = require("jsonwebtoken")


exports.listChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const result = await chat.list({ $or: [{ sender: decodedToken._id }, { receiver: decodedToken._id }] });
        if (result.success) {
            res.status(result.code).json({
                success: result.success,
                code: result.code,
                records: result.records
            })
        }
        else {
            res.status(404).json({
                success: false,
                code: 404,
                error: "This user doesn't have any chat!"
            })
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }

}


exports.listMessages = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let parent = checker.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let chatId = req.query.chat;
        const chatFound = await chat.isExist(chatId);
        if (chatFound.success) {
            const messages = await chat.list({ $or: [{ sender: parent._id }, { receiver: parent._id }] });
            res.status(chatFound.code).json({
                success: true,
                code: 200,
                messages: messages.records
            });
        } else {
            res.status(chatFound.code).json({
                success: false,
                code: chatFound.code,
                error: chatFound.error
            });
        }
    } catch (err) {
        console.log(err.message, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.sendMessage = async (req, msg) => {
    try {
        const chatId = await chat.isExist({ _id: req.body.chatId });
        const receiver = await child.isExist({ _id: req.body.receiver });
        if (chatId.success) {
            if (receiver.success) {
                const msg = {
                    sender: req.body.sender,
                    receiver: req.body.receiver,
                    message: req.body.message
                }
                chat.record.messages.push(msg);
                res.status(200).json({
                    success: true,
                    msg,
                    code: 200,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    code: 404,
                    error: "user not found"
                });
            }
        }
        else {
            await chat.create(req.body);
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
