let mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    // seen: { type: Boolean, default: false },
});

chatSchema.pre("save", async function (next) {
    next();
})


let chatModel = mongoose.model('chats', chatSchema);

module.exports = chatModel;