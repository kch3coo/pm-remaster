import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { uid } from "react-uid";
import { adminGetUsers, deleteUsers } from "../../actions/admin";
class AllUsersTable extends Component {
	componentDidMount() {
		adminGetUsers().then((users) => {
			this.setState({ users: users.data });
		});
	}

	state = {
		users: []
	};

	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>User Id</th>
						<th>Email</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					{this.state.users.map((user) => (
						<tr key={uid(user)}>
							<td>{user._id}</td>
							<td>{user.email}</td>
							<td>{user.name}</td>
							<td>
								<button
									onClick={() => this.handleDelete(user._id)}
									type="button"
									className="btn-danger rounded">
									Bye
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
	handleDelete = (userId) => {
		console.log("delete", userId);
		// TODO: Phase 2 call backend server to update users
		deleteUsers(userId);
		const users = this.state.users.filter((user) => user._id !== userId);
		this.setState({ users });
	};
}

export default AllUsersTable;
