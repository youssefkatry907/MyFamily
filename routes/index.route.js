let app = require("express").Router();

let parentRoutes = require("./parent/parent.route");

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to VIP Server!", code: 200 })
})

app.use("/api/v1//parent", parentRoutes);



app.get("*", (req, res) => {
    res.status(404).json({ success: false, message: "Invalid URL!", code: 404 })
})

app.post("*", (req, res) => {
    res.status(404).json({ success: false, message: "Invalid URL!", code: 404 })
})

app.put("*", (req, res) => {
    res.status(404).json({ success: false, message: "Invalid URL!", code: 404 })
})

app.delete("*", (req, res) => {
    res.status(404).json({ success: false, message: "Invalid URL!", code: 404 })
})


app.patch("*", (req, res) => {
    res.status(404).json({ success: false, message: "Invalid URL!", code: 404 })
})

module.exports = app;