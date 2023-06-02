import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const baseURL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("authTokens")
      ? "JWT " + JSON.parse(localStorage.getItem("authTokens")).access
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  axios.post(`${baseURL}token/refresh/`, {
    refresh: JSON.parse(localStorage.getItem('authTokens')).refresh
  }).then((tokenRefreshResponse) => {
    localStorage.setItem(
      "authTokens",
      JSON.stringify(tokenRefreshResponse.data)
    );
    failedRequest.response.config.headers["Authorization"] =
      "JWT " + tokenRefreshResponse.data.access;
    return Promise.resolve();
  });

function getAccessToken() {
  return JSON.parse(localStorage.getItem("authTokens")).access;
}

// Use interceptor to inject the token to requests
axiosInstance.interceptors.request.use((request) => {
  request.headers["Authorization"] = `JWT ${getAccessToken()}`;
  return request;
});

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
