import axios from "axios";

const BASE_URL = "http://localhost:8080/CompileOutline/";

export const endpoints = {
  login: "/api/login/",
  "current-user": "/api/current-user/",
  "change-required": "/api/change-required/",
  specification: "/api/specification/",
  "specification-detail": (specId) => `/api/specification/${specId}`,
  "comment-specifcation": (specId) => `/api/feedback/${specId}`,
  "deleted-comment": (commentId) => `/api/feedback/${commentId}`,
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
