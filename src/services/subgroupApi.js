import { base_URL, token } from "../utils/constants";
import axios from "axios";

// get all subgroups
export const getAllSubgroups = async () => {
    const response = await axios.get(`${base_URL}/api/v1/groups/subgroups`, { headers: { token } });
    return response.data;
}

// get subgroup by id
export const getSubgroupById = async (id) => {
    const response = await axios.get(`${base_URL}/api/v1/groups/subgroups/${id}`, { headers: { token } });
    return response.data;
}

// add new subgroup
export const addNewSubgroup = async (subgroup) => {
    const response = await axios.post(`${base_URL}/api/v1/groups/subgroups/add`, subgroup, { headers: { token } });
    return response.data;
}

// update subgroup
export const updateSubgroup = async (subgroup) => {
    const response = await axios.put(`${base_URL}/api/v1/groups/subgroups/edit/${subgroup.id}`, subgroup, { headers: { token } });
    return response.data;
}

// delete subgroup
export const deleteSubgroup = async (id) => {
    const response = await axios.delete(`${base_URL}/api/v1/groups/subgroups/delete/${id}`, { headers: { token } });
    return response.data;
}