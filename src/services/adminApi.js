import { base_URL, token } from "../utils/constants";
import axios from "axios";

// get all admins
export const getAllAdmins = async () => {
    const respone = await axios.get(`${base_URL}/api/v1/admins`, { headers: { token: token } });
    return respone.data;
}

// get admin by id
export const getAdminById = async (id) => {
    const respone = await axios.get(`${base_URL}/api/v1/admins/${id}`, { headers: { token: token } });
    return respone.data;
}

// add new admin
export const addNewAdmin = async (admin) => {
    const respone = await axios.post(`${base_URL}/api/v1/admins/add`, admin, { headers: { token: token } });
    return respone.data;
}

// update admin
export const updateAdmin = async (admin) => {
    console.log(admin);
    const respone = await axios.put(`${base_URL}/api/v1/admins/edit/${admin.id}`, admin, { headers: { token: token } });
    return respone.data;
}

// delete admin
export const deleteAdmin = async (id) => {
    const respone = await axios.delete(`${base_URL}/api/v1/admins/delete/${id}`, { headers: { token: token } });
    return respone.data;
}