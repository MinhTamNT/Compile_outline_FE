import axios from "axios";

const BASE_URL = "http://localhost:8080/CompileOutline/";

export const endpoints = {
  login: "/api/login/",
  "current-user": "/api/current-user/",
};

export const authApi = (accessToken) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const API = axios.create({
  baseURL: BASE_URL,
});
