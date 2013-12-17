

var BookmarkDAO = require('./db/BookmarkDAO').BookmarkDAO;


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


module.exports = ContentHandler;

