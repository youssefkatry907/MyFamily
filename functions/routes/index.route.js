let app = require("express").Router();

let parentRoutes = require("./parent/parent.route");
let entertainmentRoutes = require("./entertainment/entertainment.route");
let todoRoutes = require("./todo/todo.route");
let childRoutes = require("./child/index.route");
let helperRoutes = require("./helper/index.route");
let studyRoutes = require("./study/study.route");
let eventRoutes = require("./event/event.route");

let parentNotificationRoutes = require("./parent/notification.route");
let parentChatRoutes = require("./parent/chat.route");
let parentGroupRoutes = require("./parent/group.route");

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to myFamily Server!", code: 200 })
})

app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/entertainment", entertainmentRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/child", childRoutes);
app.use("/api/v1/helper", helperRoutes);
app.use("/api/v1/study", studyRoutes);
app.use("/api/v1/event", eventRoutes);

app.use("/api/v1/notification", parentNotificationRoutes);
app.use("/api/v1/chat", parentChatRoutes);
app.use("/api/v1/group", parentGroupRoutes);




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