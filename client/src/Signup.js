/*  Full Signup component */
// Everything here was previously in the App component.
import React from "react";
import "./assets/css/signup.css";
import Logo from "./assets/img/logo.png";
import Particles from "reactparticles.js";
import "bootstrap/dist/css/bootstrap.css";
import {signUp} from "./actions/user.js";

import LoginNavbar from "./components/Navbar/LoginNavbar";

class Signup extends React.Component {
  processSignup(e){
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    signUp(data);
  }
  render() {
    console.log("shit!");
    return (
      <div>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
        <Particles id="tile1" />
        <header className="header-sticky header-light">
          <LoginNavbar />
        </header>

        <div className="container">
          <div className="col-md-6 mx-auto text-center">
            <div className="header-title">
              <h2 className="wv-heading--subtitle">Sign up!</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mx-auto">
              <div className="myform form ">
                <form action="" method="post" name="login">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control my-input"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control my-input"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control my-input"
                      id="password"
                    />
                  </div>

                </form>
              </div>
            <div className="text-center ">
                  <button
                    // type="submit"
                    className=" btn btn-block send-button tx-tfm"
                    onClick={(e) => this.processSignup(e)}
                  >
                    Submit Button
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
