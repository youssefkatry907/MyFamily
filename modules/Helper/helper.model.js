let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;

let helperSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropdups: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    imageUrl: { type: String, required: false },
    // familyId
})

helperSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, saltrounds);
    next();
})

let helperModel = mongoose.model('childrens', helperSchema)

module.exports = helperModel

