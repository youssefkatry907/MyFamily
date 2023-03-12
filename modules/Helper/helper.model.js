let mongoose = require('mongoose')
let parentModel = require('../Parent/parent.model')
let bcrypt = require("bcrypt");
let saltrounds = 5;

let helperSchema = mongoose.Schema({
    familyName: { type: String, required: true, ref: 'parentModel.familyUsername' },
    email: { type: String, required: true, ref: 'parentModel.helpers.email' },
    familyPassword: { type: String, required: true, ref: 'parentModel.familyPassword' },
    image: { type: String, required: false },
    // call the helpers permissions from parent model
    permissions: { type: Array, ref: 'parentModel.helpers.permissions' }

})

helperSchema.pre("save", async function (next) {
    this.familyPassword = bcrypt.hash(this.familyPassword, saltrounds);
    next();
})

let helperModel = mongoose.model('helpers', helperSchema)

module.exports = helperModel

