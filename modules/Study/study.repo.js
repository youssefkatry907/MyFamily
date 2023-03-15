let Study = require('./study.model')

exports.addSubject = async (form) => {
    let subject = new Study(form)
    return await subject.save()
}


// get all subjects of a child
exports.get = async (childId) => {
    let record = await Study.find()
    for (let i = 0; i < record.length; i++) {
        if (record[i].study[i].child == childId)
            return record[i].study[i].subjects
    }
}
