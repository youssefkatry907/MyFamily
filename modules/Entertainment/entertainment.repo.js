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

exports.add = async (form, familyUserName) => {
    try {

        let entertainment = await this.isExist({ title: form.title, familyUserName });

        if (entertainment.success) { // Title exists
            return {
                success: false,
                code: 409,
                message: "This title already exists!"
            }
        }
        else {
            const newEntertainment = new Entertainment(form);
            let sum = 0, percentage = 0;
            for (let i = 0; i < form.suggestions.length; i++) {
                percentage = newEntertainment.suggestions[i].count;
                percentage++;
                newEntertainment.suggestions[i].count++;
                sum += percentage;
            }
            for (let i = 0; i < form.suggestions.length; i++) {
                newEntertainment.suggestions[i].percentage = (newEntertainment.suggestions[i].count / sum) * 100;
            }
            newEntertainment.familyUserName = familyUserName;
            await newEntertainment.save();

            return {
                success: true,
                record: newEntertainment,
                code: 201
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

exports.getAll = async (familyUserName) => {
    try {
        const entertainments = await Entertainment.find({ familyUserName }).lean();
        if (entertainments) {
            return {
                success: true,
                record: entertainments,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "entertainments is not found!"
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

exports.vote = async (form) => {
    try {
        const entertainment = await Entertainment.findOne({ title: form.title }).lean();
        if (entertainment) {
            let suggestion = entertainment.suggestions.find(s => s.suggestion == form.suggestion);
            suggestion.count++;
            let sum = 0, percentage = 0;
            for (let i = 0; i < entertainment.suggestions.length; i++) {
                percentage = entertainment.suggestions[i].count;
                sum += percentage;
            }
            for (let i = 0; i < entertainment.suggestions.length; i++) {
                entertainment.suggestions[i].percentage = (entertainment.suggestions[i].count / sum) * 100;
            }
            await Entertainment.updateOne({ title: form.title }, entertainment);
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

