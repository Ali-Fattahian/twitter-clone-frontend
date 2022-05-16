import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const FollowButton = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const followHandler = async (e) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await axiosInstance.post(
        "follow-request/",
        {
          user: props.user.id
        }
      );
      if (response.status === 201) props.setFollow(true);
    }
  };

  return (
    <button
      className="btn"
      type="submit"
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
      onClick={followHandler}
    >
      Follow
    </button>
  );
};

export default FollowButton;
