import React, { Component } from "react";
import PopupAction from "../CreateProject/PopupAction";
import { Card, Button, Row } from "react-bootstrap";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import "./DisplayProjects.css";

export default class DisplayProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: this.props.projectList
    };
    
  }
  initializeData(url) {
    console.log(url);
  }

  displayProjectCards(isManageProject) {
    //     //projectList:{
    //       manageProjectList: [
    //         {project_name: "UTOS", managers:["Flla", "Silla"], tasks: 9, desc: "a project dedicated to developer community in UOFT"},
    //         {project_name: "Linkus", managers:["Jin", "River"], tasks: 9, desc: "A project that allows students to find a assignment partner"}
    //     ],
    //     contributeProjectList: [
    //         {project_name: "UTOS", managers:["Flla", "Silla"], tasks: 9, desc: "a project dedicated to developer community in UOFT"},
    //         {project_name: "Linkus", managers:["Jin", "River"], tasks: 9, desc: "A project that allows students to find a assignment partner"}
    //     ]
    // }
    const projectlis = this.props.projectList;
    const lis = isManageProject
      ? projectlis.manageProjectList
      : projectlis.contributeProjectList;
    const link = isManageProject ? "/project" : "/cproject"
    console.log(projectlis.manageProjectList)
    return lis.map((project, index) => {
      return (
        <div key={index}>
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src="default_project_bg1.jpg" />
            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <a href={`${link}/${project._id}`}> <Button variant="primary">Go</Button> </a>
              
            </Card.Body>
          </Card>
        </div>
      );
    });
  }

  render() {
    const swiper_params = {
      slidesPerView: 3,
      // spaceBetween: 50,
      slidesPerGroup: 3,
      // slidesPerColumn: 2,
      // loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };
    return (
      <div>
        <div className="project-container contianer bg-white mt-2 p-5">
          <h4 className="project-section-text text-dark">
            <strong>Manage My Project</strong>
            <div className="float-right">
              <PopupAction />
            </div>
          </h4>

          <div className="swiper mt-4 text-dark">
            <Swiper {...swiper_params}>{this.displayProjectCards(true)}</Swiper>
            <Card.Footer className="text-muted">3 projects updated</Card.Footer>
          </div>
        </div>

        <div className="project-container contianer bg-white mt-2 p-5">
          <h4 className="project-section-text text-dark">
            <strong>Contribute to Project</strong>
          </h4>
          <div className="swiper mt-4 text-dark">
            <Swiper {...swiper_params}>
              {this.displayProjectCards(false)}
            </Swiper>
            <Card.Footer className="text-muted">3 tasks unfinished</Card.Footer>
          </div>
        </div>
      </div>
    );
  }
}
