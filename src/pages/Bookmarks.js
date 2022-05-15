import React, { useState, useEffect } from "react";

import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [tweetList, setTweetList] = useState([]);
  const isLoggedIn = !!localStorage.getItem('access_token');
  const navigate = useNavigate()

  const getTweets = async () => {
    if (isLoggedIn) {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/api/bookmarks"
      );
      if (response.status === 200) {
        const tweets = response.data.map((tweet) => tweet.tweet); // Slightly different response structure
        setTweetList(tweets);
      } 
    } else {
      navigate('/login')
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <React.Fragment>
      <div className="main__middle-side">
        {tweetList.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#71767b",
              marginTop: "1.5rem",
            }}
          >
            You haven't saved any tweets yet.
          </p>
        ) : (
          <TweetList tweetList={tweetList} />
        )}
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default Bookmarks;
