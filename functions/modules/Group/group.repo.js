let Group = require('./group.model');
const jwt = require('jsonwebtoken');

exports.list = async (familyUserName) => {
    try {
        let groups = await Group.find({ familyUserName });
        return {
            success: true,
            code: 200,
            groups,
        };
    }
    catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.create = async (form) => {
    try {
        let group = new Group(form);
        await group.save();
        return {
            success: true,
            code: 200,
            group
        };
    } catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.get = async (id) => {
    try {
        let group = Group.findById(id);
        return {
            success: true,
            code: 200,
            group
        };
    }
    catch (error) {
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}
