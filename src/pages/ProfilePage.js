import YouMightLike from "../components/YouMightLike";
import React from "react";
import TweetList from "../components/Tweet/TweetList";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <div className="main__middle-side">
        <Profile />
        <TweetList /> {/* shows the tweets from this account */}
      </div>
      <div className="main__right-side">
        <Searchbar />
        <YouMightLike />
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
