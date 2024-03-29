let mongoose = require('mongoose')
// let parentModel = require('../Parents/parents.model')

let entertainmentSchema = mongoose.Schema({
    title: { type: String },
    suggestions: [
        {
            suggestion: { type: String, unique: true },
            percentage: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        }
    ],
    // 2, 3, 1, sum = 6
    // 2/6 = 33.33, 3/6 = 50, 1/6 = 16.66
    familyUserName: { type: String, ref: 'parents' },
    helperId: {
        type: mongoose.Types.ObjectId,
        ref: 'helpers'
    },
    childId: {
        type: mongoose.Types.ObjectId,
        ref: 'childrens'
    }
})

let entertainmentModel = mongoose.model('entertainments', entertainmentSchema)

module.exports = entertainmentModel

