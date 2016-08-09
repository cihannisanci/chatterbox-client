// YOUR CODE HERE:
var app = {};

app.init = function() {

};

app.send = function(message) {
  

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function(message) {

  $.ajax({
    url: undefined,
    data: JSON.stringify(message),
    type: 'GET',
    success: '',
    dataType: ''
  });
};

app.clearMessages = function() {
  
  $('#chats').html('');

};

app.addMessage = function(message) {
   
  this.send(message);
  $('#chats').append('<button class="username">' + message.username + '</button>' + ': ' + message.text);

};

app.addRoom = function(roomName) {

  $('#roomSelect').append('<option>' + roomName + '</option>');
};

app.addFriend = function(e) {
  $(e.target).addClass('friend');
};

$('.username').on('click', app.addFriend(e));

