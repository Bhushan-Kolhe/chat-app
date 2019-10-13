const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom, getRooms } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(path.join(__dirname, 'build')));

io.on('connection', socket => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback({error});

        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} Joined the chat.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        io.emit('getRooms', {rooms: getRooms()});

        callback();
    });

    socket.on('sendMessage', ( message, callback ) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user:user.name, text:message })

        callback();
    });

    socket.on('startTyping', ({ name, room }) => {
        socket.broadcast.to(room).emit('Typing', { user:name });
    });

    socket.on('stopTyping', ({ room }) => {
        socket.broadcast.to(room).emit('Typing', { user: "" });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);  

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            io.emit('getRooms', {rooms: getRooms()});
        }
    });

    socket.emit('getRooms', {rooms: getRooms()});

});

server.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));