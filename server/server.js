var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/',index);





var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log('server up on port : ', port);
});