import { base_URL, token } from "../utils/constants";
import axios from "axios";

// get all submissions
export const getAllSubmissions = async () => {
    const response = await axios.get(`${base_URL}/api/v1/submissions`, { headers: { token } });
    return response.data;
}

// get submission by id
export const getSubmissionById = async (id) => {
    const response = await axios.get(`${base_URL}/api/v1/submissions/${id}`, { headers: { token } });
    return response.data;
}

// get submission by user id
export const getSubmissionByUserId = async (id) => {
    const response = await axios.get(`${base_URL}/api/v1/submissions/users/${id}`, { headers: { token }});
    return response.data;
};

// get submission by 

// add new submission
export const addNewSubmission = async (submission) => {
    const response = await axios.post(`${base_URL}/api/v1/submissions/add`, submission, { headers: { token } });
    return response.data;
}

// update submission
export const updateSubmission = async (submission) => {
    const response = await axios.put(`${base_URL}/api/v1/submissions/edit/${submission.id}`, submission, { headers: { token } });
    return response.data;
}

// delete submission
export const deleteSubmission = async (id) => {
    const response = await axios.delete(`${base_URL}/api/v1/submissions/delete/${id}`, { headers: { token } });
    return response.data;
}

// get submission by problem id and user id
export const getSubmissionByProblemIdAndUserId = async (data) => {
    const problemId = data.problemId;
    const userId = data.userId;
    const response = await axios.get(`${base_URL}/api/v1/submissions/problems/${problemId}/users/${userId}`, { headers: { token } });
    return response.data;
}