let mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let saltrounds = 5;

let parentSchema = mongoose.Schema({
    language: { type: String, required: true, default: "en" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropdups: true },
    password: { type: String, required: true },
    otherParentName: { type: String, required: false },
    otherParentEmail: { type: String, required: false, unique: true, dropDups: true },
    familyUserName: { type: String, required: true, unique: true },
    familyPassword: { type: String, required: true },
    helpersNo: { type: Number },
    childrenNo: { type: Number },
    helpers: {
        type: [{
            email: { type: String },
            permissions: [{ type: Number }]
        }],
    },
    children: { type: Array },
    groups: [
        { type: mongoose.Types.ObjectId, ref: 'groups' }
    ],
    image: { type: Object },
    role: { type: String, default: "parent" },
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
