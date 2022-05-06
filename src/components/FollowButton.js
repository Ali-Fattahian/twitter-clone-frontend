import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";


const FollowButton = (props) => {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()
  const followHandler = e => {
    if (!authCtx.isLoggedIn){ 
      navigate('/login')
    } else {
      console.log('you followed this guy')
    }
  }

  return (
    <button
      className='btn'
      type="submit"
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
      onClick={followHandler}
    >
      Follow
    </button>
  );
};

export default FollowButton;