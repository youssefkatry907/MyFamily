let app = require("express").Router();

let parentRoutes = require("./parent/parent.route");
let entertainmentRoutes = require("./entertainment/entertainment.route");
let todoRoutes = require("./todo/todo.route");

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to myFamily Server!", code: 200 })
})

app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/entertainment", entertainmentRoutes);
app.use("/api/v1/todo", todoRoutes);



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