const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { Project, validate: projectValidate } = require("../models/project");
const { User, validate: userValidate } = require("../models/user");
const { Team } = require("../models/team");

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  // Invalid project id
  if (!ObjectId.isValid(projectId)) {
    console.log("Invalid Id", projectId);
    return res.status(404).send();
  }

  Project.findById(projectId)
    .then(project => {
      // No such project
      if (!project) {
        console.log("No such project");
        return res.status(404).send();
      } else {
        console.log(project);
        return res.send(project);
      }
    })
    .catch(err => res.status(500).send());
});

router.get("/details/:id", (req, res) => {
  const projectId = req.params.id;
  // Invalid project id
  if (!ObjectId.isValid(projectId)) {
    console.log("Invalid Id", projectId);
    return res.status(404).send();
  }

  Project.findById(projectId)
    .then(project => {
      // No such project
      if (!project) {
        console.log("No such project");
        return res.status(404).send();
      } else {
        let projectInfo = {
          name: project.name,
          description: project.description,
          teamList: []
        };
        getTeamList(project.teamList).then(lis => {
          projectInfo.teamList = lis;
          console.log(projectInfo);
          res.send(projectInfo);
        });
      }
    })
    .catch(err => res.status(500).send());
});

async function getTeamList(lis) {
  result = [];
  for (let i = 0; i < lis.length; i++) {
    await Team.findById(lis[i])
      .then(team => {
        console.log(lis[i]);
        if (!team) {
          console.log("trying to find team");
        } else {
          result.push(team);
        }
      })
      .catch(err => {
        console.log("failed during finding team");
      });
  }
  return result;
}

router.put("/", async (req, res) => {
  console.log("asdsadw");
  if (!req.body.name) {
    return res.status(400).send("Missing project name");
  }
  let userId = req.session.user;
  console.log("userId... " + userId);
  let teamList = req.body.teamList || [];
  let name = req.body.name || "Invalid";
  let description = req.body.description || "No description for this project";
  let proj_id = 0;
  let teamInstance = null;
  try {
	  let newProject = await Project.create({ name: name, teamList: teamList, description: description });
	  proj_id = newProject._id;
	  let user = await User.findById(userId);

	  if (!user) {
		  console.log("cannot find user!");
		  res.status(404).send("/user");
		  return;
	  }

	  console.log(user);
	  user.manageProjects.push(proj_id);
	  let r = await user.save();
	  console.log("-------------project created-----------------------");
	  let lis = [];
	  for (let i = 0; i < newProject.teamList.length; i++) {
		  let team = newProject.teamList[i];
		  const t = {
			  name: team,
			  pid: newProject._id,
			  contributors: []
		  }

		  let newT = await Team.create(t);
		  console.log("team created")
		  console.log(team)
		  lis.push(newT._id);
	  }

	  newProject.teamList = lis;

	  let result = await newProject.save();

	  if (result) {
		  res.status(200).send("/project/" + proj_id);
	  }
  }

  catch (e) {
	  console.log(e);
	  console.log("roll back!");
	  res.status(500).send("/user");
  }

//   Project.create({ name: name, teamList: teamList, description: description })
//     .then(proj => {
//       console.log("project is...");
//       proj_id = proj._id;
//       console.log("project>....");
//       console.log(proj);
//       User.findById(userId)
//         .then(user => {
//           if (!user) {
//             console.log("cannot find user!");
//             res.status(404).send("cannot find user!");
//           } else {
//             console.log(user);
//             user.manageProjects.push(proj_id);
// 			user.save();
//           }
//         })
//         .then(() => {
//           console.log("-------------project created-----------------------");
//           console.log(proj);
//           let lis = proj.teamList.map(team => {
//             const t = {
//               name: team,
//               pid: proj._id,
//               contributors: []
//             };
//             return Team.create(t).then((team) => {
// 				console.log("team created")
// 				console.log(team)
// 				return team._id
// 			});
//           });
//           return Promise.all(lis)
//         }).then((promisList) => {
// 			console.log("Promise finished")
// 			console.log(promisList)
// 			proj.teamList = promisList;
// 			proj.save();
// 		})
//     })
//     .then(e => {
//       console.log("jump!");
//       res.status(200).send("/project/" + proj_id);
//     })
//     .catch(err => {
//       console.log(err);
//       console.log("roll back!");
//       res.status(500).send("/user");
//     });
});
module.exports = router;
