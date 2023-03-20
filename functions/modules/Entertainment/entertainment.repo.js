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

exports.add = async (form, id) => {
    try {
        const newEntertainment = new Entertainment(form);

        let entertainment = await this.isExist({ title: form.title });

        if (entertainment.success) {
            for (let i = 0; i < form.suggestions.length; i++) {
                let suggestion = newEntertainment.suggestions.find(s => s.suggestion == form.suggestions[i].suggestion);
                suggestion.count++;
            }
        }
        else {
            newEntertainment.suggestions = form.suggestions;
        }
        console.log(`newEntertainment`, newEntertainment);
        let sum = 0, percentage = 0;
            for (let i = 0; i < form.suggestions.length; i++) {
                percentage = newEntertainment.suggestions[i].count;
                if (!percentage)
                    newEntertainment.suggestions[i].count++;
                sum += percentage;
            }
            for (let i = 0; i < form.suggestions.length; i++) {
                newEntertainment.suggestions[i].percentage = (newEntertainment.suggestions[i].count / sum) * 100;
            }
        newEntertainment.parentId = id;
        await newEntertainment.save();
        // console.log(`newEntertainment`, newEntertainment);
        return {
            success: true,
            record: newEntertainment,
            code: 201
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

exports.getAll = async (id) => {
    try {
        const entertainments = await Entertainment.find({ parentId: id }).lean();
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

