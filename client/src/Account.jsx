import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import LeftPanel from "./components/Account/AccountLeftPanel";
import { Helmet } from "react-helmet";
import Profile from "./components/Account/AccountProfile";
import ProfileForm from "./components/Account/ProfileForm";
class Account extends Component {
  state = {
    editProfile: false,
    user: {
      email: "",
      username: "",
      password: "",
      phone: "",
      about: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.`
    }
  };

  getUser = () => {
    return this.state.user;
  };
  getProfile = () => {
    if (this.state.editProfile) {
      return (
        <ProfileForm
          user={this.state.user}
          getUser={this.getUser}
          updateUser={this.handleUserUpdate}
          backToProfile={this.backToProfile}
        />
      );
    }
    return <Profile user={this.state.user} />;
  };

  backToProfile = () => {
    this.setState({
      editProfile: false
    });
  };

  getEditButton = () => {
    if (this.state.editProfile) {
      return;
    }
    return (
      <button
        onClick={this.onEditProfile}
        className="btn btn-primary btn-block"
      >
        Edit
      </button>
    );
  };

  onEditProfile = () => {
    this.setState({ editProfile: true });
  };

  handleUserUpdate = updatedUser => {
    console.log(updatedUser);
    // TODO: Phase 2 call backend server to update user
    this.setState({
      user: updatedUser
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Account Page</title>
          <meta name="User Account Page" content="Nested component" />
          <style>{"body { background-color: white; }"}</style>
        </Helmet>
        <div className="container-fluid p-0">
          <div className=" container-row row-fluid">
            <LoginNavbar />
          </div>
          <div className="container-row row">
            <div className="col-2 mw-100">
              <LeftPanel />
            </div>
            <div className="col">
              {this.getProfile()}
              {this.getEditButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Account;
