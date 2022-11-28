import React from "react";

export const ServerContext = React.createContext({
    serverURL: '',
})

export const ServerContextProvider = (props) => {
    return <ServerContext.Provider value={{serverURL: 'http://localhost:8000/api/'}}>{props.children}</ServerContext.Provider>
}