
/**
 * Module dependencies.
 */
/*
var express = require('express');
var app = express();	 // Web framework to handle routing requests
var cons = require('consolidate');	 // Templating library adapter for Express
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB


var routes = require('./routes'); // Routes for our application


var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/bookmark'; 

MongoClient.connect(mongoUri, function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');
});
*/

/*
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
*/


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
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());
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
console.log('MongoDb started.');

