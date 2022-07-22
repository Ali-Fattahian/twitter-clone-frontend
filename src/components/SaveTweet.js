import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const SaveTweet = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const saveTweetHandler = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    }
    const response = await axiosInstance.post(
      `tweets/${props.tweetId}/create-bookmark`
    );

    if (!response) { // This is because of integrity error that happens when you already saved this tweet.
        props.setHasError(true)
        props.setErrorMessage("You have already saved this tweet!")
    }
  };

  return (
    <i
      className="fa fa-paper-plane"
      aria-hidden="true"
      onClick={saveTweetHandler}
    ></i>
  );
};

export default SaveTweet;
