const parent = require('../../modules/Parent/parent.repo');
const jwt = require('../../helpers/jwt.helper');
const checker = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const result = await parent.create(req.body);
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

exports.login = async (req, res) => {
    try {
        const { familyUsername, familyEmail, familyPassword } = req.body;
        const result = await parent.comparePassword(familyEmail, familyPassword);
        if (result.success) {
            payload = {
                _id: result.record._id, name: result.record.name, email: result.record.email,
                permissions: result.record.permissions
            }
            const token = jwt.generateToken(payload);
            res.status(result.code).json({ success: result.success, token, code: result.code, record: result.record })
        }
        else {
            res.status(result.code).json(result)
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

exports.resetPassword = async (req, res) => {
    try {
        const result = await parent.resetPassword(req.body.email, req.body.newPassword);
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

exports.logout = async (req, res) => {
    try {
        const result = await parent.logout(req.body._id);
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

exports.addMember = async (req, res) => {
    try {
        const parentToken = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(parentToken, "MyFamilyTeam");
        if (decodedToken) {
            const form = req.body;
            const result = await parent.add(form, decodedToken._id);
            return res.status(200).json({
                success: true,
                code: 200,
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