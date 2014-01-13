var socket = io.connect();

socket.on("connect", function(){
  console.log("Connection made");
});

var chat_room = new ChatModule.Chat(socket);

$(function(){
  var chat_room_div = $('#chat_room');

  var chat_submit = $('#submit_chat');

  $('#chat_form').submit(function(event){
    event.preventDefault();
    chat_room.sendMessage($('#chat_text').val());
  });

  socket.on("new_message", function(data){
    console.log(data);
    // chat_room_div.append("<br>")
    chat_room_div.append(data['message']);
    chat_room_div.append('<br>');
  });

  socket.on("chat_message", function(data){
    console.log(data);
    // chat_room_div.append("<br>")
    chat_room_div.append(data['message']);
    chat_room_div.append('<br>');
  });

  socket.on("announce_user", function(data){
    console.log(data);
    // chat_room_div.append("<br>")
    chat_room_div.append(data['message']);
    chat_room_div.append('<br>');
  });

});


