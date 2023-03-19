const express = require('express')
const app = express()
const databaseConnection = require('./database').connection
const routes = require('../routes/index.route')
require('dotenv').config()

databaseConnection();


app.use(express.json());
app.use(routes);


app.get('/', (req, res) => {
    res.send('hello world!')
})


module.exports = app