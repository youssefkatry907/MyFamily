let study = require('../../modules/Study/study.repo')

exports.addSubject = async (req, res) => {
    try {
        let form = req.body;
        let result = await study.addSubject(form);
        result.study.push(form)
        await result.save()
        return res.status(200).json({
            success: true,
            result,
            code: 200,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error!"
        });
    }
}

