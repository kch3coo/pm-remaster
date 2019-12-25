const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const User = mongoose.model(
	"User",
	new mongoose.Schema({
		name: { type: String, required: true, minlength: 1, maxlength: 20 },
		email: { type: String, unique: true, required: true, minlength: 1, maxlength: 255 },
		password: { type: String, required: true, minlength: 0, maxlength: 255 },
		profile_img: String,
		description: { type: String, default: "" },
		manageProjects: [String],
		contributeProjects: [String]
	})
);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20),
		email: Joi.string().required().min(1).max(255).email(),
		password: Joi.string().min(0).max(255).required(),
		profile_img: Joi.string(),
		description: Joi.string().allow(""),
		manageProjects: Joi.array().items(Joi.objectId()),
		contributeProjects: Joi.array().items(Joi.objectId())
	});
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
