import React, { Component } from "react";
import "./DisplayUserInfo.css";
import TypingEffect from "../TypingEffect/TypingEffect";
export default class DisplayUserInfo extends Component {
  render() {
    return (
      <div> 
        <TypingEffect userName={this.props.userInfo.userName} />
        <div className="content">
        <div className="athlete-card">
          <div className="firstinfo">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/mrvanz/128.jpg" />
            <div className="profileinfo">
            <h2 className="user-name-text">{this.props.userInfo.userName}</h2>
              <p className="bio">{this.props.userInfo.bio}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    );
  }
}
