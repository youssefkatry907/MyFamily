let Study = require('../../modules/Study/study.repo')

exports.addSubject = async (req, res) => {
    try {
        let form = req.body;
        let study = await Study.addSubject(form);
        return res.status(200).json(study);
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
        let study = await Study.get();
        return res.status(200).json(study);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

