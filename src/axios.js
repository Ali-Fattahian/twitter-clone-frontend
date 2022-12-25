import axios from "axios";
import { parseJwt } from "./utils";
import dayjs from "dayjs";

const authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const baseUrl = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: `JWT ${authTokens?.access}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (typeof error.response === "undefined") {
//       alert(
//         "A server/network error occured. " +
//           "Looks like CORS might be the problem. " +
//           "Sorry about this, we will get it fixed shortly."
//       );
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === baseUrl + "token/refresh/"
//     ) {
//       window.location.href = "login/";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         const now = Math.ceil(Date.now() / 1000);
//         console.log(tokenParts.exp);

//         if (tokenParts.exp > now) {
//           return axiosInstance
//             .post("token/refresh/", { refresh: refreshToken })
//             .then((response) => {
//               localStorage.setItem("access_token", response.data.access);
//               localStorage.setItem("refresh_token", response.data.refresh);

//               axiosInstance.defaults.headers["Authorization"] =
//                 "JWT " + response.data.access;
//               originalRequest.headers["Authorization"] =
//                 "JWT " + response.data.access;

//               return axiosInstance(originalRequest);
//             });
//         }
//       }
//     }
//   }
// );

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `JWT ${authTokens.access}`;
  }

  const user = parseJwt(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(`${baseUrl}token/refresh/`, {
    refresh: authTokens.refresh,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `JWT ${authTokens.access}`;

  return req;
});

export default axiosInstance;
