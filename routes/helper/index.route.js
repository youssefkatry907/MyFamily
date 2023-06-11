let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const helperRoutes = require('./helper.route');
const notificationRoutes = require('./notification.route');
const chatRoutes = require('./chat.route');

app.use(helperRoutes);
app.use('/notification', notificationRoutes);
app.use('/chat', chatRoutes);

module.exports = app;