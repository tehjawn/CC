$(document).ready(function() {
    console.log("Loaded webpage!");
});
var unit;

var caloriesRep = function(calories,reps){
        calories = (reps/5)+calories;
        return calories;
}

var caloriesTime = function(calories,time){
    calories = (time * 5) + calories;
    return calories;
}

// var name;

var caloriesBurn = 0;

updateCalories = function(calories){
	$("#calories").text(calories);
	$.apply
}

var log = [];

var leanSchedule = [
{
 time: "7 am",
 activity: "Breakfest, egg and wheat bread"
},
{
 time: "9 am",
 activity: " 30 mintue Run"
},
{
 time: "11 am",
 activity: "Cycling Club"

},{
 time: "12 pm",
 activity: "Lunch, chicken and caesar salad"
},
{
 time: "3 pm",
 activity: "Lean Weight Training, core and legs"
},{
 time: "4 pm",
 activity: "Snack, fruits"
},
{
 time: "7 pm",
 activity: "Dinner, salmon with steam vegetables"


},{
 time: "9 am",
 activity: "Sleep"
}];

var currentUser;

startCoach = function() {
    $("#intro").fadeOut();
    $("#app").fadeIn();
    $("#demo-canvas").fadeIn();
    $(".app-content").fadeIn();
    $("#line").fadeIn();
    $("#bg").addClass("blurred");

    // setTimeout(function(){
    	say("Hello! My name is Crystal and I will be your coach. What is your name?");
    // }, 1000);

    setTimeout(function() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
        if (window.SpeechRecognition == null) {
            console.log('empty');
        } else {
            var recognizer = new window.SpeechRecognition();
            recognizer.continuous = false;
            var text;
            var name;
            recognizer.onresult = function(event) {
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        text = event.results[i][0].transcript;
                    } else {
                        text += event.results[i][0].transcript;
                    }
                }
                var splitScript = event.results[0][0].transcript.split(" ");
                console.log(text);
                $.ajax({
                    type: "POST",
                    url: "/",
                    data: {
                        input: text
                    },
                    success: function(data) {
                        console.log(data);
                        //responsiveVoice.speak("You did " + data.number + data.activity, "UK English Female");
                        //console.log(data.activity);
                        var logData = {};
                        switch (data.intent) {
                            case 'name.save':
                                currentUser = splitScript[splitScript.length-1];
                                responsiveVoice.speak("Hi " + currentUser + ", it's nice to see you!", "UK English Female");
                                init_firebase(currentUser);
                                break;
                            default:
                                currentUser = splitScript[splitScript.length-1];
                                responsiveVoice.speak("Hi " + currentUser + ", it's nice to see you!", "UK English Female");
                                init_firebase(currentUser);
                                break;
                        }
                    }
                });

            };
            recognizer.onerror = function(error) {
                console.log(error);
            };
            try {
                recognizer.start(); // SUCCESS
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }, 5500);
}

say = function(speech) {
    responsiveVoice.speak(speech, "UK English Female");
}


