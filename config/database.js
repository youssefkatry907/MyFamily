const mongoose = require("mongoose")

// const uri = "mongodb://localhost:27017/myFamily"
const connection = () => {
    mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database connected successfully"))
        .catch(err => console.log(err))
}

module.exports = { connection }