let entertainmentRepo = require('../../modules/Entertainment/entertainment.repo');
const jwt = require('jsonwebtoken');

exports.addEntertainment = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = jwt.verify(token, "MyFamilyTeam")
        const entertainmentTitle = req.body;
        const entertainment = await entertainmentRepo.add(entertainmentTitle, parent._id);
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
        let parent = jwt.verify(token, "MyFamilyTeam")
        const entertainment = await entertainmentRepo.getAll(parent._id);
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
        const form = req.body;
        const entertainment = await entertainmentRepo.vote(form);
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
            code: 500,
            error: "Unexpected Error!"
        });
    }
}