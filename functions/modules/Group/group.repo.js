let Group = require('./group.model');

exports.list = async (filter) => {
    try {
        let groups = await Group.find(filter);
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
