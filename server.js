var apiai = require('apiai');
var express = require('express');
var app = express();
// API.AI Connector (Client Key, Sub Key)
var api = apiai("c66c588c23ab41e3be10446a89499020", "22e17226-e86d-4206-bb01-f1e87c99af5d");


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('/public'));


app.get('/',function(req,res){
	app.end();
});


app.post('/',function(req,res){

	var response = req.body;
	console.log(response);
	var request = api.textRequest(response);
	request.on('response', function(response) {
	  console.log(response);
	});
	 
	request.on('error', function(error) {
	  console.log(error);
	});
	 
	request.end();
	res.end();

});

app.listen(8023, function(){
  console.log('Listening on port 8023'); //Listening on port 8888
});