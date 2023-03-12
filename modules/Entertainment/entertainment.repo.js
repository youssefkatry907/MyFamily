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
        const newEntertainment = new Entertainment(form);
        // if the title of entertainment is already exist, then make loop and add the percentage and count
        // const entertainment = await this.isExist({ suggestions: { $elemMatch: { suggestion: form.suggestions[0].suggestion } } });
        // console.log(`entertainment`, entertainment);
        // if (entertainment.success) {
        //     for (let i = 0; i < form.suggestions.length; i++) {
        //         for (let j = 0; j < entertainment.record.suggestions.length; j++) {
        //             if (form.suggestions[i].suggestion === entertainment.record.suggestions[j].suggestion) {
        //                 newEntertainment.suggestions[i].count = entertainment.record.suggestions[j].count + 1;
        //                 newEntertainment.suggestions[i].percentage = (entertainment.record.suggestions[j].count / (entertainment.record.suggestions.length + 1)) * 100;
        //             }
        //         }
        //     }
        // }
        // await entertainment.save();
        let sum = 0, percentage = 0;
        for (let i = 0; i < form.suggestions.length; i++) {
            percentage = newEntertainment.suggestions[i].count;
            if (!percentage) {
                percentage++;
            }
            newEntertainment.suggestions[i].count++;
            sum += percentage;
        }
        for (let i = 0; i < form.suggestions.length; i++) {
            newEntertainment.suggestions[i].percentage = (newEntertainment.suggestions[i].count / sum) * 100;
        }

        await newEntertainment.save();
        console.log(`newEntertainment`, newEntertainment);
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

exports.getAll = async () => {
    try {
        const entertainments = await Entertainment.find().lean();
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

