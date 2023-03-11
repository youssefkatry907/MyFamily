let Parent = require('./parent.model')
let Child = require('../Child/child.model')
let Helper = require('../Helper/helper.model')
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

    const parent = await this.isExist({ email: form.email });
    if (!parent.success) {
        const newParent = new Parent(form);
        await newParent.save();
        let sz = newParent.children.length
        if (sz) {
            var child = new Child({
                familyName: newParent.familyUsername, email: form.children[0],
                familyPassword: newParent.familyPassword
            });
        }
        await child.save();
        for (let i = 1; i < sz; i++) {
            child.email = newParent.children[i];
            await child.save();
        }
        let helperSz = newParent.helpers.length
        if (helperSz) {
            var helper = new Helper({
                familyName: newParent.familyUsername, email: newParent.helpers[0].email,
                permissions: newParent.helpers[0].permissions,
                familyPassword: newParent.familyPassword
            });
        }

        await helper.save();
        for (let i = 1; i < helperSz; i++) {
            helper.email = newParent.helpers[i].email;
            helper.permissions = newParent.helpers[i].permissions;
            await helper.save();
        }
        return {
            success: true,
            record: newParent,
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
        // check if family email is the parent email or the other parent email
        let parent = await this.isExist({ email: familyEmail })
        let otherParent = await this.isExist({ otherParentEmail: familyEmail })
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

        }
        else if (otherParent.success) {
            match2 = await bcrypt.compare(password, otherParent.record.familyPassword)
            if (match2) {
                return {
                    success: true,
                    record: otherParent.record,
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
        } else
            return {
                success: false,
                code: 404,
                error: parent.error || otherParent.error
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
        let parent = await this.isExist({ _id })
        if (parent.success) {
            await Parent.findOneAndUpdate({ _id }, { token: null })
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