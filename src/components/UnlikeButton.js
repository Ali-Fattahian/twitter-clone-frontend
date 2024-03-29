import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const UnlikeButton = (props) => {
  const navigate = useNavigate()  
  const isLoggedIn = !!localStorage.getItem("authTokens");

  const likeHandler = async (e) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await axiosInstance.delete(`remove-like/${props.likeId}`);
      if (response.status === 204) {
        props.setFakeLikeNumber(prevNum => prevNum -1)
        props.setLikeClicked(false)
      }
    }
  };
  return (
    <div>
      <i className="fa fa-heart" style={{color: 'red'}} onClick={likeHandler} />
      <p>{props.likes}</p>
    </div>
  );
};

export default UnlikeButton;
