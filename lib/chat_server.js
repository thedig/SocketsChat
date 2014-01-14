var socketIO = require("socket.io")
var fs = require('fs');
var io;
var guestnumber = 1;
var nicknames = {};
var namesUsed = [];

var createChat = function (server) {
  io = socketIO.listen(server);

  io.sockets.on('connection', function(socket){
    var nickname = ("guest" + guestnumber);
    nicknames[socket.id] = nickname;
    var current_guest = guestnumber;
    guestnumber += 1;

    socket.emit('chat_message', {message: 'Welcome to the chat!'});
    io.sockets.emit('user_list', {nicknames: nicknames});
    io.sockets.emit('announcement', {message: 'New user joined!'});
    socket.on('user_submit', function(data) {
      io.sockets.emit('new_message', {
        message: data,
        nickname: nickname
      })
    });

    socket.on('nicknameChangeRequest', function(data) {
      nickname = changeNickname(data, socket);
    })

    socket.on('disconnect', function(data){
      deleteNickname(socket.id);
      io.sockets.emit('user_list', {nicknames: nicknames});
    })

  });
};

var changeNickname = function (newName, socket) {
  oldName = nicknames[socket.id];
  var res = newName.match(/^guest/);
  var newNameIndex = namesUsed.indexOf(newName);
  if (newNameIndex > -1) {
    socket.emit('nicknameChangeResult', {
      success: false,
      message: 'Nickname Already Taken!'
    });
  } else if (res){
    socket.emit('nicknameChangeResult', {
      success: false,
      message: 'Nickname cannot begin with "guest"!'
    });
  } else {
    updateNickname(newName, oldName, socket);
    socket.emit('nicknameChangeResult', {
      success: true,
      newName: newName
    });
    io.sockets.emit('announcement', {message: oldName + ' has changed to ' + newName});
  }
  return nicknames[socket.id];

};

var deleteNickname = function(socketid) {
  removeNickname(nicknames[socketid]);
  delete nicknames[socketid];
}

var removeNickname = function(nickname) {
  var nameIndex = namesUsed.indexOf(nickname);
  namesUsed.splice(nameIndex, 1);
}

var updateNickname = function(newName, oldName, socket) {
  nicknames[socket.id] = newName;
  removeNickname(oldName);
  namesUsed.push(newName);
}


module.exports = createChat


