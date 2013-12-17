

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB

var app = express();

var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/bookmark'; 

MongoClient.connect(mongoUri, function(err, db) {
    "use strict";
    if(err) throw err;

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
//	app.use(express.methodOverride());
//	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());
//	app.use(express.bodyParser());

    app.locals.moment = require('moment');

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	routes(app, db);	

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});
console.log('Connect to MongoDb');

