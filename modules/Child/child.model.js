let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;

let childSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropdups: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    imageUrl: { type: String, required: false },
    // familyId
})

childSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, saltrounds);
    next();
})

let childModel = mongoose.model('childrens', childSchema)

module.exports = childModel

