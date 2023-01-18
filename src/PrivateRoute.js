import { useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { AuthContext } from "./store/auth-context"

const PrivateRoute = ({ children }) => {
    const { userData } = useContext(AuthContext)
    const { username } = useParams()
    if (!!userData && username === userData.username) 
        return children
    if (!!userData && username !== userData.username)
    return <Navigate to='/home' /> // accessing someone else's route while logged in
    return <Navigate to='/login' /> // not logged in at all
}

export default PrivateRoute