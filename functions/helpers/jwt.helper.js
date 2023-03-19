let jwt = require("jsonwebtoken")

exports.generateToken = (payload) => {
    return jwt.sign(payload, "MyFamilyTeam" || "secret", { expiresIn: '30d' })
}

exports.verifyToken = (role) => {
    return (req, res, next) => {
        let authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        if (token) {
            jwt.verify(token, "MyFamilyTeam" || "secret", (err, tokenData) => {
                if (err) return res.status(403).json({ success: false, error: "Invalid Token!", code: 403 })
                if (!role.includes(tokenData.role)) return res.status(401).json({ success: false, error: "Unauthorized", code: 401 })
                req.tokenData = tokenData;
                next();
            })

        } else return res.status(401).json({ success: false, error: "Unauthorized", code: 401 })
    }

}