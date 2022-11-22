import { base_URL, token } from "../utils/constants";
import axios from "axios";


// get all groups
export const getAllGroups = async () => {
    const response = await axios.get(`${base_URL}/api/v1/groups`, { headers: { token } });
    return response.data;
}

// get group by id
export const getGroupById = async (id) => {
    const response = await axios.get(`${base_URL}/api/v1/groups/${id}`, { headers: { token } });
    return response.data;
}

// add new group
export const addNewGroup = async (group) => {
    const response = await axios.post(`${base_URL}/api/v1/groups/add`, group, { headers: { token } });
    return response.data;
}

// update group
export const updateGroup = async (group) => {
    const response = await axios.put(`${base_URL}/api/v1/groups/edit/${group.id}`, group, { headers: { token } });
    return response.data;
}

// delete group
export const deleteGroup = async (id) => {
    const response = await axios.delete(`${base_URL}/api/v1/groups/delete/${id}`, { headers: { token } });
    return response.data;
}