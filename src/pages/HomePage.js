import React from "react";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="main__middle-side">
        <AddTweet />
        <TweetList />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
