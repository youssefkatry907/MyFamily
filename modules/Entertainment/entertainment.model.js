let mongoose = require('mongoose')

let entertainmentSchema = mongoose.Schema({
    suggestions: [
        {
            suggestion: { type: String },
            percentage: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        }
    ],
    // 2, 3, 1, sum = 6
    // 2/6 = 33.33, 3/6 = 50, 1/6 = 16.66
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'parents'
    },
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

