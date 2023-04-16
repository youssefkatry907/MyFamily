const app = require('express').Router()

const parentController = require('../../controllers/parent/parent.controller')
const { registerValidation, loginValidation, resetPasswordValidation } = require('../../validation/parent.authValidation');
const validator = require('../../helpers/validation.helper')

app.post("/register", validator(registerValidation), parentController.register);
app.post("/login", validator(loginValidation), parentController.login);
app.put("/updateProfile", parentController.updateProfile); 
app.put("/changePassword", validator(resetPasswordValidation), parentController.changePassword);
app.put("/logout", parentController.logout);
app.delete("/remove", parentController.deleteParent);
app.post("/addMember", parentController.addMember);

module.exports = app  