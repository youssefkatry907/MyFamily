let helper = require('../../modules/Helper/helper.repo');
const jwt = require('jsonwebtoken');

exports.getHelpers = async (req, res) => {
    // get all helpers of a parent using parentToken
    try {
        const parentToken = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(parentToken, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            const result = await helper.getAll(decodedToken._id);
            return res.status(200).json({
                success: true,
                helpers: result.helpers,
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