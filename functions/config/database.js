const mongoose = require("mongoose")


const connection = async () => {
    return mongoose.connect("mongodb+srv://Family:MyFamilyTeam@cluster0.kavfaaq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB database successfully!");
        }).catch((err) => {
            console.log("MongoDB Error: ", err);
        })
}

module.exports = { 
    connection,
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(uri);
    },
    disconnect: done => {
        mongoose.disconnect(done);
    }
};