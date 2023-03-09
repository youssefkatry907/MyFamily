let Parent = require('./parent.model')
let bcrypt = require("bcrypt");

// Path: modules\parent\parent.controller.js

exports.isExist = async (filter) => {
    try {
        const parent = await Parent.findOne(filter).lean();
        if (parent) {
            return {
                success: true,
                record: parent,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Parent is not found!"
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

exports.get = async (filter) => {
    try {
        if (filter) {
            record = await Parent.find(filter).lean().select("-password");
            return {
                success: true,
                record,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "Parent name is required!"
            }
        }
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }

}

exports.create = async (form) => {
    try {
        const parent = await this.isExist({ email: form.email });
        if (!parent.success) {

            const newParent = new Parent(form);
            await newParent.save();
            return {
                success: true,
                // record: newParent,
                code: 201
            };
        }
        else {
            return {
                success: false,
                error: "Parent already exists!",
                code: 404
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

exports.update = async (_id, form) => {
    try {
        const parent = await this.isExist({ _id });
        if (parent.success) {
            if (form.email) {
                const duplicate = await this.isExist({ email: form.email });
                if (duplicate.success && duplicate.record._id != parent.record._id)
                    return {
                        success: false,
                        error: "This Email is taken by another user",
                        code: 409
                    };
            }
            await Parent.findByIdAndUpdate({ _id }, form)
            return {
                success: true,
                code: 201
            };
        }
        else {
            return {
                success: false,
                error: "parent not found",
                code: 404
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

// remove (delete) parent

exports.remove = async (_id) => {
    try {
        if (_id) {
            await Parent.findByIdAndDelete({ _id })
            return {
                success: true,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "parent not found",
                code: 404
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

exports.comparePassword = async (familyEmail, password) => {
    try {
        let parent = await this.isExist({ familyEmail })
        if (parent.success) {
            match = await bcrypt.compare(password, parent.record.familyPassword)
            if (match) {
                return {
                    success: true,
                    record: parent.record,
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

        } else return {
            success: false,
            code: 404,
            error: parent.error
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

exports.resetPassword = async (email, newPassword) => {
    try {
        let parent = await this.isExist({ email })
        let saltrouds = 5;
        if (parent.success) {
            let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
            await Parent.findOneAndUpdate({ email }, { password: hashedPassword })
            return {
                success: true,
                code: 200
            };
        } else return {
            success: false,
            code: 404,
            error: parent.error
        };
    } catch (err) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.remove = async (_id) => {
    try {
        if (_id) {
            await Parent.findByIdAndDelete({ _id })
            return {
                success: true,
                code: 200
            };
        }
        else {
            return {
                success: false,
                error: "Parent not found",
                code: 404
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