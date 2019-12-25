const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const TeamMemeber = new mongoose.Schema({
	userId: { type: String },
	userName: { type: String },
	taskList: []
});

const Team = mongoose.model(
	"Team",
	new mongoose.Schema({
		name: { type: String, required: true, minlength: 1, maxlength: 80 },
		contributors: { type: [TeamMemeber] },
		pid: String
	})
);
function validateTeam(team) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(80),
		contributors: Joi.array().items(Joi.objectId()),
		pid: Joi.objectId()
	});
	return schema.validate(team);
}
exports.Team = Team;
exports.validate = validateTeam;
