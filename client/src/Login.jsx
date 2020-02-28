import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import LoginForm from "./components/LoginForm";
import { Helmet } from "react-helmet";
import profilePicture from "./assets/img/profilepic.png";
import Particles from "react-particles-js";

import logo from "../src/assets/img/lmj-logo.png";
class Login extends React.Component {
  render() {
    console.log("signing up!");
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta name="Login Page" />
        </Helmet>
        <div>
          <LoginNavbar />

          <div className="mt-5">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
