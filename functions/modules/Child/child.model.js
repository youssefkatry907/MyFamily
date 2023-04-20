let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;
let parentModel = require('../Parent/parent.model')

let childSchema = mongoose.Schema({
    parent: { type: mongoose.Types.ObjectId, ref: 'parents' },
    familyName: { type: String, required: true, ref: 'parentModel.familyUsername' },
    email: { type: String, required: true, ref: 'parentModel.children' },
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

