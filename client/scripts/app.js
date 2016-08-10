// YOUR CODE HERE:
var app = {};
app.server = 'https://api.parse.com/1/classes/messages';
var username = 'jack';
var rooms = {};
var friends = [];
var mostRecentId = '';

$(document).ready(function () {
  app.init();
});

app.init = function() {
  $('#chats').on('click', '.username', app.addFriend);
  $('.submit').click(app.handleSubmit);
  $('#roomSelect').on('change', app.changeRoom);
  $('#roomSelect').on('click', app.currentRoom);
};

app.send = function(message) {
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      mostRecentId = data.objectId;
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
    data: {
      order: '-createdAt'
    },
    dataType: 'json',
    success: function(data) {
      if (!data.results || !data.results.length) {
        return;
      }

      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].objectId === mostRecentId) {
          break;
        }
        if ($('select option:selected').val() === data.results[i].roomname) {
          app.render(data.results[i]);
        } else if (rooms[data.results[i].roomname] === undefined) {
          app.addRoom(data.results[i].roomname);
        }
      }
      
    },
    error: function (data) {
      console.error('chatterbox: Failed to fetch', data);
    }
  });  
};

app.clearMessages = function() {
  
  $('#chats').html('');

};

app.changeRoom = function(e) {

  roomName = $('#roomSelect option:selected').text();

  if (roomName === 'New Room...') {
    var newRoom = prompt('What is the name of the room you would like to add?');
    app.addRoom(newRoom);
    $('#roomSelect option[value=' + newRoom + ']').prop('selected', true);
    $('#chats').html('');
    return;
  }
 
  var searchArr = [];
  
  for (var i = 0; i < friends.length; i++) {
    var searchStr = '"username">' + friends[i];  
    searchArr.push(new RegExp(searchStr, 'g'));
  }
  
  for (var i = 0; i < searchArr.length; i++) {
    var currStr = searchArr[i].toString();
    var rep = ' "username friend"> ' + currStr.slice(12, -2);
    rooms[roomName] = rooms[roomName].replace(searchArr[i], rep);
  }
 
  $('#chats').html(rooms[roomName]);
};

app.currentRoom = function(e) {
  roomName = $('#roomSelect option:selected').text();
  rooms[roomName] = $('#chats').html();
  console.log('go');
};

app.addMessage = function(message) {  
  this.send(message);
  app.render(message);
};

app.render = function(message) {
  if (friends.includes(message.username)) {
    var $username = $('<a href="#" class="username friend">');
  } else {
    var $username = $('<a href="#" class="username">');
  }

  $username.text(message.username);
  var $mess = $('<span>');
  $mess.text(message.text);
  $('#chats').append($username);
  $('#chats').append(': ');
  $('#chats').append($mess);
  $('#chats').append('<br>');
};

app.addRoom = function(roomName) {
  rooms[roomName] = '';
  var $room = $('<option class="roomOption">');
  $room.val(roomName).text(roomName);
  $('#roomSelect').append($room);
};

app.addFriend = function(e) {
  username = $(e.target).text();
  $('a:contains(' + username + ')').addClass('friend');
  friends.push(username);
};

app.handleSubmit = function(e) {
  
  var message = {
    username: username,
    text: $('#message').val(),
    roomname: $('select option:selected').val()
  };

  app.addMessage(message);
  $('#message').val('');
  e.preventDefault();
};

