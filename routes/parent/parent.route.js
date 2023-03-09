const app = require('express').Router()

const parentController = require('../../controllers/parent/parent.controller')
const { registerValidation, loginValidation, resetPasswordValidation } = require('../../validation/parent.authValidation');
const validator = require('../../helpers/validation.helper')

app.post("/register", validator(registerValidation), parentController.register);
app.post("/login", validator(loginValidation), parentController.login); 
app.post("/resetPassword", validator(resetPasswordValidation), parentController.resetPassword);
app.put("/logout", parentController.logout);

module.exports = app  