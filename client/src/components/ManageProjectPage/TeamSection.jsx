import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utils/Drag";
import { Button, Row, Col, Card, Alert} from "react-bootstrap";

import InviteMember from "./CreateForms/InviteMember";
import { assignTaskToContributor, getTeam } from "../../actions/project";
export default class TeamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      currTeam: [],
      contributors: [],
      allTeam: this.props.teams,
      showAlert: false
    };
  }

  // componentWillMount(){
  //   const init_team = this.props.teams[0]
  //   this.setState({
  //     teamName: init_team.name,
  //     currTeam: init_team.contributors
  //   })
  // }

  handleTeamChange(team) {
    console.log(this.props.teams);
    const currTeam = this.props.teams.filter(t => t.name === team)[0];
    getTeam(currTeam._id).then(curr => {
      console.log(curr);
      const team = curr.data;
      this.setState({
        teamName: team.name,
        currTeam: team,
        showAlert: false,
        contributors: team.contributors
      });
    });
  }

  onTaskDrop(e, member, index) {
    const currTeam = this.state.currTeam;

    member.taskList = applyDrag(member.taskList, e);

    const data = {
      taskList: member.taskList,
      name: member.userName
    };
    this.state.contributors[index] = member;
    this.setState({ contributors: this.state.contributors });
  }

  getTaskPayload(taskIndex, memberIndex) {
    return this.state.contributors[memberIndex].taskList[taskIndex];
  }

  addMemberHandler(member) {
    //call data base
  }

  changeTaskMissions() {
    console.log("clicked");
    const contributors = this.state.contributors;
    console.log(contributors);
    let tasks = contributors.map(contributor => {
      return {
        taskList: contributor.taskList.map(task =>
          task.id || task._id || ""
        )
      };
    });
    console.log(tasks);
    const Promiselis = this.state.contributors.map((contributor, index) => {
      const data = {
        taskList: tasks[index].taskList,
        name: contributor.userName
      };
      console.log("---------data ready-------------");
      console.log(data);
      console.log(this.state.currTeam._id);
      console.log(contributor.userId);
      return assignTaskToContributor(
        this.state.currTeam._id,
        contributor.userId,
        data
      );
    });
    Promise.all(Promiselis).then(e => {
      console.log(e);
      this.setState({showAlert: true})
      let that = this;
      setTimeout(that.handleTeamChange(this.state.currTeam.name), 6000)
    }).catch((e) => console.log(e))
  }

  showAlert() {
    if(this.state.showAlert){
      return (
        <Alert color="white">
          <h4 className="alert-heading">Task modified!</h4>
        </Alert>
      );
    }
    
  }

  render() {
    return (
      <div style={{ minWidth: "700rpx" }}>
        
        <Container>
          <Card>
            <Card.Header>
              Team Section
              <div className="float-right">
              {this.showAlert()}
                <InviteMember
                  teamName={this.state.teamName}
                  teamSize={this.state.contributors.length}
                  addMember={this.addMemberHandler.bind(this)}
                />
              </div>
              
            </Card.Header>
            <Card.Body>
              <Card.Title>{this.state.teamName}</Card.Title>
              <Row>
                {this.state.contributors.map((member, index) => {
                  return (
                    <Col md={4} xs={6} className="p-2" key={member.userId}>
                      <Card style={{ width: "18rem", alignContent: "center" }}>
                        <Card.Header>
                          <h3>{member.userName}</h3>
                        </Card.Header>
                        <Card.Subtitle className="d-flex justify-content-center text-muted mt-2">
                          Current Tasks
                        </Card.Subtitle>

                        <Container
                          groupName={"taskTable"}
                          onDrop={e => this.onTaskDrop(e, member, index)}
                          getChildPayload={taskIndex =>
                            this.getTaskPayload(taskIndex, index)
                          }
                        >
                          {member.taskList.map(task => {
                            // console.log(task)
                            return (
                              <Draggable key={task._id} className="ml-2">
                                <Button className="draggable-item mt-2">
                                  {task.name}
                                </Button>
                              </Draggable>
                            );
                          })}
                        </Container>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Button variant="dark"className="float-right" onClick={() => this.changeTaskMissions()}>
                {" "}
                Submit Changes{" "}
              </Button>
            </Card.Body>
            
          </Card>
        </Container>
      </div>
    );
  }
}
