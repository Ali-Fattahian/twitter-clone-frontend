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
