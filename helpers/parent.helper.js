const { permissions } = require('./permission.helper')

exports.validatePermissions = (listOfPermissions) => {
    for (key in listOfPermissions) {
        if (permissions.get(key)) {
            listOfPermissions[key].forEach(permission => {
                let isFound = false
                if (permissions.get(key).has(permission)) {
                    console.log(permission, "found in", key, "permissions");
                    isFound = true
                }
                if (!isFound)
                    console.log(permission, "not found in", key, "permissions")
                return {
                    success: false,
                    code: 404,
                    error: `${permission} not found in ${key} permissions!`
                }
            })
        }
        else {
            console.log(key, "is not a valid permission")
            return {
                success: false,
                code: 409,
                error: `${key} is not a valid permission!`
            }
        }
    }
    return { 
        success: true,
        code: 200
    }

}


exports.isAuthorized = (req, res, next) => {
    if (req.tokenData) {
        const parentPermissions = req.tokenData.permissions
        const endPoint = req.originalUrl.split("?").shift().slice(7);
        let isFound = false
        for (key in parentPermissions) {
            if (parentPermissions[key].includes(endPoint)) { isFound = true; next(); }
        }

        if (!isFound) res.status(403).json({ success: false, error: "Unauthorized!", code: 403 })

    } else res.status(403).json({ success: false, error: "Unauthorized!", code: 403 })
}