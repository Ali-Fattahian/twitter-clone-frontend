import React, { useState, useEffect } from "react";
import useAxios from "../useAxios";
import { parseJwt } from "../utils";

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
  const api = useAxios();

  const login = async (email, password) => {
    const response = await fetch(`${baseURL}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(parseJwt(data.access).username);
      localStorage.setItem("authTokens", JSON.stringify(data));
      window.location.replace("/home");
    } else {
      setLoginHasError(true);
    }
  };

  const fetchCurrentUserData = async () => {
    const username = parseJwt(authTokens.access).username;

    await api.get(`profiles/${username}`).then((res) => {
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
