import React, { useEffect, useState } from "react";
import classes from "./Pages.module.css";

import YouMightLike from "../components/YouMightLike";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import ProfilePicture from "../components/Tweet/default_profile.png";
import axiosInstance from "../axios";

const Explore = (props) => {
  const [tweetList, setTweetList] = useState([]);

  const getTweets = async () => {
    const response = await axiosInstance.get("http://127.0.0.1:8000/api/explore");

    if (response.status === 200) setTweetList(response.data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <React.Fragment>
      <div className="main__middle-side" id="explore-middle">
        <div className={classes["search-bar__container"]}>
          <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} />
          <Searchbar />
        </div>
        <TweetList tweetList={tweetList} />
      </div>
      <div className="main__right-side">
        <YouMightLike />
        <div className={classes["extra-links"]}>
          <a href="\">Terms of Service</a>
          <a href="\">Privacy Policy</a>
          <a href="\">Cookie Policy</a>
          <a href="\">Imprint</a>
          <a href="\">Accessibility</a>
          <a href="\">Ads info</a>
          <a href="\">More</a>
          <p>© 2022 Twitter, Inc.</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Explore;
