let app = require("express").Router();

let parentRoutes = require("./parent/parent.route");
let entertainmentRoutes = require("./entertainment/entertainment.route");
let todoRoutes = require("./todo/todo.route");
let childRoutes = require("./child/index.route");
let studyRoutes = require("./study/study.route");
let helperRoutes = require("./helper/helper.route");
let chatRoutes = require("./chat/chat.route");
let groupRoutes = require("./group/group.route");
let eventRoutes = require("./event/event.route");
let parentNotificationRoutes = require("./parent/notification.route");
let helperNotificationRoutes = require("./helper/notification.route");

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to myFamily Server!", code: 200 })
})

app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/entertainment", entertainmentRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/child", childRoutes);
app.use("/api/v1/study", studyRoutes);
app.use("/api/v1/helper", helperRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/group", groupRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/notification", parentNotificationRoutes);
app.use("/api/v1/notification", helperNotificationRoutes)



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