let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;
let parentModel = require('../Parent/parent.model')

let childSchema = mongoose.Schema({
    parent: { type: mongoose.Types.ObjectId, ref: 'parents' },
    email: { type: String, required: true, ref: 'parentModel.children' },
    familyUserName: { type: String, required: true, ref: 'parentModel.familyUserName' },
    familyEmail: { type: String, required: true, ref: 'parentModel.familyEmail' },
    familyPassword: { type: String, required: true, ref: 'parentModel.familyPassword' },
    image: { type: String, required: false },
    groups: [
        { type: mongoose.Types.ObjectId, ref: 'groups' }
    ],
    // familyId
})

childSchema.pre("save", async function (next) {
    this.familyPassword = bcrypt.hash(this.familyPassword, saltrounds);
    next();
})

let childModel = mongoose.model('childrens', childSchema)

module.exports = childModel

