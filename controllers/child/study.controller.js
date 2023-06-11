let study = require('../../modules/Study/study.repo')
let checker = require('jsonwebtoken');

exports.add = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let child = checker.verify(token, "MyFamilyTeam");
        let result = await study.addAssignment(req.body, child._id, req.query.idx);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.list = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let child = checker.verify(token, "MyFamilyTeam");
        let result = await study.listSubjects(child._id);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}