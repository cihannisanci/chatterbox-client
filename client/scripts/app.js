// YOUR CODE HERE:
var app = {};
app.server = 'https://api.parse.com/1/classes/messages';
var username = 'jack';
// sessionStorage.setItem('chatContent', 'go');

app.init = function() {
  $(document).ready(function () {
    $('#main').on('click', '.username', app.addFriend);
    $('#send').on('submit', '.submit', app.handleSubmit);
  });
};

app.send = function(message) {
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
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

app.fetch = function() {

  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      app.update(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to fetch', data);
    }
  });  
};

app.update = function(data) {
  console.log(data);
  // $('#chats').append('<button class="username">' + message.username + '</button>' + ': ' + message.text);
};

app.clearMessages = function() {
  
  $('#chats').html('');

};

app.addMessage = function(message) {
   
  this.send(message);
  $('#chats').append('<button class="username">' + message.username + '</button>' + ': ' + message.text);
  sessionStorage.setItem('chatContent', $('#chats').html());
};

app.addRoom = function(roomName) {

  $('#roomSelect').append('<option>' + roomName + '</option>');
};

app.addFriend = function(e) {
  $(e.target).addClass('friend');
  console.log('go');
};

app.handleSubmit = function(e) {
  
  var message = {
    username: username,
    text: $('#message').val(),
    roomname: $('select option:selected').val()
  };
  app.addMessage(message);
  $('#chats').html(sessionStorage[chatContent]);
  // sessionStorage.setItem('chatContent', 'go');
  // $('#chats').html());
  // sessionStorage.setItem();
};


 // $(document).ready(function () {
 //    app.addMessage({
 //          username: 'Mel Brooks',
 //          text: 'I didn\'t get a harumph outa that guy.!',
 //          roomname: 'lobby'
 //        });
 //    app.addRoom('d');
 //  });


// $('#send .submit').trigger('submit');

