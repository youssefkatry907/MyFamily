let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
    messageDate: { type: Date, default: Date.now },
})

messageSchema.pre("save", async function (next) {
    next();
})

let messageModel = mongoose.model('messages', messageSchema);

module.exports = messageModel;

