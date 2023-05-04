let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const childRoutes = require('./child.route');
const studyRoutes = require('./study.route');
const todoRoutes = require('./todo.route');
const chatRoutes = require('./chat.route');
const notificationRoutes = require('./notification.route');

app.use(childRoutes);
app.use('/study', studyRoutes);
app.use('/todo', todoRoutes);
app.use('/chat', chatRoutes);
app.use('/notification', notificationRoutes);

module.exports = app;