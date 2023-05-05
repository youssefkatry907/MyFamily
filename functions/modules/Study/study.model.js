let mongoose = require('mongoose')

let studySchema = mongoose.Schema({
    study: [
        {
            parent: { type: mongoose.Types.ObjectId, ref: 'parents' },
            child: { type: mongoose.Types.ObjectId, ref: 'childrens' },
            familyUserName: { type: String, ref: 'parents' },
            subjects: [
                {
                    subject: { type: String },
                    Assignments: [
                        {
                            title: { type: String },
                            description: { type: String },
                            dueDate: { type: Date, default: Date.now },
                            done: { type: Boolean, default: false },
                            image: { type: String }
                        }
                    ]
                }
            ]
        }
    ]
})

let studyModel = mongoose.model('studies', studySchema)
module.exports = studyModel