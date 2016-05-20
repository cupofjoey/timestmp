var express = require('express');
var bodyParser = require('body-parser');
var chrono = require('chrono-node')
var app = express();




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

app.get('/:time', function (req, res) {
	var resObject = {
		"natural" : null,
		"unix" : null
	};
	var time = req.params.time;
	var parsedTime = chrono.parse(time);
	resObject.unix = new Date(time).getTime() / 1000;
 	//res.json(parsedTime);
 	res.json(resObject);
});

app.get('/', function (req, res) {
	var name = req.query.name;
 	res.send("Hello " + name);
});

app.post('/', function (req, res){
	console.log(req.body);
	res.send(req.body);
});

app.listen(process.env.PORT || 5000);