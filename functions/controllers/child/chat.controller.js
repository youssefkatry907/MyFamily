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
                error: "Chat Not Found!"
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