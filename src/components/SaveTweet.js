import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const SaveTweet = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const [isSaved, setIsSaved] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(null);

  const checkForSave = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`bookmarks/${props.tweetId}/check`)
      if (response.status === 200) setIsSaved(true)
    } catch(err) {
      console.clear()
      if (err.response.status === 404)
      setIsSaved(false)
    }
  }, [props.tweetId]);

  useEffect(() => {
    if (isLoggedIn) {
      setHasStarted(true);
      checkForSave();
      setHasFinished(true);
    } else {
      setHasStarted(true);
      setHasFinished(true);
    }
  }, [forceRefresh, checkForSave, isLoggedIn]);

  const saveTweetHandler = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    }
    const response = await axiosInstance.post(`tweets/${props.tweetId}/create-bookmark`);

    if (response.status === 201) setForceRefresh(Date.now());
  };

  const removeFromSavedHandler = async (e) => {
    e.stopPropagation();
    const response = await axiosInstance.delete(`bookmarks/${props.tweetId}/delete`);

    if (response.status === 204) {
      setForceRefresh(Date.now()); // refresh the save component
      if (props.isBookmarkPage) props.setNeedRefreshTweetList(Date.now()); // refresh the tweetlist component when a use deletes a saved tweet object if we are in book marks page
    }
  };

  if (isSaved && hasStarted && hasFinished) {
    return (
      <i
        className="fas fa-save fa-lg"
        aria-hidden="true"
        onClick={removeFromSavedHandler}
      ></i>
    ); // saved before
  } else if (!isSaved && hasStarted && hasFinished) {
    return (
      <i
        className="far fa-save fa-lg"
        aria-hidden="true"
        onClick={saveTweetHandler}
      ></i>
    ); // not saved before
  }
};

export default SaveTweet;
