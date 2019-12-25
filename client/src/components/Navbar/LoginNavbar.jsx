import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import profilePicture from '../../assets/img/profilepic.png';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import InstructionPage from "./InstructionPage";
import './LoginNavbar.css';

import { logout } from '../../actions/user';

class LoginNavbar extends Component {
  state = {
    user: {
      profilePic: profilePicture
    }
  };
  render() {
    return (
      <Navbar expand="lg navbar-dark bg-dark">
        <Navbar.Brand href="#home">我怎么那么帅</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-item" href="/user">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href='/'>Sign in</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
              <NavDropdown.Item onClick={ () => logout() }>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div className="ml-2"> <InstructionPage /> </div>
        
      </Navbar>
    );
  }



	// return ()
}

export default LoginNavbar;
