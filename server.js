var express = require('express');
var bodyParser = require('body-parser');
var chrono = require('chrono-node')
var app = express();


var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

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
	var timeInt = parseInt(time, 10);
	if(timeInt && typeof timeInt == 'number'){
		var naturalDate = new Date(timeInt*1000);
		var day = naturalDate.getUTCDate();
		var month = naturalDate.getUTCMonth();
		var year = naturalDate.getUTCFullYear();
		resObject.natural = monthNames[month] + " " + day + " " + year;
		resObject.unix = timeInt;
	}

	var parsedTime = chrono.parse(time)[0];
	console.log(parsedTime);
	if(parsedTime){
		var day = parsedTime.start.knownValues.day;
		var month = monthNames[parsedTime.start.knownValues.month - 1];
		var year = parsedTime.start.knownValues.year;
		resObject.unix = new Date(time).getTime() / 1000;
 		//res.json(parsedTime);
 		resObject.natural = month + " " + day + " " + year;
	}
	
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