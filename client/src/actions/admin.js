import axios from "axios";

const DEVELOPMENT = true;
const COMMON_END_POINT = DEVELOPMENT ? "/admin" : "http://66.212.174.180:5000";

export const adminGetUsers = async (url = `${COMMON_END_POINT}/users`) => {
	let r = await axios({
		method: "get",
		url: url,
		headers: {
			"content-type": "application/json"
		},
		withCredentials: true
	});
	return r;
};

export const deleteUsers = async (user_id) => {
	let r = await axios({
		method: "delete",
		url: `${COMMON_END_POINT}/${user_id}`,
		headers: {
			"content-type": "application/json"
		},
		withCredentials: true
	});
	return r;
};
