import { base_URL } from "../utils/constants";
import axios from "axios";

export const register = async (user) => {
    return axios.post(`${base_URL}/api/v1/auth/register`, user).data;
};

export const login = async (user) => {
    return (await axios.post(`${base_URL}/api/v1/auth/login`, user)).data;
};
