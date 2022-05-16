import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const UnfollowButton = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const unfollowHandler = async (e) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await axiosInstance.delete(
        `profiles/${props.unfollowId}/follow/delete`
      );
      if (response.status === 204) props.setFollow(false);
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
