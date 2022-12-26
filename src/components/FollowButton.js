import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";

const FollowButton = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const api = useAxios()

  const followHandler = async (e) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await api.post(
        "follow-request/",
        {
          user: props.user.id
        }
      );
      if (response.status === 201) {
        props.setFollow(true)
        props.setFollowWasSuc(response.data.id) // To make a refresh on suggested users list
      };
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
