let express = require('express');

let app = express();

let checkToken = require('../../helpers/jwt.helper').verifyToken;
const allowedRoles = ['parent'];

const todotRoutes = require('./todo.route')

app.use('\todo', checkToken(allowedRoles), todotRoutes)

module.exports = app;