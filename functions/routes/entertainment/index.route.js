let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const entertainmentRoutes = require('./entertainment.route')

app.use('\entertainment', checkToken(allowedRoles), entertainmentRoutes)

module.exports = app;