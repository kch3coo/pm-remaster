import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class LeftPanel extends Component {
	state = {
		showUsers: true
	};
	render() {
		return (
			<List-group className="d-inline-block">
				<button onClick={this.handleUsersTab} className={this.getUserTabClassName()}>
					Users
				</button>
				<button className="btn btn-danger list-group-item list-group-item-action list-group-item-danger text-center ">
					<a href="/" className="d-block text-danger">
						Logout
					</a>
				</button>
			</List-group>
		);
	}

	getUserTabClassName() {
		let className = "rounded-0 text-center list-group-item list-group-item-action ";
		if (this.state.showUsers) {
			className += "active";
		}
		return className;
	}

	handleUsersTab = () => {
		this.setState({
			showUsers: true
		});
		this.props.handleClick("users");
	};
}

export default LeftPanel;
