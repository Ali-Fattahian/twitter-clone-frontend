import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";

const UnfollowButton = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const api = useAxios()

  const unfollowHandler = async (e) => {
    let response;
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (props.pageName === 'followings' || props.pageName==='followers') {
        response = await api.delete(`unfollow/${props.username}`)
      } else {
        response = await api.delete(
          `profiles/${props.unfollowId}/follow/delete`
        );
      }
      if (response.status === 204) props.setFollow(Date.now());
    }
  };

  return (
    <button
      className="btn"
      type="submit"
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
      onClick={unfollowHandler}
    >
      Unfollow
    </button>
  );
};

export default UnfollowButton;
