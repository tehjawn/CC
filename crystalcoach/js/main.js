$(document).ready(function () {

  $('.test-button').click(function () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

    if (window.SpeechRecognition == null) {
      console.log('empty');
    } else {
      var recognizer = new window.SpeechRecognition();
      recognizer.continuous = false;
      var text;
      recognizer.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            text = event.results[i][0].transcript;
          } else {
            text += event.results[i][0].transcript;
          }
        }
        console.log(text);
        $.ajax({
          type: "POST",
          url: "/",
          data: { input: text },
          success: function(data){
            console.log(data);
            // responsiveVoice.speak("You did " + data.number + data.activity, "UK English Female");
            // console.log(data.activity);
            
            switch (data.action) {
              case 'exercise':
                responsiveVoice.speak("You did " + data.number + data.activity/* + " and burned " + data.calorie + " calories"*/, "UK English Female");
                break;
              case 'calorie':
                responsiveVoice.speak("You gained " + data.number + " calories", "UK English Female");
                break;
              default:
                break;
            }
          }
        });
      };
      recognizer.onerror = function (error) {
        console.log(error); 
      };
      try {
        recognizer.start(); // SUCCESS
      } catch (ex) {
        console.log(ex.message);
      }
    }
  });
});

//Firebase
// CREATE A REFERENCE TO FIREBASE
var messagesRef = new Firebase('https://crystalcoach.firebaseio.com/');

// REGISTER DOM ELEMENTS
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#messages');
var key;


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