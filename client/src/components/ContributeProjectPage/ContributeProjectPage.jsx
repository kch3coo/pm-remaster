import React, { Component } from "react";
import { Table } from "react-bootstrap";
import TaskPopupAction from "./TaskPopupAction";
import "./ContributeProject.css";
import LoginNavbar from "../Navbar/LoginNavbar";
import data from "./data.json";
import { getTeam, getProjectInfo } from "../../actions/project";
import { getCurrentUser } from "../../actions/user";

export default class ContributeProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props.match.params.id,
      projectName: "Utos",
      teamName: "Fantastic Frontend team",
      tasks: []
    };
  }

  componentWillMount() {
    getCurrentUser().then(userId => {
      getProjectInfo(this.state.project_id)
        .then(proj => {
          const data = proj.data;
          return data;
        })
        .then(data => {
          console.log("shit:... ");
          console.log(userId.data);
          //now we got data, we have to find the team that this user is in
          let teamList = data.teamList.filter(team =>
            team.contributors
              .map(contributor => {
                if (!contributor) return "";
                console.log("contributor....");
                console.log(contributor)
                return contributor.userId
              })
              .includes(userId.data)
          );
          console.log(teamList[0])
          getTeam(teamList[0] ? teamList[0]._id : [] ).then((t) => {
            const team = t.data;
            console.log(team);
            
            const taskList = [];
            for (let i = 0; i < team.contributors.length; i++) {
              taskList.push(team.contributors[i]);
            }
            console.log("taskList:...")
            console.log(taskList);
            this.setState({
              projectName: data.name,
              teamName: team.name,
              tasks: taskList
            });
            console.log(taskList)
          })
        });
    }).catch(e => console.log(e))
  }
  render() {
    return (
      <div>
        <LoginNavbar />
        <div className="p-5">
          <div className="info">
            <div className="date">
              <p id="day">
                <span id="today">{this.state.projectName}: </span>
                <span id="daymonth"> {this.state.teamName}</span>
              </p>
              <p id="month">Total task: {this.state.tasks.length} </p>
            </div>
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Completetion</th>
                <th>Task</th>
                <th>Assigned to </th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((contribtor, index) => {
                console.log("this task is: ")
                console.log(contribtor);
                console.log(contribtor.taskList);
                return contribtor.taskList.map((task, index)=> {
                  return (
                    <tr key={index}>
                      <td>{task.progress}/6</td>
                      <td>{task.description}</td>
                      <td>{contribtor.userName} </td>
                      <td>
                        <TaskPopupAction completed={task.progess} task={task} />
                      </td>
                    </tr>
                  );
                })
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
