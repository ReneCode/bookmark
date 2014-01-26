/*
SessionDAO
*/

var crypto = require('crypto');

var SessionDAO = function(db) {
	"use strict";

	var sessions = db.collection("sessions");

	this.startSession = function(username, callback) {
		"use strict";

		// generate Session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

		// now store that session
		sessions.insert({'_id':session_id, username:username}, function(err, inserted) {
			if (err) {
				callback(err, null)
			}
			else {
				callback(null, session_id);
			}
		})
	}

	this.endSession = function(session_id, callback) {
		"use strict"

		sessions.remove({"_id": session_id}, function(err, cntRemoved) {
			callback(err);
		});
	}

	this.getUsername = function(session_id, callback) {
		"use strict";

		sessions.findOne({"_id": session_id}, function(err, session) {
			if (err) {
				callback(err, null);
			}
			if (!session) {
				var error = new Error("Session: " + session_id + " does not exit", null); 
				callback(error, null);
			}
			else {
//				console.log("getUsername:" + session_id + " => " + session.username);
				callback(null, session.username);
			}
		});
	}
};


module.exports.SessionDAO = SessionDAO;

