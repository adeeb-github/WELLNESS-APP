import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true, // if using cookies
  baseURL: "http://localhost:4000", // Base URL for the API
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
