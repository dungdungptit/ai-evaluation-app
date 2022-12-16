import { base_URL, token } from "../utils/constants";
import axios from "axios";

export const getDataset = async (id) => {
    const response = await axios.get(`${base_URL}/api/v1/datas/${id}`, { headers: { token: token } });
    return response.data;
};

export const getDatasets = async () => {
    const response = await axios.get(`${base_URL}/api/v1/datas`, { headers: { token: token } });
    return response.data;
};

export const postDataset = async (data) => {
    console.log(Object.fromEntries(data));
    const response = await axios.post(`${base_URL}/api/v1/datas/add`, data, { headers: { token: token } });
    console.log(response);
    return response.data;
};

// deleteDataset
export const deleteDataset = async (id) => {
    const response = await axios.delete(`${base_URL}/api/v1/datas/delete/${id}`, { headers: { token: token } });
    return response.data;
}

export const postDatasetSample = async (data) => {
    console.log(Object.fromEntries(data));
    const response = await axios.post(`${base_URL}/api/v1/datas/samples/add`, data, { headers: { token: token } });
    console.log(response);
    return response.data;
};

export const deleteDatasetSample = async (sampleId) => {
    const response = await axios.delete(`${base_URL}/api/v1/datas/samples/delete/${sampleId}`, { headers: { token: token } });
    console.log(response);
    return response.data;
};