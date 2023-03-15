let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const parentRoutes = require('./parent.route');

app.use('/parent', checkToken(allowedRoles), parentRoutes);

module.exports = app;