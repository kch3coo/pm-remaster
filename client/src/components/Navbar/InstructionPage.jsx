// var Button = ReactBootstrap.Button;
// var Modal = ReactBootstrap.Modal;

import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {FaQuestion} from 'react-icons/fa'

export default class InstructionPage extends Component {
  constructor (props) {
    super();

    this.state = {
      showModal: false
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
  }

  render() {
    return (
      <div >
        <Button variant="primary float-right" size="sm" onClick={() => this.open()}>
          <FaQuestion/>
        </Button>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Instruction to our Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
  Hi! Welcome to our Project Management Website!
We include features that can help you optimize your group work! 
You can simply start by creating a project, or go through all the example projects.
If you have been invited to a project, it will appear on the Contribute to Project Section.
Remember to complete team tasks as a member of the Contributor! If you want to start your own project, start by clicking the main button on the right-hand side. You can fill in all the data and descriptions of your project. Remember to add teams to your project. To manage your project, you can simply click on any one of them on the Manage My Project Section. You can also create your team or assign tasks to members over there. We currently do not support the feature of searching and adding a member to your team, but more features are on the way!

              <br/> <br/> <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
