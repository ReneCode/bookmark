
/*
 * GET home page.
 */

//var user = require('./user');
var ContentHandler = require('./ContentHandler');
var SessionHandler = require('./SessionHandler');

function route(app, db) {

	var contentHandler = new ContentHandler(db);
	var sessionHandler = new SessionHandler(db);

	// check if user is logged in (use cookie)
	app.use(sessionHandler.isLoggedInMiddleware);

	app.get('/', contentHandler.showRootPage);


	app.get('/login', sessionHandler.showLoginPage);
	app.post('/login', sessionHandler.handleLogin);

	app.get('/logout', sessionHandler.showLogoutPage);

	app.get('/signup', sessionHandler.showSignupPage);
	app.post('/signup', sessionHandler.handleSignup);

	app.get('/welcome', sessionHandler.showWelcomePage);

	app.get('/bookmark', contentHandler.showBookmarkList);
	app.get('/bookmark/add', contentHandler.addBookmark);

}


module.exports = route;

