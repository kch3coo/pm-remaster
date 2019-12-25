import React from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.css";

import "../assets/css/login.css";
import Logo from "../assets/img/logo.png";

import { login, getCurrentUser } from "../actions/user";

/* The LoginForm Component */
class LoginForm extends React.Component {
  state = {
    account: "",
    password: "",
  };

  isEmail(email) {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;
    return re.test(email)
  };

  chooseLogin() {
    const notused = ""
    let data = {
      name: this.isEmail(this.state.account) ? "" : this.state.account,
      password: this.state.password,
      email: this.isEmail(this.state.account) ? this.state.account : ""}
      login(data).then((user) => {
        console.log(user)
        
      });
  };

  render() {
    /*getCurrentUser().then((user) => {
      if(user) {
      return (<Redirect to='/user' />)
    } else{console.log("not authorizedd");}
    });*/
    
    return (
      <div className="myLogin">
        <div id="login-holder" className="container">
          <div className="card">
            <article className="card-body">
              <a href="/signup" className="float-right btn btn-outline-primary">
                Sign up
              </a>
              <h4 className="card-title mb-4 mt-1">Sign in</h4>
       
                <div className="form-group">
                  <label>Your email or account name</label>
                  <input
                    name="userName"
                    className="form-control"
                    placeholder="Email or account name"
                    type="text"
                    onChange={e => { this.setState({account: e.target.value})}}
                  />
                </div>
                <div className="form-group">
                  <a className="float-right" href="/">
                    Forgot?
                  </a>
                  <label>Your password</label>
                  <input
                    name="userPassword"
                    className="form-control"
                    placeholder="******"
                    type="password"
                    onChange={e => { this.setState({password: e.target.value})}}
                  />
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      {" "}
                      <input type="checkbox" /> Save password{" "}
                    </label>
                  </div>
                </div>
           
              <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={ () => this.chooseLogin() }
                  >
                    {" "}
                    Login{" "}
                  </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
