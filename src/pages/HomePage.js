import React from "react";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import ProfilePicture from '../components/Tweet/default_profile.png'

const HomePage = props => {

  return (
    <React.Fragment>
      <div className="main__middle-side" id='homepage-middle'>
        <section className="menu-btn__section">
          <img src={ProfilePicture} alt='Profile' onClick={props.onMenuClick} />
          <p>{props.pageName}</p>
        </section>
        <AddTweet />
        <TweetList />
      </div>
      <div className="main__right-side">
        <Searchbar searchResults={props.searchResults} />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
