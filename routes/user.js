const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { User, validate } = require("../models/User.js");
const { Project } = require("../models/Project.js");
const _ = require("lodash");

router.get("/:id", async (req, res) => {
	const userId = req.session.user;
	// If invalid user id
	if (!ObjectId.isValid(userId)) {
		console.log("Invalid Id", userId);
		return res.status(404).send();
	}
	try {
		let user = await User.findById(userId);
		if (!user) return res.status(400).send("No such user");
		let userInfo = {
			name: user.name,
			description: user.description,
			manageProjects: [],
			contributeProjects: []
		}
		let manageLst = await getProjectList(user.manageProjects || []);
		userInfo.manageProjects = manageLst;
		let contributeLst = await getProjectList(user.contributeProjects || []);
		userInfo.contributeProjects = contributeLst;
		res.status(200).send(userInfo);
	} catch (e) {
		res.status(400).send({});
	}
});

async function getProjectList(lis) {

	result = [];
	for (let i = 0; i < lis.length; i++) {

		try{
			let proj = await Project.findById(lis[i]);
			proj.name = proj.name || "";
			result.push(proj);
		} catch (e) {

		}
	}
	return result;
}

module.exports = router;
