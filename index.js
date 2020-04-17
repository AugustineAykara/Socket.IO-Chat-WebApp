var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat', function (msg, username) {
        io.emit('chat', msg, username);
        console.log(username + " : " + msg);
    });
});

http.listen(process.env.PORT || 3000, function () {
    console.log("listen on port 3000");
});