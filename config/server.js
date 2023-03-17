const app = require('./app')


let server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        
    });
});

module.exports = app;
// exports.app = functions.https.onRequest(app);