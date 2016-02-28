var apiai = require('apiai');
var app = require('express')();

// API.AI Connector (Client Key, Sub Key)
var api = apiai("c66c588c23ab41e3be10446a89499020", "22e17226-e86d-4206-bb01-f1e87c99af5d");
 
var request = api.textRequest('hello');

request.on('response', function(response) {
  console.log(response);
});
 
request.on('error', function(error) {
  console.log(error);
});
 
request.end();

app.listen(8023, function(){
  console.log('Listening on port 8023'); //Listening on port 8888
});