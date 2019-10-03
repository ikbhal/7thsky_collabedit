var path = require('path');

// express
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);//npm install --save socket.io

app.use(express.json());


app.get('/ping', function(req, res){
    res.send("pong");
});


// chat begin
app.get('/chat', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        //io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
        io.emit('chat_message', message);
    });

});

// chat end
app.use(express.static("public"));
const server = http.listen(3000, function() {
    console.log('listening on *:3000');
});
