let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const childRoutes = require('./child.route');

app.use('/child', checkToken(allowedRoles), childRoutes);

module.exports = app;