let mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, required: true },
    senderName: { type: String, required: true },
    receiver: { type: mongoose.Types.ObjectId, required: true },
    message: [
        { type: Object }
    ],
    date: { type: Date, default: Date.now },
    image: { type: String },
});

chatSchema.pre("save", async function (next) {
    next();
})


let chatModel = mongoose.model('chats', chatSchema);

module.exports = chatModel;