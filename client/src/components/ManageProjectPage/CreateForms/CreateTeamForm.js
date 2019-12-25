// var Button = ReactBootstrap.Button;
// var Modal = ReactBootstrap.Modal;

import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import { Form, Button, FormControl, Row, Col} from "react-bootstrap";
import {FaPlusSquare} from 'react-icons/fa'

export default class CreateTeamForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showModal: false,
      newTeamCreated: false,
      teamMember: [
        {name: "Simpson",
        id: 1992893}
      ],
      teamName: "",
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

  onCreateTeam(teamName) {
    this.close();
    const newTeam = {
      name: teamName,
      contributors: this.state.teamMember
    }
    this.props.createTeam(newTeam);
  }

  addMember(member) {
    //create a unike key for each new fruit item
    var timestamp = (new Date()).getTime();
    const newMember = {
      userName: member,
      userId: timestamp,
      taskList: []
    }
    
    // update the state object
    this.state.teamMember.push(newMember)
    // set the state
    this.setState({ teamMember : this.state.teamMember });
   };

deleteMember(index) {
    this.state.teamMember.pop(index)
    this.setState({teamMember : this.state.teamMember});
    
}
  render() {
    return (
      <div >
        <Button variant="primary float-right" size="sm" onClick={() => this.open()}>
          <FaPlusSquare/>
        </Button>

        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* the form itself is below */}
            <Form>
              <Form.Label>Team Name</Form.Label>
              <FormControl placeholder="Enter team" id="teamName-input"/>
              <Row className="mt-2"> 
                <Col> 
                <FormControl placeholder="Invite any member to your team!" id="member-input"/>
                </Col>
                <Col> 
                <Button className="mt-2" variant="outline-info" onClick={() => this.addMember(document.getElementById("member-input").value)}>
                          Add More!
                      </Button>
                </Col>
              
              </Row>
              <div className="container">
              
              
              <ul className="list-group text-center mt-2">
              {
                  Object.keys(this.state.teamMember).map( (member, index) => {
                    return (<Row className="show-grid" key={member.id}>
                                <Col xs={12} md={10}>
                                <li className="list-group-item">{this.state.teamMember[index].userName}</li>
                                </Col>
                                <Col xs={6} md={2}>
                                    <Button className="" variant="danger" size="sm" onClick={()=> this.deleteMember(index)}>
                                        Delete!
                                    </Button>
                                </Col>
                            </Row>
                        )
                  })
                }
                
              </ul>
             </div>


              <Button
                className="mt-3"
                variant="primary"
                // type="submit"
                onClick={() => this.onCreateTeam(document.getElementById("teamName-input").value)}
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
