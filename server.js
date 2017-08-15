var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var users = [];


app.use('/', express.static(__dirname + "/www"));

server.listen(8080);
console.log("Server has started.");

io.on('connection', function(socket){
    socket.on('login', function(nickname){
        if(user.indexOf(nickname) > -1){
            socket.emit('loginFailed');
        }
        else{
            socket.nickname = nickname;
            users.push(nickname);
            console.log(nickname + ' is online, total: ' + 
                    users.length);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        }
    });


    socket.on('disconnect', function(){
        var index = users.indexOf(socket.nickname);
        users.splice(index, 1);
        io.socket.emit('system', socket.nickname, users.length,
                'logout');

        console.log(socket.nickname + ' is disconnected.');
        console.log(users);
    });


    socket.on('msgSend', function(msg){
        socket.broadcast.emit('newMsg', socket.nickname, msg);
    });
});
