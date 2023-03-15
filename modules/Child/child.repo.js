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