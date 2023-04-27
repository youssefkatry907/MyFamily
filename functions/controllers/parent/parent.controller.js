const parent = require('../../modules/Parent/parent.repo');
const jwt = require('../../helpers/jwt.helper');
const uploader = require('../../helpers/uploader.helper');
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
        const { familyUserName, familyEmail, familyPassword } = req.body;
        const result = await parent.comparePassword(familyEmail, familyPassword);
        if (result.success) {
            payload = {
                _id: result.record._id, name: result.record.name, email: result.record.email,
                familyUserName,
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

exports.changePassword = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
        const result = await parent.resetPassword(decodedToken._id, req.body.newPassword);
        res.status(result.code).json({ success: result.success, code: result.code });
    } catch (err) {
        console.log(`err.message`, err.message);
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }

}

exports.updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
        const result = await parent.update(decodedToken._id, req.body);
        res.status(result.code).json({
            success: result.success,
            code: result.code
        });
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

exports.deleteParent = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
        if (decodedToken) {
            await parent.remove(decodedToken._id);
            res.status(200).json({
                success: true,
                code: 200,
            })
        }
    }
    catch (err) {
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
            res.status(result.code).json({
                success: result.success,
                code: result.code,
                result
            });
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

exports.uploadImage = async (req, res) => {
    try {
        //console.log(`req.body`);
        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = checker.verify(token, "MyFamilyTeam");
        if (decodedToken) {
            const newImage = await uploader.uploadImage("parents");
            // console.log(`newImage`, newImage);
            let update = await parent.update(decodedToken._id, { image: newImage });
            res.status(update.code).json({
                success: update.success,
                code: update.code,
                image: newImage
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