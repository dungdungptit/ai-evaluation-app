import { base_URL, token } from "../utils/constants";
import axios from "axios";

export const findServer = async (problemId) => {
    const response = await axios.post(`${base_URL}/api/v1/hub/find/`, problemId, { headers: { token: token } })
    return response.data;
}

export const handleEvaluate = async (data) => {
    console.log(data.username, data.problemId);
    const postData = data
    const response = await axios.post(`${base_URL}/api/v1/hub/evaluate`, JSON.stringify(postData),
    {
        headers:
        {
          token: token,
          'Content-Type': 'application/json'
        }
      })
    console.log(response)
    return response.data;
}