import React from "react";
import "./assets/css/projectPage.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import { Button, Container, Row, Col } from "react-bootstrap";
import ProjectSection from "./components/ManageProjectPage/ProjectSection";
import Particles from "reactparticles.js";
import "./components/ManageProjectPage/css/projectPage.css";
import {getProjectInfo} from "./actions/project";
class ProjectPage extends React.Component {
  state = {
    projectName: "CSC309 PHASE 1"
  };

  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props.match.params.id,
      projectName: "",
      teamList: [],
      description: ""
    };
    window.dispatchEvent(new Event("resize"))

  }

  componentDidMount() {
    getProjectInfo(this.state.project_id).then(response => {
      if (!response) {
        console.log("project does not exist!");
      } else {
        const data = response.data;
        console.log(data)
        this.setState({
          projectName: data.name,
          teamList: data.teamList,
          description: data.description
        })
      }
    })

  }

  render() {
    return (
      <div className="mission-panel">
        <Particles id="tile1" />
        <LoginNavbar />

        <h1 className="mt-3 ml-3 text-white">{this.state.projectName}</h1>
        <Container>
          <ProjectSection project_id={this.state.project_id}/>
        </Container>
      </div>
    );
  }
}

export default ProjectPage;
