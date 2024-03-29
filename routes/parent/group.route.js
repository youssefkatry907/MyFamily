let app = require('express').Router();
let groupController = require('../../controllers/parent/group.controller');

app.get('/listGroups', groupController.listGroups);
app.post('/createGroup', groupController.createGroup);
app.get('/getGroup', groupController.getGroup);

module.exports = app;