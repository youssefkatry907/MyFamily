let study = require('../../modules/Study/study.repo')

exports.addSubject = async (req, res) => {
    try {
        let form = req.body;
        let result = await study.addSubject(form);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

exports.getStudies = async (req, res) => {
    try {
        let result = await study.get();
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

