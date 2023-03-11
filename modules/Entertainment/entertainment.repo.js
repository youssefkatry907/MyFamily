let Entertainment = require('./entertainment.model')

exports.isExist = async (filter) => {
    try {
        const entertainment = await Entertainment.findOne(filter).lean();
        if (entertainment) {
            return {
                success: true,
                record: entertainment,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "entertainment is not found!"
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

exports.add = async (form) => {
    try {
        const entertainment = await this.isExist({ _id: form._id});
        if (!entertainment.success) {

            const newEntertainment = new Entertainment(form);
            await newEntertainment.save();
            return {
                success: true,
                record: newEntertainment,
                code: 201
            };
        }
        else {
            return {
                success: false,
                error: "This entertainment already exists!",
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


// remove a title of entertainment from array of titles

exports.remove = async (_id) => {
    try {
       // remove a title of entertainment from array of titles
        const entertainment = await this.isExist({ _id });
        if (entertainment.success) {
            await entertainment.remove();
            return {
                success: true,
                record: entertainment,
                code: 201
            };
        }
        else {
            return {
                success: false,
                error: "This entertainment does not exist!",
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

