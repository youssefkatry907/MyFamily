let mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, required: true },
    senderName: { type: String, required: true },
    receiver: { type: mongoose.Types.ObjectId, required: true },
    receiverName: { type: String, required: true },
    messages: [
        { type: Object }
    ],
    lastMessage: { type: String },
    lastMessageDate: { type: String },
    senderImage: { type: String },
    receiverImage: { type: String }
});

chatSchema.pre("save", async function (next) {
    next();
})


let chatModel = mongoose.model('chats', chatSchema);

module.exports = chatModel;