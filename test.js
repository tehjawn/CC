var lossWeight;
var leanSchedule = [
{
	time: "7:00 am",
	activity: "Breakfest, egg and wheat bread"
},
{
	time: "9:00 am",
	activity: " 30 mintue Run"
},
{
	time: "11:00 am",
	activity: "Cycling Club"

},{
	time: "12:00 pm",
	activity: "Lunch, chicken and caesar salad"
},
{
	time: "3:00 pm",
	activity: "Lean Weight Training, core and legs"
},{
	time: "4:00 pm",
	activity: "Snack, fruits"
},
{
	time: "7:00 pm",
	activity: "Dinner, salmon with steam vegetables"


},{
	time: "9:00am",
	activity: "Sleep"
}];

var gainSchedule = [
{
	time: "7:00 am",
	activity: "Breakfest, Ham, eggs, and wheat bread"
},
{
	time: "9:00 am",
	activity: "warm up"
},
{
	time: "9:30 am",
	activity: "15 mintue run"

},{
	time: "12:00 pm",
	activity: "Lunch, Beef and caesar salad"
},
{
	time: "3:00 pm",
	activity: "Heavy Weight Training, chest and arm"
},{
	time: "4:00 pm",
	activity: "Snack, fruits"
},
{
	time: "7:00 pm",
	activity: "Dinner, Chicken with steam vegetables and potatos"


},{
	time: "9:00am",
	activity: "Sleep"
}];

var desiredSchedule = {};
if(lossWeight){
	desiredSchedule = leanSchedule;
}
else{
	desiredSchedule = gainSchedule;
}

console.log (desiredSchedule);