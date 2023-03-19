let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const helperRoutes = require('./helper.route');

app.use('/helper', checkToken(allowedRoles), helperRoutes);

module.exports = app;