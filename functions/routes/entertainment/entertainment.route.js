const app = require('express').Router()

const entertainmentController = require('../../controllers/entertainment/entertainment.controller')

app.post("/addEntertainment", entertainmentController.addEntertainment);
app.get("/getAllEntertainment", entertainmentController.getAllEntertainment);
app.delete("/removeEntertainment", entertainmentController.removeEntertainment);

module.exports = app