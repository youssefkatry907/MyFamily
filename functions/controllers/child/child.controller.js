let child = require('../../modules/Child/child.repo')
const jwt = require('../../helpers/jwt.helper');
const checker = require('jsonwebtoken');


exports.getChildren = async (req, res) => {
    // get all children of a parent using parentToken
    try {
        const parentToken = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(parentToken, "MyFamilyTeam");
        if (decodedToken) {
            const result = await child.getAll(decodedToken._id);
            return res.status(200).json({
                success: true,
                children: result.children,
                code: 200
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

exports.login = async (req, res) => {
    try {
        const { familyUserName, familyEmail, familyPassword } = req.body;
        const result = await child.comparePassword(familyEmail, familyPassword);
        if (result.success) {
            payload = {
                _id: result.record._id, email: result.record.email,
                familyUserName,
            }
            const token = jwt.generateToken(payload);
            res.status(result.code).json({ success: result.success, token, code: result.code, record: result.record })
        }
        else {
            res.status(result.code).json(result)
        }
    } catch (err) {
        console.log(`CHILD LOGIN @ controller: `, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
        const result = await child.logout(decodedToken._id);
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

