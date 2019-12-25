const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { User } = require("../models/User");

router.get("/users", (req, res) => {
	console.log("getting all users");
	User.find().then((result) => res.send(result));
});

router.delete("/:user_id", (req, res) => {
	User.findById(req.params.user_id)
		.then((user) => {
			if (!user) {
				res.status(404).send("Unable to find user");
			} else {
				user.remove().then((e) => {
					console.log("deleted user");
					res.send(e);
					return e;
				});
			}
		})
		.catch((e) => console.log(e));
});

module.exports = router;
