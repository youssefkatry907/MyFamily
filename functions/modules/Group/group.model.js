let mongoose = require('mongoose');


let groupSchema = mongoose.Schema({
    parent1: { type: mongoose.Types.ObjectId, ref: 'parents' },
    parent2: { type: mongoose.Types.ObjectId, ref: 'parents', required: false },
    familyUserName: { type: String, ref: 'parents' },
    groupName: { type: String, required: true },
    groupImage: { type: String },
    groupDescription: { type: String },
    lastMessage: { type: String },
    lastMessageDate: { type: Date, default: Date.now },
    messages: [
        { type: Object }
    ],
    children: [
        {
            child: { type: mongoose.Types.ObjectId, ref: 'childrens' }
        }
    ],
    helpers: [
        {
            helper: { type: mongoose.Types.ObjectId, ref: 'helpers' },
        }
    ]
});


let groupModel = mongoose.model('groups', groupSchema);

module.exports = groupModel;
