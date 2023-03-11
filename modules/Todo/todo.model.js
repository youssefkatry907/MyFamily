let mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
    toDoList: [
        {
            childId: {
                type: mongoose.Types.ObjectId,
                ref: 'childrens'
            },
            tasks: {type: Object, required: true}
        }
    ],
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'parents'
    }
})

let todoModel = mongoose.model('todos', todoSchema)

module.exports = todoModel