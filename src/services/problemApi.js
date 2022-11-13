import { base_URL } from "../utils/constants";
import axios from "axios";

export const getAllProblems = async (token) => {
    return axios.get(`${base_URL}/api/v1/problems`, token);
};