import React from "react";
import axiosInstance from "../axios";

export const AuthContext = React.createContext({
  login: () => {},
});

export const AuthContextProvider = (props) => {

  const login = (email, password) => {
    axiosInstance
    .post("token/", {
      email: email,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("access_token", res.data.access);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
      document.location.reload() // Reload the location (most importantly home page, to get new data from api with new headers)
    });
  }

  return (
    <AuthContext.Provider value={{ login }}>
      {props.children}
    </AuthContext.Provider>
  );
};
