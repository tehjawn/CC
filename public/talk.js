var caloriesBurn = 0;
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

var caloriesRep = function(calories,reps){
        calories = (reps/5)+calories;
        return calories;
}

var caloriesTime = function(calories,time){
    calories = (time * 5) + calories;
    return calories;
}

var name;

$(document).ready(function () {

    // setTimeout(function(){responsiveVoice.speak("my name is john and I am a princess" , "UK English Male");},2000);
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
                          //responsiveVoice.speak("You did " + data.number + data.activity, "UK English Female");
                          //console.log(data.activity);
                          var logData = {};
                          switch (data.intent) {

                              case 'RepWorkout':
                                  responsiveVoice.speak("Great, I added " + data.number + data.activity + " to your log" , "UK English Female");
                                  caloriesBurn = caloriesRep(caloriesBurn,data.number);
                                  logData.activity = data.activity;
                                  logData.count = data.number;
                                  logData.date = new Date();
                                  log.push(logData);
                                  break;
                              case 'TimeBaseWorkouts':
                                  var unit; 
                                  if(data.duration.unit == 's'){
                                      unit = "seconds";
                                  }
                                  else if(data.duration.unit == 'min'){
                                      unit = "minutes"

                                  }
                                  else{
                                      unit = "hours"
                                  }
                                  responsiveVoice.speak("Great, I added " + data.activity + "for" + data.duration.amount +unit+ " to your log" , "UK English Female");
                                  caloriesBurn = caloriesTime(caloriesBurn,data.duration.amount);
                                  logData.activity = data.activity;
                                  logData.count = data.duration.amount + ' ' + unit;
                                  logData.date = new Date();
                                  log.push(logData);
                                  break;

                              case 'caloriesCount':
                                  responsiveVoice.speak("You burn " + caloriesBurn + "calories" , "UK English Female");
                                  break;
                             case 'name.save':
                                   name = data.username;
                                   responsiveVoice.speak("Hello," + name + " welcome to Crystal Coach I am your personal trainer, Crystal", "UK English Female");
                                   break;
                             case 'scheduler':
                                    var catString = leanSchedule[0].time +" "+ leanSchedule[0].activity +".";
                                    for(var i = 1; i < leanSchedule.length; i++){
                                      catString =  catString+leanSchedule[i].time +" "+ leanSchedule[i].activity +".";
                                    }
                                    responsiveVoice.speak("Here an overview of your day. " + catString, "UK English Female");
                               break;
                               case 'log':
                               break;
                              default:
                                  responsiveVoice.speak("Sorry I didn't get that" , "UK English Female");
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