let mongoose = require('mongoose');

let groupSchema = mongoose.Schema({
    parent1: { type: mongoose.Types.ObjectId, ref: 'parents' },
    parent2: { type: mongoose.Types.ObjectId, ref: 'parents', required: false },
    groupName: { type: String, required: true },
    groupImage: { type: String },
    groupDescription: { type: String },
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
