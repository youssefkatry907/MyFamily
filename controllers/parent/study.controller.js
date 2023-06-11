let study = require('../../modules/Study/study.repo')
let checker = require('jsonwebtoken');

exports.addSubject = async (req, res) => {
    try {
        let form = req.body;
        let result = await study.add(form);
        console.log(result);
        res.status(result.code).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.getStudies = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let parent = checker.verify(token, "MyFamilyTeam");
        let result = await study.get(parent.familyUserName);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

