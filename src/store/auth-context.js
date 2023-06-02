import React, { useState, useEffect } from "react";
import { parseJwt } from "../utils";
import axios from "axios";
import axiosInstance from "../axiosInstance";

export const AuthContext = React.createContext({
  authTokens: null,
  setAuthTokens: () => {},
  login: () => {},
  user: null,
  logout: () => {},
  setUser: () => {},
  userData: null,
  loginHasError: false,
  setLoginHasError: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const baseURL = "http://localhost:8000/api/";
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? parseJwt(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  const [userData, setUserData] = useState(null);
  const [loading, setIsLoading] = useState(true); // First Load
  const [loginHasError, setLoginHasError] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${baseURL}token/`,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(parseJwt(response.data.access).username);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        window.location.replace("/");
      } else {
        setLoginHasError(true);
      }
    } catch (err) {
      console.log(err)
      setLoginHasError(true)
    }
  };

  const fetchCurrentUserData = async () => {
    const username = parseJwt(authTokens.access).username;

    await axiosInstance.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setUserData(res.data);
      }
    });
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload();
  };

  const contextData = {
    authTokens,
    setAuthTokens,
    login,
    user,
    logout,
    setUser,
    userData,
    loginHasError,
    setLoginHasError,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(parseJwt(authTokens.access));
      fetchCurrentUserData();
    }
    setIsLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
