let mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
    toDoList: [
        {
            // return the child record
            childId: {
                type: mongoose.Types.ObjectId,
                ref: 'childrens'
            },
            tasks: [
                {
                    task: { type: String },
                    done: { type: Boolean, default: false }
                }
            ]
        }
    ],
})

let todoModel = mongoose.model('todos', todoSchema)

module.exports = todoModel