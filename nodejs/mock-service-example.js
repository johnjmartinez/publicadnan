var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>Poor man\'s HTML.');
});

app.get('/api/ping', function(req, res) {
    res.json({
        code: 200,
        msg: "Pong"
    });
});

app.get('/api/mock', function(req, res) {
    res.json({
        code: 200,
        result: [{
            name: "Andy",
            age: 12
        }, {
            name: "Bob",
            age: 14
        }, {
            name: "Charlie",
            age: 16
        }, ]
    });
});

// note that we need the ./ for path to work, also file suffix must be .json (not .js)
var jsonFromFile = require('./sample.json');
var aService = function(req, res) {
    res.json(jsonFromFile);
};

app.get('/api/mockServeFromFile', aService);
app.post('/api/mockServeFromFile', aService);

// listen for GET requests of the form api/place/1234, api/place/87432. 
// 1234, 87432 are encoded as Id
app.get('/api/place/:anId(\\d+)', function(req, res) {
    res.json({
        msg: "Your route id was " + req.params.anId
    });
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
