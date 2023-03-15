let child = require('../../modules/Child/child.repo')
const jwt = require('jsonwebtoken');

exports.getChildren = async (req, res) => {
    // get all children of a parent using parentToken
    try {
        const parentToken = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(parentToken, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            const result = await child.getAll(decodedToken._id);
            return res.status(200).json({
                success: true,
                children: result.children,
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