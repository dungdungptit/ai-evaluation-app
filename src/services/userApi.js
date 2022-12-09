import { base_URL, token } from "../utils/constants";
import axios from "axios";

// get all users
export const getAllUsers = async () => {
    const respone = await axios.get(`${base_URL}/api/v1/users`, {headers: {token: token}});
    return respone.data;
}

// get user by id
export const getUserById = async (id) => {
    const respone = await axios.get(`${base_URL}/api/v1/users/${id}`, {headers: {token: token}});
    return respone.data;
}

// add new user
export const addNewUser = async (user) => {
    const respone = await axios.post(`${base_URL}/api/v1/users/add`, user, {headers: {token: token}});
    return respone.data;
}

// update user
export const updateUser = async (user) => {
    console.log(user);
    const respone = await axios.put(`${base_URL}/api/v1/users/edit/${user.id}`, user, {headers: {token: token}});
    return respone.data;
}

// delete user
export const deleteUser = async (id) => {
    const respone = await axios.delete(`${base_URL}/api/v1/users/delete/${id}`, {headers: {token: token}});
    return respone.data;
}

