const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const Task = mongoose.model(
	"Task",
	new mongoose.Schema({
		name: { type: String, required: true, minlength: 1, maxlength: 80 },
		description: { type: String, default: "", maxlength: 200 },
		progress: { type: Number, default: 0, min: 0, max: 100 }
	})
);

function validateTask(task) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(80),
		description: Joi.string().allow("").max(200),
		progress: Joi.number().min(0).max(100)
	});
	return schema.validate(task);
}
exports.Task = Task;
exports.validate = validateTask;
