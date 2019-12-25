import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { tsImportEqualsDeclaration } from "@babel/types";

class ProfileForm extends Component {
	state = { user: this.props.getUser() };

	handleSubmit = (e) => {
		e.preventDefault();
		// TODO: In Phase 2 call backend server to update user profile in
		console.log("Submitted");
		this.props.backToProfile();
	};

	handleChange = (e) => {
		const user = { ...this.state.user };
		user[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ user });
		console.log(user);
		this.props.updateUser(user);
	};

	render() {
		const user = this.state.user;

		return (
			<form onSubmit={this.handleSubmit} className="mt-2 mr-2">
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Email</label>
					<div className="col-sm-10">
						<input
							onChange={this.handleChange}
							value={user.email}
							type="email"
							name="email"
							className="form-control"
							id="inputEmail"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Username</label>
					<div className="col-sm-10">
						<input
							onChange={this.handleChange}
							type="username"
							name="username"
							className="form-control"
							id="inputUsername"
							value={user.username}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-10">
						<input
							onChange={this.handleChange}
							type="password"
							name="password"
							className="form-control"
							id="inputPassword"
							value={user.password}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">password</label>
					<div className="col-sm-10">
						<input
							onChange={this.handleChange}
							type="password"
							name="password"
							className="form-control"
							id="inputpassword"
							value={user.password}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">About</label>
					<div className="col-sm-10">
						<input
							onChange={this.handleChange}
							type="about"
							name="about"
							className="form-control input-lg"
							id="inputAbout"
							value={user.about}
						/>
					</div>
				</div>

				<div className="form-group row-fluid">
					<div className="col p-0">
						<button type="submit" className="btn btn-primary btn-block">
							Update
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default ProfileForm;
