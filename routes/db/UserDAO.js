/*

	UserDAO

*/

var UserDAO = function(db) {
	"use strict";

	var users = db.collection("users");

	this.validateUser = function(username, password, callback) {
//		console.log("validateUser user:" + username + " / password:" + password);

		users.findOne({'_id':username, }, function(err, user) {
			"use strict";

			if (err)	
				callback(err, null);
			if (user) {
				// todo crype that !!
				if (user.password === password) {
					callback(null, user);
				}
				else {
					// invalid password
					var err = new Error("Invalid password");
					callback(err, null);
				}
			}
			else {
				var err = new Error("User: " + username + " does not exist");
				callback(err, null);
			}
		})
	}

	this.addUser = function(username, password, callback) {
//		console.log("addUser user:" + username + " / password:" + password);
		users.insert({'_id':username, password:password}, function(err, users) {
			if (err) {
				callback(err, null);
			}
			else {
				callback(null, users[0]);
			}
		});
	}
};

module.exports.UserDAO = UserDAO;
