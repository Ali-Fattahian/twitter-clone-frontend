import React, { useState, useEffect } from "react";

import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import axiosInstance from "../axios";

const Bookmarks = (props) => {
  const [tweetList, setTweetList] = useState([]);

  const getTweets = async () => {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/bookmarks");
    if (response.status === 200) {
      const tweets = response.data.map(tweet => tweet.tweet); // Slightly different response structure
      setTweetList(tweets)
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <React.Fragment>
      <div className="main__middle-side">
        <TweetList tweetList={tweetList} />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default Bookmarks;
