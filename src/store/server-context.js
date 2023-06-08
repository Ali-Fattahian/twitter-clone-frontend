import React from "react";

export const ServerContext = React.createContext({
    serverURL: '',
})

// const serverURL =  'http://localhost:8000/api/';
const serverURL =  'https://twitter-clone-oo6z.onrender.com/api/';

export const ServerContextProvider = (props) => {
    return <ServerContext.Provider value={{serverURL: serverURL}}>{props.children}</ServerContext.Provider>
}