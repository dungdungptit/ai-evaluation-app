import { base_URL, token } from "../utils/constants";
import axios from "axios";
console.log(base_URL);

// get all problems
export const getAllProblems = async () => {
    const respone = await axios.get(`${base_URL}/api/v1/problems`, {headers: {token: token}});
    return respone.data;
};

// get all problems free
export const getAllProblemsFree = async () => {
    const respone = await axios.get(`${base_URL}/api/v1/problems/free`, {headers: {token: token}});
    return respone.data;
};

// get problem by id
export const getProblemById = async (id) => {
    const respone = await axios.get(`${base_URL}/api/v1/problems/${id}`, {headers: {token: token}});
    return respone.data;
}

// add new problem
export const addNewProblem = async (problem) => {
    const respone = await axios.post(`${base_URL}/api/v1/problems/add`, problem, {headers: {token: token}});
    return respone.data;
}

// update problem
export const updateProblem = async (problem) => {
    console.log(problem);
    const respone = await axios.put(`${base_URL}/api/v1/problems/edit/${problem.id}`, problem, {headers: {token: token}});
    return respone.data;
}

// delete problem
export const deleteProblem = async (id) => {
    const respone = await axios.delete(`${base_URL}/api/v1/problems/delete/${id}`, {headers: {token: token}});
    return respone.data;
}