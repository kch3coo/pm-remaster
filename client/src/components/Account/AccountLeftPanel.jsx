import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class LeftPanel extends Component {
  render() {
    return (
      <List-group className="d-inline-block">
        <button className="rounded-0 list-group-item list-group-item-action text-center active ">
          Profile
        </button>
        <button className="list-group-item list-group-item-action text-center disabled">
          Setting - Phase 2
        </button>
        <button className="list-group-item list-group-item-action list-group-item-danger text-center">
          <a href="/" className="text-danger d-block">
            Logout
          </a>
        </button>
      </List-group>
    );
  }
}

export default LeftPanel;
