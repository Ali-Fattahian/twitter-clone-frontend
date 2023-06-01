import axios from "axios";
import { parseJwt } from "./utils";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

const baseURL = "http://localhost:8000/api/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Authorization: `JWT ${authTokens?.access}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const user = parseJwt(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));
    req.headers.Authorization = `JWT ${authTokens.access}`;

    setAuthTokens(response.data);
    setUser(parseJwt(response.data.access));

    return req;
  });
  axiosInstance.interceptors.response.use(res => res, function (err) {
    // if (err.response.status === 404) {
    //   return;
    // }
    return Promise.reject(err);
  })
  return axiosInstance;
};

export default useAxios;