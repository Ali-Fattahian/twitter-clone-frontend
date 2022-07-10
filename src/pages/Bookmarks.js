import React, { useState, useEffect, useCallback } from "react";

import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [tweetList, setTweetList] = useState([]);
  const isLoggedIn = !!localStorage.getItem('access_token');
  const navigate = useNavigate()
  const [needRefresh, setNeedRefresh] = useState(null)

  const getTweets = useCallback(async () => {
    if (isLoggedIn) {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/api/bookmarks"
      );
      if (response.status === 200) {
        const tweets = response.data.map((tweet) => tweet.tweet);
        setTweetList(tweets);
      } 
    } else {
      navigate('/login')
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    getTweets();
  }, [needRefresh, getTweets]);

  return (
    <React.Fragment>
      <div className="main__middle-side">
        {tweetList.length === 0 ? (
          <p className="p-info--center">
            You don't have any saved tweets.
          </p>
        ) : (
          <TweetList tweetList={tweetList} isBookmarkPage={true} setNeedRefresh={setNeedRefresh} />
        )}
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default Bookmarks;
