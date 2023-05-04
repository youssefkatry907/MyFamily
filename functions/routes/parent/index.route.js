let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const parentRoutes = require('./parent.route');
const notificationRoutes = require('./notification.route');

app.use('/parent', checkToken(allowedRoles), parentRoutes);
app.use('/notification', checkToken(allowedRoles), notificationRoutes);


module.exports = app;
