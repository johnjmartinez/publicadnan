var express = require('express'); var app = express();

app.get('/', function(req, res) {
    res.send('Hello World, redux!');
});

// nice way to debug routes:
// http://forbeslindesay.github.io/express-route-tester/
app.get('/:id(.?123|[a-z]*456)', function(req, res) {
    console.log('req.params', JSON.stringify(req.params, null, 4));
    res.send('AAA');
});

app.get('/:id(\\d\\d\\d)', function(req, res) {
    console.log('req.params', JSON.stringify(req.params, null, 4));
    res.send('CCC');
});

app.get('/:id(\\d+)', function(req, res) {
    console.log('req.params', JSON.stringify(req.params, null, 4));
    res.send('BBB');
});


app.get('/:type(old|new)/:id', function(req, res) {
    console.log('type, id, req.params', req.params.type, req.params.id, JSON.stringify(req.query, null, 4));
    res.send('1: type, id, req.params' + req.params.type + req.params.id + JSON.stringify(req.params, null, 4));
});

app.get('/:type(old|NEWER)/:id', function(req, res) {
    console.log('type, id, req.params', req.params.type, req.params.id, JSON.stringify(req.query, null, 4));
    res.send('2: type, id, req.params' + req.params.type + req.params.id + JSON.stringify(req.params, null, 4));
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
