var socket = io.connect();

socket.on("connect", function(){
  console.log("Connection made");
});

var chat_room = new ChatModule.Chat(socket);

$(function(){
  var $chat_room_div = $('#chat_room');
  var $user_list_div = $('#user_list');
  var $chat_submit = $('#submit_chat');
  var $user_ul = $('#user_ul')

  $('#chat_form').submit(function(event){
    event.preventDefault();
    $chat_room.sendMessage($('#chat_text').val());
  });

  socket.on("new_message", function(data){
    $chat_room_div.append(data['nickname'] + ": ");
    $chat_room_div.append(data['message']);
    $chat_room_div.append('<br>');
  });

  socket.on("chat_message", function(data){
    $chat_room_div.append(data['message']);
    $chat_room_div.append('<br>');
  });

  socket.on("user_list", function(data){
    $user_ul.html('');
    var nicks = data['nicknames'];
    for (attr in nicks) {
      if (!nicks.hasOwnProperty(attr)) {
        continue
      }
      var $newLi = $('<li>');
      $newLi.html(nicks[attr]);
      $user_ul.append($newLi);
    }

  })

  socket.on("announcement", function(data){
    $chat_room_div.append(data['message']);
    $chat_room_div.append('<br>');
  });

  socket.on('nicknameChangeResult', function(data){
    console.log(data);
    if (data['success']) {
    } else {
      $chat_room_div.append("<span id='nickname_error'>" + data['message'] + "</span>");
      $chat_room_div.append('<br>');
    }
  })

});


