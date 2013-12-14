
/*
 * GET home page.
 */

var user = require('./user');

//var bookmarkDAO = require('../db/bookmark')


function BookmarkDAO(db) {
	"use strict";

	if (false === (this instanceof BookmarkDAO)) {
		console.log("Error: BookmarkDAO constructor called without 'new' opearation");
		return new BookmarkDAO();
	}

	var bookmarks = db.collection("bookmarks");

	this.getBookmarks = function(callback) {
		"use strict";

		bookmarks.find().sort('name').toArray(function(err, items) {
			if (err) return callback(err, null);

			callback(err, items);
		});
	}

	this.addBookmark = function(name, url, callback) {
		"use strict";

		var data = {
				name:name,
				url:url,
				date:new Date()
					};
		bookmarks.insert(data, callback);
	}
};

//----------------------------------
function ContentHandler(db) {
	"use strict";

	var dbBookmark = new BookmarkDAO(db);

	this.showMainPage = function(req, res, next) {
		res.redirect('/bookmark');
	}

	this.addBookmark = function(req, res, next) {
		var name = req.query.name;
		var url = req.query.url;
		console.log("adding Bookmark");
		dbBookmark.addBookmark(name, url, function(err, result ) {
			console.log("bm added:" + result);
			res.redirect('/bookmark');

		});
	}

	this.showBookmarkList = function(req, res, next) {
		dbBookmark.getBookmarks( function(err, results) {
			if (err) return next(err);

			res.render('bookmark', { title:'Bookmark', bookmarks:results });
		});

	}
}



// -------------------



function route(app, db) {

	var contentHandler = new ContentHandler(db)

	app.get('/', contentHandler.showMainPage);
	app.get('/bookmark', contentHandler.showBookmarkList);
	app.get('/bookmark/add', contentHandler.addBookmark);

}


module.exports = route;

