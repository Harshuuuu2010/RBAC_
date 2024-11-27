import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7001/api", // Correct backend base URL with '/api'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("Token added to request:", token); // Log the token being added
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error response:", error.response); // Log the error response
    return Promise.reject(error);
  }
);

export default API;
