

function BookmarkDAO(db) {
	"use strict";

	if (false === (this instanceof BookmarkDAO)) {
		console.log("Error: BookmarkDAO constructor called without 'new' opearation");
		return new BookmarkDAO();
	}

	var bookmarks = db.collection("bookmarks");

	this.getBookmarks = function(callback) {
		"use strict";
		// default order is date desc
		bookmarks.find().sort({'date':-1}).toArray(function(err, items) {
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


module.exports.BookmarkDAO = BookmarkDAO;

