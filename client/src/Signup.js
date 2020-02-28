/*  Full Signup component */
// Everything here was previously in the App component.
import React from "react";
import "./assets/css/signup.css";
import Particles from "reactparticles.js";
import { signUp } from "./actions/user.js";

import LoginNavbar from "./components/Navbar/LoginNavbar";

class Signup extends React.Component {
  processSignup(e) {
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    signUp(data);
  }
  render() {
    return (
      <div>
        <header className="header-sticky header-light">
          <LoginNavbar />
        </header>

        <div className="container mt-5">
          <div className="col-md-6 mx-auto text-center">
            <h1 className="text-white">Sign up!</h1>
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
                      placeholder="Password"
                    />
                  </div>
                </form>
              </div>
              <div className="text-center ">
                <button
                  // type="submit"
                  className=" btn btn-block send-button tx-tfm"
                  onClick={e => this.processSignup(e)}
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
