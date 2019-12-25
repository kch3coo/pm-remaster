import axios from 'axios';

const DEVELOPMENT = true;
const COMMON_END_POINT = DEVELOPMENT ? "/api" : "http://66.212.174.180:5000";
//(PUT)
export const createProject = async (data, url = `${COMMON_END_POINT}/project`) => {
    let r = await axios({
        method: 'put',
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    console.log("creating asdwdw");
    return r;
};
//(PUT)
export const createTeam = async (data, url = `${COMMON_END_POINT}/team/`) => {
    let r = await axios({
        method: 'put',
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

//(PUT)
export const createTask = async (data, url = `${COMMON_END_POINT}/task`) => {
    let r = await axios({
        method: 'put',
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

//get all your Project Status (GET)
export async function getProjectInfo(project_id) {
    console.log("getProjectInfo called with" + project_id)
    let url =  `${COMMON_END_POINT}/project/details/${project_id}`;
    let r = await axios({
        method: 'get',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};
//get all your task for a specific team (GET)
export const getTeam = async (team_id) => {
    let url =`${COMMON_END_POINT}/team/${team_id}`;
    let r = await axios({
        method: 'get',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

//add member to a team, and Modify this member's databse info such that his contributorProject List contains this project (POST)
export const addMember = async (team_id, member_id, data) => {
    let url = `${COMMON_END_POINT}/team/${team_id}/${member_id}`;
    let r = await axios({
        method: 'post',
        data: data,
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

//update this task's worker Info, and update Team's contributors -> worker -> taskList, append (POST)
export const addTaskContributor = async (task_id, data) => {
    let url = `${COMMON_END_POINT}/task/${task_id}`;
    let r = await axios({
        method: 'patch',
        data: data,
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

export const assignTaskToContributor = async (team_id, user_id, data) => {
    let url = `${COMMON_END_POINT}/team/${team_id}/${user_id}`;
    let r = await axios({
        method: 'patch',
        data: data,
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};
//update this task's worker Info, and update Team's contributors -> worker -> taskList, deletee (DELETEE)
export const deleteTaskContributor = async (task_id, data) => {
    let url = `${COMMON_END_POINT}/task/${task_id}`;
    let r = await axios({
        method: 'delete',
        data: data,
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};
//update this task's progress (PATCH)
export const updateTaskProgress = async (task_id, data) => {
    let url = `${COMMON_END_POINT}/task/updateProgress/${task_id}`;
    let r = await axios({
        method: 'patch',
        data: data,
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

export const getTaskInfo = async (task_id) => {
    let url = `${COMMON_END_POINT}/task/${task_id}`;
    let r = await axios({
        method: 'get',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
    return r;
};

// export const findTeam = async (project_id, user_id) => {
//     let url = `${COMMON_END_POINT}/team/${project_id}`;
//     let r = await axios({
//         method: 'get',
//         url: url,
//         data: {user_id},
//         headers: {
//             'content-type': 'application/json'
//         }
//     });
//     return r;
// };


export default { createProject, 
                createTeam, 
                createTask, 
                getProjectInfo,
                getTeam,
                addMember,
                addTaskContributor,
                deleteTaskContributor,
                updateTaskProgress
               }