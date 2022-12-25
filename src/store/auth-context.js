// import React, { useState } from "react";
// import axiosInstance from "../axios";
import React, { useState, useEffect } from 'react';
import { parseJwt } from '../utils';

export const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
  const baseURL = 'http://localhost:8000/api/'
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? parseJwt(localStorage.getItem('authTokens')) : null)
  const [loading, setIsLoading] = useState(true) // First Load

  const login = async (email, password) => {
    const response = await fetch(`${baseURL}token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': email, 'password': password})
    })

    const data = await response.json()
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(parseJwt(data['access']))
      localStorage.setItem('authTokens', JSON.stringify(data))
      window.location.replace('/')
    } else {
      console.log('error')
    }
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    window.location.replace('/login')
  }

  // const updateToken = async () => {
  //   console.log('called')
  //   const response = await fetch(`${baseURL}token/refresh/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({'refresh': authTokens.refresh})
  //   })

  //   const data = await response.json()
  //   if (response.status === 200) {
  //     setAuthTokens(data)
  //     setUser(parseJwt(data['access']))
  //     localStorage.setItem('authTokens', JSON.stringify(data))
  //   } else {
  //     logout()
  //   }
    
  //   if (loading) {
  //     setIsLoading(false)
  //   }
  // }
 
  const contextData = {
    authTokens,
    setAuthTokens,
    login,
    user,
    logout,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(parseJwt(authTokens.access))
    }
    setIsLoading(false)
  }, [authTokens, loading])

  return <AuthContext.Provider value={contextData}>
    {loading ? null : children}
  </AuthContext.Provider>
}

// export const AuthContext = React.createContext({
//   login: () => {},
//   loginHasError: false,
//   setLoginHasError: () => {}
// });

// export const AuthContextProvider = (props) => {

//   const [loginHasError, setLoginHasError] = useState(false)

//   const login = (email, password) => {
//     axiosInstance
//     .post("token/", {
//       email: email,
//       password: password,
//     })
//     .then((res) => {
//       localStorage.setItem("refresh_token", res.data.refresh);
//       localStorage.setItem("access_token", res.data.access);
//       axiosInstance.defaults.headers["Authorization"] =
//         "JWT " + localStorage.getItem("access_token");
//       document.location.reload() // Reload the location (most importantly home page, to get new data from api with new headers)
//     }).catch(err => setLoginHasError(true));
//   }

//   return (
//     <AuthContext.Provider value={{ login, loginHasError, setLoginHasError}}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };


