import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import { Helmet } from "react-helmet";
import LeftPanel from "./components/Admin/AdminLeftPanel";
import UsersTable from "./components/Admin/UsersTable";
class Admin extends Component {
	state = {};

	render() {
		return (
			<div>
				<Helmet>
					<title>Account Page</title>
					<meta name="Admin Page" content="Nested component" />
					<style>{"body { background-color: white; }"}</style>
				</Helmet>
				<div className="container-fluid p-0">
					<container className="row-fluid">
						<LoginNavbar />
					</container>
					<container className="row">
						<container className="col-2 mw-100">
							<LeftPanel handleClick={(tabname) => this.handleClick(tabname)} />
						</container>
						<container className="col">{this.getTable()}</container>
					</container>
				</div>
			</div>
		);
	}

	getTable = () => <UsersTable />;

	handleLogout = () => {};

	handleClick = (tabname) => {
		if (tabname === "users") {
		} else {
			this.handleLogout();
		}
	};
}

export default Admin;
