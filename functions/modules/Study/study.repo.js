let Study = require('./study.model')

exports.isExist = async (filter) => {
    try {
        const child = await Study.findOne(filter).lean();
        if (child) {
            return {
                success: true,
                record: child,
                code: 200
            };
        }
        else {
            return {
                success: false,
                code: 404,
                error: "child is not found!"
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

exports.addSubject = async (form) => {
    try {
        let subject = await this.isExist({ "study.child": form.child });
        console.log('filter', subject);
        if (subject.code == 500) return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
        if (subject.success) {
            console.log(subject.record);
            let newsubject = subject.record.study;
            for (let i = 0; i < newsubject.length; i++) {
                if (newsubject[i].child == form.child) {
                    newsubject[i].subjects = newsubject[i].subjects.concat(form.subjects);
                }
            }
            await Study.updateOne({ "study.child": form.child }, { $set: { "study": newsubject } });
            return {
                success: true,
                message: "Study Added Successfully",
                code: 200
            };
        } else {
            // push new child and subjects into study
            let newsubject = {
                child: form.child, // Convert string to ObjectId
                subjects: form.subjects.map(subject => {
                    return { subject: subject.subject, Assignments: subject.Assignments }
                })
            }
            console.log(newsubject, newsubject);
            let result = await Study.updateOne({}, { $push: { "study": newsubject } }, { upsert: true, new: true });
            console.log(newsubject, newsubject);
            return {
                success: true,
                message: "Study Added Successfully",
                code: 200
            };
        }
    } catch (err) {

        console.log(err.message, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}


exports.get = async () => {
    try {
        // return all studies and populate all children
        const study = await Study.find().lean();
        if (study) {
            return {
                success: true,
                study: study[0].study,
                code: 200
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
