let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const parentRoutes = require('./parent.route');
const notificationRoutes = require('./notification.route');
const chatRoutes = require('./chat.route');
const groupRoutes = require('./group.route');

app.use('/parent', checkToken(allowedRoles), parentRoutes);
app.use('/notification', checkToken(allowedRoles), notificationRoutes);
app.use('/chat', checkToken(allowedRoles), chatRoutes);
app.use('/group', checkToken(allowedRoles), groupRoutes);


module.exports = app;
