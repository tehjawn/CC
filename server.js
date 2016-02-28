var apiai = require('apiai');
var express = require('express');
var app = express();
// API.AI Connector (Client Key, Sub Key)
var api = apiai("3a70592383834529b940f1862e5bcc0b ", "c115821f-c02a-4455-ab87-6734db7054c4 ");


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.end();
});


app.post('/', function (req, res) {
    console.log(req.body.input);
    var textResponse = {};
    var responses;
	var request = api.textRequest(req.body.input);
 
	request.on('response', function(response) {
    	console.log(response);
    	if(response.result.parameters.RepBaseWorkouts != undefined){
    		textResponse.activity = response.result.parameters.RepBaseWorkouts;
    		textResponse.number = response.result.parameters.number;
    	}
    	else if(response.result.parameters.TimeBaseWorkouts != undefined){
    		textResponse.activity = response.result.parameters.TimeBaseWorkouts;
    		textResponse.duration = response.result.parameters.duration;
    	}
		textResponse.intent = response.result.action;
	});
 
	request.on('error', function(error) {
    	console.log(error);
	});
 
	request.end();
	setTimeout(function() {
		console.log(textResponse);
		res.json(textResponse);
		
	}, 1000);
    
});


app.listen(8023, function(){
  console.log('Listening on port 8023'); //Listening on port 8888
});