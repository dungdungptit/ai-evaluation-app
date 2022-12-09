import { base_URL } from "../utils/constants";
import axios from "axios";

export const register = async (user) => {
    const respone = await axios.post(`${base_URL}/api/v1/auth/register`, user);
    console.log(respone);
    return respone.data;
};

export const login = async (user) => {
    const respone = await axios.post(`${base_URL}/api/v1/auth/login`, user);
    return respone.data;
};
