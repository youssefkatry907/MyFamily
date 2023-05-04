let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const helperRoutes = require('./helper.route');
const notificationRoutes = require('./notification.route');

app.use('/helper', checkToken(allowedRoles), helperRoutes);
app.use('/notification', checkToken(allowedRoles), notificationRoutes);

module.exports = app;