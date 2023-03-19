let Child = require('./child.model')

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

exports.isExist = async (id) => {
    const record = await Child.findOne({ _id: id });
    if (record) {
        return {
            success: true,
            record: record,
            code: 200,
        };
    } else {
        return {
            code: 404,
            success: false,
            errors: [
                {
                    key: "record",
                    value: `record not found`,
                },
            ],
        };
    }
}