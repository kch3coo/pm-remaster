import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { createProject } from "../../actions/project";
import { Redirect } from "react-router-dom";

export default class CreateProjectForm extends Component {
  constructor(props) {
    super(props);
    // deleted manager, the manager will be whom created the project
    this.state = {
      teams: [],
      createProjet: false,
      path: "/user"
    };
  }

  addTeam(teamName) {
    this.state.teams.push(teamName);
    this.setState({ teams: this.state.teams });
  }

  deleteTeam(index) {
    this.state.teams.splice(index, 1);
    this.setState({ teams: this.state.teams });
  }

  handleCreateProject() {
    createProject({
      name: this.state.project_name,
      teamList: this.state.teams,
      description: this.state.description
    }).then(res => {
      console.log(res.data);
      this.setState({ createProjet: true, path: res.data});
      
    });
  }
  renderRedirect(){
    if (this.state.createProjet) {
      return <Redirect to={this.state.path} />;
    }
    
  }

  displayTeam() {
    return (
      <div className="container">
        {this.renderRedirect()}
        <ul className="list-group text-center mt-2">
          {this.state.teams.map((team, index) => {
            return (
              <Row className="show-grid" key={index}>
                <Col xs={8} md={10}>
                  <li className="list-group-item">{team}</li>
                </Col>
                <Col xs={4} md={2}>
                  <Button
                    className=""
                    variant="danger"
                    size="sm"
                    onClick={() => this.deleteTeam(index)}
                  >
                    Delete!
                  </Button>
                </Col>
              </Row>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="project-name"
            placeholder="Enter project name"
            name="projectName"
            onChange={e => this.setState({ project_name: e.target.value })}
          />

          <Container>
            <Row className="show-grid" id="managerForm">
              <Col xs={12} md={10}>
                <Form.Label className="" id="manager-group">
                  Create Teams
                </Form.Label>
                <Form.Control
                  id="team-input"
                  type="teamName"
                  placeholder="Enter team name"
                />
              </Col>
              <Col xs={6} md={2}>
                <Button
                  className="mt-2"
                  variant="outline-info"
                  size="sm"
                  onClick={() =>
                    this.addTeam(document.getElementById("team-input").value)
                  }
                >
                  Add More!
                </Button>
              </Col>
            </Row>
            {this.displayTeam()}
          </Container>

          <Container>
            <Row className="show-grid" id="managerForm">
              <Col xs={12} md={10}>
                <Form.Label className="" id="manager-group">
                  Project Description
                </Form.Label>
                <Form.Control
                  id="manager-input"
                  type="manager"
                  placeholder="Write the description of this project"
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </Col>
            </Row>
          </Container>
        </Form>
        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          onClick={() => this.handleCreateProject()}
        >
          Create!
        </Button>
      </div>
    );
  }
}
