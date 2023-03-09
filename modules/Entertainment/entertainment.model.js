let mongoose = require('mongoose')

let entertainmentSchema = mongoose.Schema({
    titles: { type: Array, required: true },

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

