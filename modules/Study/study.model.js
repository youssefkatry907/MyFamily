let mongoose = require('mongoose')

let studySchema = mongoose.Schema({
    study: [
        {
            child: { type: mongoose.Types.ObjectId, ref: 'childrens' },
            subjects: [
                {
                    subject: { type: String },
                    Assignments: [
                        {
                            Assignment: {
                                title: { type: String },
                                description: { type: String },
                                dueDate: { type: Date, default: Date.now },
                                done: { type: Boolean, default: false },
                                image: { type: String }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

let studyModel = mongoose.model('studies', studySchema)
module.exports = studyModel