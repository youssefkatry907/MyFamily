let Helper = require('./helper.model')

exports.getAll = async (parentId) => {
    // get all helpers of a parent with parentId 
    try {
        const helpers = await Helper.find({ parent: parentId });
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