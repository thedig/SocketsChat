var http = require('http');
var fs = require('fs');
var nodeStatic = require("node-static");
var socketIO = require("socket.io");
var chatServer = require("./lib/chat_server");

var file = new nodeStatic.Server('./public');

var server = http.createServer(function (request, response){
  // response.writeHead(200, {'Content-Type': 'text/html'});
  // response.end();
  request.addListener('end', function(){
    file.serve(request, response);
  }).resume();
});

function handler() {}

server.listen(8080);

console.log('Server running on port 8080');

// chatServer.createChat(server);

chatServer(server);