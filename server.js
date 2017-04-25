//Importing modules
var express = require('express');
//var mongoose = require('mongoose');

//Importing routes module
var indexRoutes = require('./app/routes/index');
var errorRoutes = require('./app/routes/error');

//Initialize app
var app = express();

//Hide "powered by express". This helps against attacks.
app.disable('x-powered-by');

//Set static files path
app.use(express.static(__dirname + '/static'));

//Set view directory
app.set('view engine', 'pug');
app.set('views', './app/views');

//Defining routes
app.use('/', indexRoutes);

app.use(errorRoutes);

//Start the server
app.listen(process.env.PORT || 8080);