import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import LoginForm from "./components/LoginForm";
import { Helmet } from "react-helmet";
import profilePicture from "./assets/img/profilepic.png";
import Particles from "reactparticles.js";

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
          <Particles id="tile1" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <LoginNavbar />
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
