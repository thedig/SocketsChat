// var chat_app = require('http').createServer(handler);
// (function(root){
//
//   var chatServer = root.chatServer = (root.chatServer || {})

  var socketIO = require("socket.io")
  var fs = require('fs');
  var io;

  var createChat = function (server) {
    io = socketIO.listen(server);

    io.sockets.on('connection', function(socket){
      socket.emit('chat_message', {message: 'Welcome to the chat!'});
      io.sockets.emit('announce_user', {message: 'New user joined!'});
      socket.on('user_submit', function(data) {
        io.sockets.emit('new_message', {message: data})
      })
    });

  };

  module.exports = createChat
// })(this);


