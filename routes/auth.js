const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { User, validate } = require("../models/User");

router.get("/currentUser", (req, res)=> {
	if (req.session.user) {
		console.log("current user is: " + req.session.user);
		res.status(200).send(req.session.user);
	}

	else {
		res.status(200).send("Invalid");
	}
});

router.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	console.log("testing sign up....");
	console.log(req.body.password);
	let user;
	try {
		if ((!name && !email) || !password) {
			// console.log("asdasadw")
			res.status(200).send("/");
		}
		user = await User.findOne({ email: email });
		if (user) return res.status(200).send("/");
		user = await User.findOne({ name: name });
		if (user) return res.status(200).send("/");
		user = new User({ name: name, email: email, password: password });
		user = await user.save();
		console.log(user);
		console.log("succeed!");
	} catch (e) {
		console.log("sign up failed!");
		res.status(200).send("/");
		return;
	}
	console.log(user);
	req.session.user = user._id;
	console.log(req.session);
	req.session.cookie.user = user._id;
	await req.session.save();
	return res.status(200).send("/user");
});

router.post("/login", async (req, res) => {
	// const { error } = validate(res.body);
	// if (error) {
	// 	console.log(error);
	// 	return res.redirect("/");
	// }
	const { name, email, password } = req.body;
	// First try login with email
	let user = await User.findOne({ email: email, password: password });
	// If login with email does not work, try with username
	if (!user) {
		user = await User.findOne({ name: name, password: password });
	}
	// If both email and username does not work, then invalid credential
	if (!user) return res.status(400).send("Invalid login credentials");
	req.session.user = user._id;
	if(req.session.user === "5de7076147267a1a879b9b84"){
		res.send("/admin");
		console.log("Admin login sucessful!");
	}else{
		res.send("/user");
	}
	
	console.log(req.session);
	console.log("login sucessful!");
});

router.get("/logout", (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.redirect("/");
		}
		console.log("logout!")
	});
});

router.get("/users/check-session", (req, res) => {
	console.log("check-session for :")
	console.log(req.session)
	if(req.session.user){
		res.send(req.session.user);
	}else{
		res.status(401).send();
	}
});
module.exports = router;
