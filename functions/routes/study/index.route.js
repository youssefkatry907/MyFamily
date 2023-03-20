let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const studyRoutes = require('./study.route');

app.use('/study', checkToken(allowedRoles), studyRoutes);

module.exports = app;