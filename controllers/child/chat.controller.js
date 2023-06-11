let chat = require('../../modules/Chat/chat.repo');
const checker = require('jsonwebtoken');

exports.listChat = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
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
        let child = checker.verify(token, "MyFamilyTeam");
        let chatId = req.query.chat;
        const chatFound = await chat.isExist(chatId);
        if (chatFound.success) {
            const messages = await chat.list({ $or: [{ sender: child._id }, { receiver: child._id }] });
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