import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const LikeButton = (props) => {
  const navigate = useNavigate()  
  const isLoggedIn = !!localStorage.getItem("access_token");

  const likeHandler = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await axiosInstance.post(`like-tweet/${props.tweetId}`);
      if (response.status === 201) {
        props.setFakeLikeNumber(prevNum => prevNum +1)
        props.setLikeClicked(true)
      }
    }
  };
  return (
    <div>
      <i className="fa fa-heart-o" onClick={likeHandler} />
      <p>{props.likes}</p>
    </div>
  );
};

export default LikeButton;
