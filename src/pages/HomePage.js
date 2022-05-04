import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import ProfilePicture from "../components/Tweet/default_profile.png";
import axiosInstance from "../axios";


const HomePage = (props) => {
  const [tweetList, setTweetList] = useState([]);

  const getTweets = async () => {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/home");

    if (response.status === 200) setTweetList(response.data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <React.Fragment>
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} />
          <p>{props.pageName}</p>
        </section>
        <AddTweet isAuth={props.isAuth} />
        <TweetList tweetList={tweetList} />
      </div>
      <div className="main__right-side">
        <Searchbar searchResults={props.searchResults} />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
