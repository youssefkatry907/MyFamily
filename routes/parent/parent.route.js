const app = require('express').Router()

const parentController = require('../../controllers/parent/parent.controller')

app.post("/register", parentController.register);
app.post("/login", parentController.login);
app.post("/resetPassword", parentController.resetPassword);
app.delete("/logout", parentController.logout);

module.exports = app  