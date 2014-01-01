var UserDAOModule = require('./db/UserDAO');
var SessionDAOModule = require('./db/SessionDAO');


function SessionHandler(db) {
	"use strict";

	var dbUser = new UserDAOModule.UserDAO(db);
	var dbSession = new SessionDAOModule.SessionDAO(db);


	this.isLoggedInMiddleware = function(req, res, next) {
		// read from cookie
		var session_id = req.cookies.session;	
//		console.log("isLoggedInMiddleware start " + req.username + " session:" + session_id);	
		dbSession.getUsername(session_id, function(err, username) {
			"use strict";
			console.log("isLoggedInMiddleware checked " + err);	
			if (!err  && username) {
				console.log("** isLoggedInMiddleware ok");
				req.username = username;
			}
			return next();
		});
//		console.log("isLoggedInMiddleware end " + req.username);	

	}

	this.showLoginPage = function(req, res, next) {
		"use strict";

		return res.render('login', {username:"", password:"", error:""});
	}

	this.handleLogin = function(req, res, next) {
		"use strict";

		var username = req.body.username;
		var password = req.body.password;

//		console.log("try to login with username:" + username + " password:" + password);

		dbUser.validateUser(username, password, function(err, user) {
			if (err) {
				return res.render('login', {username:username, password:"", error:err});
			}
			else {
				dbSession.startSession(user["_id"], function(err, session_id) {
					console.log("startSession ok");
					"use strict";
					if (err)
						return next(err);

					// set cookie
					res.cookie('session', session_id);
					console.log("redirect to welcome");
					return res.redirect('/welcome');
				});
			}
		});
	}


	this.showLogoutPage = function(req, res, next) {
		"use strict";

		var session_id = req.cookies.session;
		dbSession.endSession(session_id, function(err) {
			// clear cookie
			res.cookie('session', '');
			return res.redirect('/');
		})
	}


	this.showSignupPage = function(req, res, next) {
		"use strict";

		return res.render('signup', {username:"", password:"", error:""});
	}

	this.handleSignup = function(req, res, next) {
		"use strict";

		var username = req.body.username;
		var password = req.body.password;
		var confirm_password = req.body.confirm_password;

		// todo validate user/password
		dbUser.addUser(username, password, function(err, user) {
			if (err) {
				// show page once more to correct the error
				return res.render('signup', {username:username, password:password, error:err});
			}
			else {
				dbSession.startSession(user["_id"], function(err, session_id) {
					"use strict";
					if (err)
						return next(err);

					res.cookie('session', session_id);
					return res.redirect('/welcome');
				});
			}
		});
	}

	this.showWelcomePage = function(req, res, next) {
		"use strict";

		if (!req.username) {
			console.log("welcome: can't identify user. redirect to signup");
			return res.redirect('/signup');
		}

		res.redirect('bookmark');
//		return res.render('welcome', {username: req.username});
	}
}


module.exports = SessionHandler;

