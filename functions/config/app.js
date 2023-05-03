const express = require('express')
const app = express()
const databaseConnection = require('./database').connection
const routes = require('../routes/index.route')
const { handleFileUploadErrors } = require('../helpers/uploader.helper')
require('dotenv').config()

databaseConnection();
// app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(routes);
app.use(handleFileUploadErrors)


app.get('/', (req, res) => {
    res.send('hello world!')
})


module.exports = app