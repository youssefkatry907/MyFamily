let mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
    tasks: { type: Array, required: true }
})

let todoModel = mongoose.model('todos', todoSchema)

module.exports = todoModel