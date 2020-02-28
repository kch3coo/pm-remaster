import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import profilePicture from "../../assets/img/profilepic.png";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import InstructionPage from "./InstructionPage";
import Particles from "react-particles-js";
import logo from "../../assets/img/lmj-logo.png";
import "./LoginNavbar.css";

import { logout } from "../../actions/user";

class LoginNavbar extends Component {
  state = {
    user: {
      profilePic: profilePicture
    }
  };
  render() {
    return (
      <div>
        <Navbar expand="lg navbar-dark bg-dark">
          <Navbar.Brand href="#home">PM-remaster</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="nav-item" href="/user">
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Sign in</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()} href="/">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <div className="ml-2">
            {" "}
            <InstructionPage />{" "}
          </div>
        </Navbar>
        {/* <div className="particle-frame" id="particle-canvas">
          <Particles
            params={{
              polygon: {
                enable: true,
                type: "inside",
                move: {
                  radius: 10
                },
                url: "path/to/svg.svg"
              }
            }}
          />
        </div> */}
      </div>
    );
  }

  // return ()
}

export default LoginNavbar;
