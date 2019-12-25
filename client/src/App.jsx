import React from "react";
import { Redirect } from "react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Login from "./Login";
import Signup from "./Signup";
import ProjectPage from "./ProjectPage";
import Account from "./Account";
import Admin from "./Admin";
import UserPage from "./UserPage";
import ContributeProjectPage from "../src/components/ContributeProjectPage/ContributeProjectPage";
class App extends React.Component {
  state = { currentUser: "" };

  handleUserChange = userName => {
    this.setState({
      ["currentUser"]: userName
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}>
              <Login handleUserChange={this.handleUserChange} />
            </Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/project/:id" component={ProjectPage}>
              {/*(this.state.currentUser === '') ? <Redirect to="/" /> : 
              ((this.state.currentUser === 'admin') ? <Redirect to="/admin" /> : <ProjectPage />)*/}
            </Route>
            <Route exact path="/account" component={Account}>
              {/*(this.state.currentUser === '') ? <Redirect to="/" /> : 
              ((this.state.currentUser === 'admin') ? <Redirect to="/admin" /> : <Account />)*/}
            </Route>
            <Route exact path="/user" component={UserPage}>
              {/*(this.state.currentUser === '') ? <Redirect to="/" /> : 
              ((this.state.currentUser !== 'admin') ? <Redirect to="/home" /> : <Admin />)*/}
            </Route>
            <Route exact path="/admin" component={Admin}>
              {/*(this.state.currentUser === '') ? <Redirect to="/" /> : 
              ((this.state.currentUser !== 'admin') ? <Redirect to="/home" /> : <Admin />)*/}
            </Route>
            <Route exact path="/cproject/:id" component={ContributeProjectPage}>
              {/*(this.state.currentUser === '') ? <Redirect to="/" /> : 
              ((this.state.currentUser !== 'admin') ? <Redirect to="/home" /> : <Admin />)*/}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
