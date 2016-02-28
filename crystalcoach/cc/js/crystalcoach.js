var messagesRef;

// REGISTER DOM ELEMENTS
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#messages');
var key;

//Firebase
// CREATE A REFERENCE TO FIREBASE
init_firebase = function(username){
  messagesRef = new Firebase('https://crystalcoach.firebaseio.com/'+username);
  alert("Attempted to connect to https://crystalcoach.firebaseio.com/"+username);
}


// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function (e) {
if (e.keyCode == 13) {
  //FIELD VALUES
  var username = nameField.val();
  var message = messageField.val();

  //SAVE DATA TO FIREBASE AND EMPTY FIELD
  messagesRef.push({name:username, text:message});
  messageField.val('');
}
});

// Add a callback that is triggered for each chat message.
messagesRef.limitToLast(10).on('child_added', function (snapshot) {
//GET DATA
var key = snapshot.key();
var data = snapshot.val();
var username = data.name || "anonymous";
var message = data.text;

//CREATE ELEMENTS MESSAGE & SANITIZE TEXT
var messageElement = $("<li id="+key+" onClick=removeMessage(&#39;"+key+"&#39;)>");
var nameElement = $("<strong class='username'></strong>")
nameElement.text(username);
messageElement.text(message).prepend(": ").prepend(nameElement);

//ADD MESSAGE
messageList.append(messageElement)

//SCROLL TO BOTTOM OF MESSAGE LIST
messageList[0].scrollTop = messageList[0].scrollHeight;
$("#messageStore").animate({ scrollTop: $('#messageStore')[0].scrollHeight}, 1000);
});

removeMessage = function(key){
  if(window.confirm("Are you sure you want to delete this message?")){
    var keyRef = new Firebase('https://crystalcoach.firebaseio.com/'+key);
    keyRef.remove();
    $("#"+key).hide();
  }
};

removeAll = function(){
  if(window.confirm("Are you sure you want to delete the entire chat?")){
    messagesRef.remove();
    $('#messages').empty();
  }
};