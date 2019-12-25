import React, { Component } from "react";
import { uid } from "react-uid";

class Profile extends Component {
	state = {
		user: this.props.user
	};
	render() {
		return (
			<React.Fragment>
				<table className="table">
					<tbody>
						{Object.keys(this.state.user).map((key) => (
							<tr key={uid(key)}>
								{/* Capitalize first letter */}
								<th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
								{/* Hide password but display other data in profile */}
								<td>{key === "password" ? "******" : this.state.user[key]}</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default Profile;
