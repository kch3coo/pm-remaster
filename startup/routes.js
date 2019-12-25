const auth = require("../routes/auth");
const user = require("../routes/user");
const project = require("../routes/project");
const team = require("../routes/team");
const task = require("../routes/task");
const admin = require("../routes/admin");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const sessionOptions = {
	secret: "pepehands",
	store: new MongoStore({
		// Reuse mongoose connection
		mongooseConnection: mongoose.connection,
		// Session would hold for 15 minutes
		// Each time an user interacts with the server,
		// its session expiration date is refreshed.
		ttl: 15 * 60
	}),
	// If the session was never modified,
	// do not enforce saving back to the session store
	resave: true,
	// If the session is unitialized (new buf not modified),
	// do not enforce saving back to the session store
	saveUninitialized: false,
	withCredentials: true
};

const sessionChecker = (req, res, next) => {
	if (!req.session.user) {
		res.status(400).send("User not logged in!");
	} else {
		next();
	}
};

const adminSessionChecker = (req, res, next) => {
	console.log("admin check: " + req.session.user);
	if (req.session.user === "5de7076147267a1a879b9b84") {
		// res.status(400).send("Session expired, Peepeepoopoo man wants you to LOGIN!");
		next();
	}
	res.status(400).send("Admin not logged in");
};

module.exports = function(app) {
	// Session management
	app.use(
		session({
			secret: "keyboard cat",
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 600000,
				secure: false // when deployed to heroku, set to true
			},
			rolling: true
		})
	);
	// Express middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	// Session checking
	app.use("/api", sessionChecker);
	// Routing
	app.use("/auth", auth);
	// app.use("/admin", adminSessionChecker);
	app.use("/admin/", admin);
	app.use("/api/user", user);
	app.use("/api/project", project);
	app.use("/api/team", team);
	app.use("/api/task", task);
};
