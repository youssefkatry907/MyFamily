let Study = require('./study.model')
let Notification = require('../Notification/notification.model')
let Child = require('../Child/child.model')

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

exports.add = async (form) => {
    try {
        let subject = await this.isExist({ "study.child": form.child });
        // console.log('filter', subject);
        if (subject.success) {
            // console.log(subject.record);
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
            await Study.updateOne({}, { $push: { "study": newsubject } }, { upsert: true, new: true });
            console.log(newsubject, newsubject);
            return {
                success: true,
                message: "Study Added Successfully",
                code: 200,
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


exports.get = async (familyUserName) => {
    try {
        // return all studies with parent id and populate all children
        let study = await Study.find().populate('study.child').lean();
        let sz = study[0].study.length;
        let studies = [];
        for (let i = 0; i < sz; i++) {
            if (study[0].study[i].child.familyUserName == familyUserName) {
                studies.push(study[0].study[i]);
            }
        }

        if (studies.length > 0) {
            return {
                success: true,
                study: studies,
                code: 200
            };
        }

        return {
            success: false,
            code: 404,
            error: "study is not found!"
        };
    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.addAssignment = async (form, childId, idx) => {
    try {
        const result = await Study.findOne({ 'study.child': childId })
        let child = await Child.findById(childId)
        let email = child.email;
        let atIndex = email.indexOf("@");
        let childName = email.substring(0, atIndex).trim();
        if (result) {
            const childIndex = result.study.findIndex((s) => String(s.child) === childId);
            result.study[childIndex].subjects[idx].Assignments.push(form);
            await result.save();
            let msg = childName + " " + child.familyUserName + " Added new assignment"
            let newNotification = new Notification({
                text: msg,
                type: "Study",
                date: Date.now(),
            })
            await newNotification.save();
            return {
                success: true,
                code: 201,
                message: "Assignment Added Successfully",
                notification: newNotification
            };
        } else {
            return {
                success: false,
                code: 404,
                error: "Assignment is not found!"
            };
        }
    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }
}

exports.listSubjects = async (childId) => {
    try {
        let result = await this.isExist({ "study.child": childId });
        if (result.success) {
            return {
                success: true,
                code: 200,
                subjects: result.record.study[0].subjects
            };
        } else {
            return {
                success: false,
                code: 404,
                error: "Subjects is not found!"
            };
        }

    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error!"
        };
    }

}
