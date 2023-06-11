let Child = require('./child.model')
let bcrypt = require("bcrypt");

exports.getAll = async (parentId) => {
    // get all children of a parent with parentId 
    try {
        const children = await Child.find({ parent: parentId });
        if (children) {
            return {
                success: true,
                children
            };
        }
    }
    catch (err) {
        console.log(err.message, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.isExist = async (filter) => {
    try {
        const child = await Child.findOne(filter).lean();
        if (child) {
            return {
                success: true,
                record: child,
                code: 200,
            };
        } else {
            return {
                success: false,
                code: 404,
                error: "Child is not found!"
            };
        }
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.comparePassword = async (email, password) => {
    try {
        let child = await this.isExist({ email })
        if (child.success) {
            match = await bcrypt.compare(password, child.record.familyPassword)
            if (match) {
                return {
                    success: true,
                    record: child.record,
                    code: 200
                };
            }
            else {
                return {
                    success: false,
                    code: 409,
                    error: "Incorrect Password"
                };
            }

        }
        else {
            console.log(`child.error`, child.error);
            return {
                success: false,
                code: 404,
                error: child.error
            };
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.logout = async (_id) => {
    try {
        let child = await this.isExist({ _id })
        if (child.success) {
            await Child.findOneAndUpdate({ _id }, { token: null })
            return {
                success: true,
                code: 200
            };
        } else return {
            success: false,
            code: 404,
            error: child.error
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}