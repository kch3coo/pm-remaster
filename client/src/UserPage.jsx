import React, { Component } from "react";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import "bootstrap/dist/css/bootstrap.css";
import DisplayUserInfo from "./components/UserPage/DisplayUserInfo";
import DisplayProjects from "./components/UserPage/DisplayProjects";
import FooterNav from "./components/Navbar/FooterNav";
import { getUserInfo, getCurrentUser } from "./actions/user";
// import "./UserPage.css";

// import "../HomePage/home.css";
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { userName: "Frank Hua", bio: "我要当海贼王！" },
      projects: {
        manageProjectList: [],
        contributeProjectList: []
      }
    };
  }
  setUp(userId){
    let info = {}
    let projectList = {
      manageProjectList: [],
      contributeProjectList: []
    };
    getUserInfo(userId).then(response => {
      if (!response) {
        console.log("user does not exist!");
      } else {
        const data = response.data;
        info = {
          userName: data.name,
          bio: data.description
        };
        projectList.manageProjectList = data.manageProjects
        projectList.contributeProjectList= data.contributeProjects        
      }
    }).then(() => {
      this.setState({
        userInfo: info,
        projects: projectList
      });
      console.log(this.state)
    })

    this.setState({
      userInfo: info,
      projects: projectList
    });
  }
  componentDidMount() {
    getCurrentUser().then((user) => {
      console.log("user is: ......");
      console.log(user)
      this.setUp(user)
    })

  }

  render() {
    return (
      <div className="cotainer-fluid">
        <LoginNavbar />
        <DisplayUserInfo userInfo={this.state.userInfo} />
        <DisplayProjects projectList={this.state.projects} />
        <FooterNav />
      </div>
    );
  }
}
export default UserPage;
