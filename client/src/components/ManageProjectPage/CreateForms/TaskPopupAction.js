// var Button = ReactBootstrap.Button;
// var Modal = ReactBootstrap.Modal;

import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import { Form, Button, FormControl} from "react-bootstrap";
import {FaPlusSquare} from 'react-icons/fa'

export default class TaskPopupAction extends Component {
  constructor (props) {
    super();

    this.state = {
      showModal: false,
      newTaskCreated: false
    };
  }
 
  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  onCreateTask() {
    // this.setState({newTaskCreated: true})
    this.close();
    const newTask = {
      name: this.taskName.value,
      description: this.taskDetails.value,
      progress: 0
    }

    this.props.createTask(newTask);
  }

  render() {
    return (
      <div >
        <Button variant="primary float-right" size="sm" onClick={() => this.open()}>
          <FaPlusSquare/>
        </Button>

        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* the form itself is below */}
            <Form>
              <Form.Label>Task Name</Form.Label>
              <FormControl placeholder="Enter task name" ref={(ref) => { this.taskName = ref; }}/>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Task details</Form.Label>
                <FormControl as="textarea" rows="3"  ref={(ref) => { this.taskDetails = ref; }}/>
              </Form.Group>

              <Button
                className="mt-3"
                variant="primary"
                // type="submit"
                onClick={() => this.onCreateTask()}
              >
                Create!
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
