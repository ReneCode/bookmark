

var BookmarkDAO = require('./db/BookmarkDAO').BookmarkDAO;


function ContentHandler(db) {
	"use strict";

	var dbBookmark = new BookmarkDAO(db);


	this.showRootPage = function(req, res, next) {
//		console.log("showRootPage " + req.username);

		if (req.username) {
//			console.log("welcome: can identify user:" + req.username);
			res.redirect('/bookmark');
		}
		else {
			res.render('root', {title:"Bookmark", description:"This is a bookmark manager."});
		}
	}

	this.addBookmark = function(req, res, next) {
		if (!req.username) { 
			res.redirect('/');
		}
		// that is a post-event - so get parameters with req.body
		var name = req.body.name;
		var url = req.body.url;
		dbBookmark.addBookmark(name, url, function(err, result ) {
			res.redirect('/bookmark');
		});
	}

	this.updateBookmark = function(req, res, next) {
		if (!req.username) {
			res.redirect('/');
		}
		var name = req.body.name;
		var url = req.body.url;
		var dbid = req.body.dbid;
		dbBookmark.updateBookmark(dbid, name, url, function(err, updated ) {
			res.send(updated);
		});
	}

	this.showBookmarkList = function(req, res, next) {
		if (!req.username) { 
			res.redirect('/');
		}

		dbBookmark.getBookmarks( function(err, results) {
			if (err) return next(err);

			res.render('bookmark', { title:'Bookmark', bookmarks:results });
		});

	}
}



module.exports = ContentHandler;

