const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { Team, validate } = require("../models/Team");
const { Project, p_valid } = require("../models/Project");
const { User } = require("../models/User");
const { Task } = require("../models/Task");

router.get("/:id", (req, res) => {
  const teamId = req.params.id;
  // If invalid user id
  if (!ObjectId.isValid(teamId)) {
    console.log("Invalid Id", teamId);
    return res.status(404).send();
  }

  Team.findById(teamId)
    .then(team => {
      // No such team
      if (!team) {
        console.log("No such team");
        return res.status(404).send();
      } else {
        // let memberPromisesList = team.contributors.map((member) => {
        // 		return getTaskList(member.taskList);

        // })
        // console.log(memberPromisesList)
        iterateMembers(team.contributors).then(contributors => {
          console.log("reached promise all");
          // console.log(taskLists)
          let resultTeam = team;
          resultTeam.contributors = contributors;
          res.send(resultTeam);
        });
      }
    })
    .catch(err => res.status(500).send(err));
});

async function getTaskList(lis) {
  result = [];
  for (let i = 0; i < lis.length; i++) {
    await Task.findById(lis[i])
      .then(task => {
        // console.log(task);
        if (!task) {
          console.log("trying to find task");
        } else {
          result.push(task);
        }
      })
      .catch(err => {
        console.log("failed during finding task: ");
      });
  }
  console.log("result is");
  console.log(result);
  console.log("-----------------------------------");
  return result;
}

async function iterateMembers(memberLis) {
  // let result = memberLis.map((member) => {
  // 	await getTaskList(member.taskList).then((taskLis) =>{
  // 		member.taskList = taskLis;
  // 		return member
  // 	})
  try {
    let result = [];
    for (let i = 0; i < memberLis.length; i++) {
      const member = memberLis[i];
      await getTaskList(member.taskList)
        .then(taskLis => {
          member.taskList = taskLis;
          return member;
        })
        .then(m => {
          console.log("------------ found member ------");
          console.log(m);
          result.push(m);
        })
        .catch(e => console.log(e));
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

router.put("/", (req, res) => {
  // if (!req.body.name) {
  // 	return res.status(400).send("Missing team name");
  // }
  // const { error } = validate(req.body);
  // if (error) {
  // 	return res.status(400).send(error.details[0].message);
  // }
  let project_id = req.body.pid;
  let name = req.body.name;
  let contributors = req.body.contributors || [];

  console.log("creating team... on project: " + project_id);
  let team_id = 0;
  Project.findById(project_id)
    .then(proj => {
      if (!proj) {
        res.status(404);
      } else {
        console.log("found project");
        Team.create({ name: name, contributors: contributors, pid: project_id })
          .then(team => {
            if (!team) {
              res.status(500);
            } else {
              team_id = team._id;
              return team;
            }
          })
          .then(team => {
            console.log(team._id);
            proj.teamList.push(team._id);
            proj.save();
            res.send(proj);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("team has error");
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("failed when trying to save the target!");
    });
});

router.post("/:team_id/:member_id", (req, res) => {
  let teamId = req.params.team_id;
  let memberId = req.params.member_id;
  let TeamMemeber = {};
  User.findById(memberId)
    .then(user => {
      TeamMemeber = {
        userId: memberId,
        userName: user.name,
        taskList: []
      };
    })
    .then(() => {
      return Team.findOneAndUpdate(teamId, {
        $push: { contributors: TeamMemeber }
      });
    })
    .then(e => {
      // res.send(e)
      res.send(e);
    })
    .catch(e => {
      res.status(500).send("team update contributor failed!");
    });
});

router.patch("/:team_id/:user_id", async (req, res) => {
  console.log("patching...");
  let teamId = req.params.team_id;
  let userId = req.params.user_id || "";
  let taskList = req.body.taskList || [];
  let userName = req.body.name || "1";
  console.log("--------------------------------------------------------");
  console.log(userId);
  console.log(req.body);
  console.log("taskList is: ...");
  console.log(taskList);
  try {
	    let teamInstance = Team.findById(teamId);
		let user;
		try {
			user = await teamInstance.findOne({"contributors.userId": userId});
		}
		catch (e) {
			user = null;
		}
		if (!user) {
			await Team.updateOne({_id: teamId}, {$push: {
				contributors: {
					userId: userId,
					userName: userName,
					taskList: taskList
				}
			}});
		} else {
			console.log(user.userName + " is currently being assigned a task")
			let r = await Team.findOneAndUpdate(
				{ _id: teamId, "contributors.userId": userId },
				{
					$set: {
						"contributors.$.taskList": taskList
					}
				}
			);
		}

	  res.status(200).send(await Team.findById(teamId));
		
  } catch (e) {
    console.log(e);
    res.status(500).send("update failed!");
  }
});
module.exports = router;
