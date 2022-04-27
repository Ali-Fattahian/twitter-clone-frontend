import React from "react";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";

const Bookmarks = () => {
  return (
    <React.Fragment>
      <div className="main__middle-side">
        <TweetList />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default Bookmarks;
