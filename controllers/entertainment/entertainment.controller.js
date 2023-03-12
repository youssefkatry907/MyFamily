let entertainmentRepo = require('../../modules/Entertainment/entertainment.repo');

exports.addEntertainment = async (req, res) => {
    try {
        const entertainmentTitle = req.body;
        const entertainment = await entertainmentRepo.add(entertainmentTitle);
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