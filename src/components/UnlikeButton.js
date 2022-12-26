import React from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";

const UnlikeButton = (props) => {
  const navigate = useNavigate()  
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const api = useAxios()

  const likeHandler = async (e) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const response = await api.delete(`remove-like/${props.likeId}`);
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
