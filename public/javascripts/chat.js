(function(root) {
	var ChatModule = root.ChatModule = root.ChatModule || {};

	var Chat = ChatModule.Chat = function(socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    var res = message.match(/\/nick/);

    if (res){
      socket.emit("nicknameChangeRequest", message.slice(6));
    } else {
      socket.emit("user_submit", message);
    }
  };

})(this);