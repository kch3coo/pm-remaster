import React, { Component } from "react";
import "./TypingEffect.css";
export default class TypingEffect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="type-effect-container">
        <h1>Welcome home,</h1>
        <h1>{this.props.userName}</h1>
      </div>
    );
  }
}
