let Study = require('./study.model')

exports.addSubject = async (form) => {
    let subject = new Study(form)
    return await subject.save()
}



