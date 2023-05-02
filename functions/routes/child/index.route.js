let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const childRoutes = require('./child.route');
const studyRoutes = require('./study.route');
const todoRoutes = require('./todo.route');

app.use(childRoutes);
app.use('/study', studyRoutes);
app.use('/todo', todoRoutes);

module.exports = app;