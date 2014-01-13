(function(root) {
	var ChatModule = root.ChatModule = root.ChatModule || {};

	var Chat = ChatModule.Chat = function(socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    socket.emit("user_submit", message);
  };

})(this);