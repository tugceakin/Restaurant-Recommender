var express = require('express');

var app = express();

var port = 3000;


app.use(express.static('public'));
app.use(express.static('templates'));

app.set('view engine', 'html');


app.use('*', function (req, res) {
    res.render(__dirname + '/templates/index.html');

});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});