import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "../../utils/Drag";
import { Button } from "react-bootstrap";
import TaskPopupAction from "./CreateForms/TaskPopupAction";
import { createTask } from "../../actions/project";

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      teamName: this.props.currTeam,

      task: {}
    };
  }

  onCreateTask(newTask) {
    createTask(newTask).then(task => {
      newTask.id = task.data._id
      this.state.items.push(newTask);
      this.setState({
        team: newTask,
        items: this.state.items
      });
      console.log(task);
    });
  }

  handleTeamChange(team) {
    this.setState({
      teamName: team
    });
  }

  getTaskPayload(taskIndex, memberIndex) {
    return this.state.items[taskIndex];
  }

  render() {
    return (
      <div>
        <div className="mt-2">
          <TaskPopupAction createTask={this.onCreateTask.bind(this)} />
        </div>

        <div>
          {" "}
          <h2>{this.state.teamName}</h2>
        </div>

        <h4>Create New Task</h4>

        <div className="simple-page mt-2">
          <Container
            groupName={"taskTable"}
            getChildPayload={taskIndex => this.getTaskPayload(taskIndex)}
            onDrop={e => {
              console.log(e);
              this.setState({ items: applyDrag(this.state.items, e) });
            }}
          >
            {this.state.items.map(p => {
              return (
                <Draggable key={p.id}>
                  <Button
                    className="draggable-item"
                    variant="outline-info"
                    size="sm"
                  >
                    {p.name}
                  </Button>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </div>
    );
  }
}

export { Simple };
