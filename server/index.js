const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    // console.log(user);
    // console.log(error);

    if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name} welcome to to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(getUser(socket.id));

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
