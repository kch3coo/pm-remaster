const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { Task, validate } = require("../models/Task");

//get task by id
router.get("/:id", (req, res) => {
	const taskId = req.params.id;

	if (!ObjectId.isValid(taskId)) {
		console.log("Invalid id");
		return res.status(404).send();
	}

	Task.findById(taskId)
		.then((task) => {
			// No such task
			if (!task) {
				console.log("No such task");
				return res.status(404).send();
			} else {
				return res.send(task);
			}
		})
		.catch((err) => res.status(500).send());
});

router.put("/", (req, res) => {
	console.log("creating task!");

	if (!req.body.name) {
		return res.status(400).send("Missing task name");
	}
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	let name = req.body.name || "1";
	let desc = req.body.description || "";
	let progress = 0;
	Task.create({
		name: name,
		description: desc,
		progress: progress
	})
		.then((task) => {
			res.send(task);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("failed when trying to save the target!");
		});
});

router.patch("/updateProgress/:task_id", (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	let taskId = req.params.task_id;
	let progress = req.body.progress || 0;

	Task.findById(taskId).then((task) => {
		if(!task){
			console.log(taskId)
			res.status(404).send("cannot find task!");
		}else{
			task.progress = progress;
			task.save();
			return task
		}
	}).then((task) => {
			res.send(task);
		})
		.catch((e) => {
			res.status(500).send("update progress failed!");
		});
});

router.patch("/:task_id", (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	let taskId = req.params.task_id;
	let contributor = req.body.contributor || "";
	Task.findOneAndUpdate({ _id: taskId }, { $push: { contributors: contributor } })
		.then((e) => {
			res.status(200).send("successfully update the contributor!");
		})
		.catch((e) => {
			res.status(500).send("fail to add contributor!");
		});
});

module.exports = router;