getVoice = function() {
		// var foo=new Sound("./res/boop.mp3",100,true);
		// foo.start();
		// foo.stop();
		// foo.start();
		// foo.init(2000,false);
		// foo.remove();

    setTimeout(function() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
        if (window.SpeechRecognition == null) {
            console.log('empty');
        } else {
            var recognizer = new window.SpeechRecognition();
            recognizer.continuous = false;
            var text;
            recognizer.onresult = function(event) {
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        text = event.results[i][0].transcript;
                    } else {
                        text += event.results[i][0].transcript;
                    }
                }
                console.log(text);
                messagesRef.push({
                    name: currentUser,
                    text: text
                });
                var crystalresponse;
                $.ajax({
                      type: "POST",
                      url: "/",
                      data: { input: text },
                      success: function(data){
                          console.log(data);
                          //responsiveVoice.speak("You did " + data.number + data.activity, "UK English Female");
                          //console.log(data.activity);
                          var logData = {};
                          switch (data.intent) {

                              case 'RepWorkout':
                              		crystalresponse = "Great, I added " + data.number + data.activity + " to your log";
                                  responsiveVoice.speak(crystalresponse, "UK English Female");
                                  caloriesBurn = caloriesRep(caloriesBurn,data.number);
                                  logData.activity = data.activity;
                                  logData.count = data.number;
                                  logData.date = new Date();
                                  log.push(logData);
                                  messagesRef.push({
											                name: "Crystal",
											                text: crystalresponse
											            });
                                  break;
                              case 'TimeBaseWorkouts':
                                   
                                  if(data.duration.unit == 's'){
                                      unit = "seconds";
                                  }
                                  else if(data.duration.unit == 'min'){
                                      unit = "minutes"

                                  }
                                  else{
                                      unit = "hours"
                                  }
                                  crystalresponse = "Great, I added " + data.activity + "for" + data.duration.amount +unit+ " to your log";
                                  responsiveVoice.speak(crystalresponse , "UK English Female");
                                  caloriesBurn = caloriesTime(caloriesBurn,data.duration.amount);
                                  logData.activity = data.activity;
                                  logData.count = data.duration.amount + ' ' + unit;
                                  logData.date = new Date();
                                  log.push(logData);
                                  messagesRef.push({
											                name: "Crystal",
											                text: crystalresponse
											            });
                                  break;

                              case 'caloriesCount':
                              		crystalresponse = "You burn " + caloriesBurn + "calories";
                                  responsiveVoice.speak(crystalresponse, "UK English Female");
                                  messagesRef.push({
											                name: "Crystal",
											                text: crystalresponse
											            });
                                  break;
                             case 'scheduler':
                                    var catString = leanSchedule[0].time +" "+ leanSchedule[0].activity +".";
                                    for(var i = 1; i < leanSchedule.length; i++){
                                      catString =  catString+leanSchedule[i].time +" "+ leanSchedule[i].activity +".";
                                    }
                                   	crystalresponse = "Here an overview of your day. " + catString;

                                    responsiveVoice.speak(crystalresponse, "UK English Female");
                               	
                                  messagesRef.push({
											                name: "Crystal",
											                text: crystalresponse
											            });
                               		break;
                               case 'log':
                               break;
                              default:
                                  messagesRef.push({
											                name: "Crystal",
											                text: "Sorry I didn't get that"
											            });
                                  responsiveVoice.speak("Sorry I didn't get dat" , "UK English Female");
                                  break;
                          }
                      }
                  });
                
            };
            recognizer.onerror = function(error) {
                console.log(error);
            };
            try {
                recognizer.start(); // SUCCESS
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }, 100);
	updateCalories(caloriesBurn);
}


var messagesRef;

// REGISTER DOM ELEMENTS
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#messages');
var key;

//Firebase
// CREATE A REFERENCE TO FIREBASE
init_firebase = function(username) {
    console.log(username);
    $("#username").text(username);
    messagesRef = new Firebase('https://crystalcoach.firebaseio.com/' + username);
    console.log("Attempted to connect to https://crystalcoach.firebaseio.com/" + username);
    messagesRef.push({
    	name: "Crystal",
    	text: "Hi " + currentUser + ", it's nice to see you!"
    });
    messagesRef.push({
    	name: "Crystal",
    	text: "Say 'I did 50 pushups', 'I ran for 5 minutes', 'Calories Burn', 'What should I do today?'"
    });

    $("#calories").text(caloriesBurn);
    $("#crystalSuggest").text("messagesRef".crystalSuggest);

    // Add a callback that is triggered for each chat message.
    messagesRef.limitToLast(10).on('child_added', function(snapshot) {
        //GET DATA
        var key = snapshot.key();
        var data = snapshot.val();
        var username = data.name || "anonymous";
        var message = data.text;

        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var messageElement = $("<li id=" + key + " onClick=removeMessage(&#39;" + key + "&#39;)>");
        var nameElement = $("<strong class='username'></strong>")
        nameElement.text(username);
        messageElement.text(message).prepend(": ").prepend(nameElement);

        //ADD MESSAGE
        messageList.append(messageElement)

        //SCROLL TO BOTTOM OF MESSAGE LIST
        // messageList[0].scrollTop = messageList[0].scrollHeight;
        // $("#messageStore").animate({
        //     scrollTop: $('#messageStore')[0].scrollHeight
        // }, 1000);
    });

    removeMessage = function(key) {
        if (window.confirm("Are you sure you want to delete this message?")) {
            var keyRef = new Firebase('https://crystalcoach.firebaseio.com/john' + key);
            keyRef.remove();
            $("#" + key).hide();
        }
    };

    removeAll = function() {
        if (window.confirm("Are you sure you want to delete the entire chat?")) {
            messagesRef.remove();
            $('#messages').empty();
        }
    };
}

// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function(e) {
    if (e.keyCode == 13) {
        //FIELD VALUES
        var username = nameField.val();
        var message = messageField.val();
        if(messagesRef){
	        //SAVE DATA TO FIREBASE AND EMPTY FIELD
	        messagesRef.push({
	            name: username,
	            text: message
	        });
	        messageField.val('');
        } else {
        	alert("Please sign into CrystalCoach first!");
        }
    }
});

// Sound Function for playing boop
function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}