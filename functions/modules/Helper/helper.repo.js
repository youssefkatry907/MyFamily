let Helper = require('./helper.model')
let bcrypt = require("bcrypt");

exports.isExist = async (filter) => {
    try {
        const helper = await Helper.findOne(filter).lean();
        if (helper) {
            return {
                success: true,
                record: helper,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Helper is not found!"
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

exports.getAll = async (familyUserName) => {
    // get all helpers of a parent with parentId 
    try {
        const helpers = await Helper.find({ familyUserName });
        if (helpers) {
            return {
                success: true,
                helpers
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

exports.comparePassword = async (email, password, familyUserName) => {
    try {
        let helper = await this.isExist({ email, familyUserName })
        if (helper.success) {
            match = await bcrypt.compare(password, helper.record.familyPassword)
            if (match) {
                return {
                    success: true,
                    record: helper.record,
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
        else
            return {
                success: false,
                code: 404,
                error: helper.error
            };
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
        let helper = await this.isExist({ _id })
        if (helper.success) {
            await Helper.findOneAndUpdate({ _id }, { token: null })
            return {
                success: true,
                code: 200
            };
        } else return {
            success: false,
            code: 404,
            error: helper.error
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}
