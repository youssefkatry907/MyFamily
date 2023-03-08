let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;

let parentSchema = mongoose.Schema({
    langauge: { type: String, required: true, default: "en" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropdups: true },
    password: { type: String, required: true },
    otherParentName: { type: String, required: false },
    otherParentEmail: { type: String, required: false, unique: true, dropDups: true },
    familyUsername: { type: String, required: true },
    familyEmail: { type: String, required: true, unique: true, dropDups: true },
    familyPassword: { type: String, required: true },
    helpersNo: { type: Number },
    childrenNo: { type: Number },
    helpers:{ type: Array },
    children: { type: Array },
})

parentSchema.pre("save", async function (next) { 
    this.password = await bcrypt.hash(this.password, saltrounds); 
    next();
})

// hash family password
parentSchema.pre("save", async function (next) {
    this.familyPassword = await bcrypt.hash(this.familyPassword, saltrounds);
    next();
})

let parentModel = mongoose.model('parents', parentSchema)

module.exports = parentModel
