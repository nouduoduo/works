
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.redirect('./');
});


// 定制404 页面
app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.send(' <span style="color:red">404 - Not Found</span>');
});

// 定制500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});