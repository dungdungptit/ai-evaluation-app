import { base_URL, token } from "../utils/constants";
import axios from "axios";

export const findServer = async (data) => {
  console.log(data);
  const response = await axios.post(`${base_URL}/api/v1/hub/find/`, data, { headers: { token: token } })
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