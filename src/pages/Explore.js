import YouMightLike from "../components/YouMightLike";
import classes from "./Pages.module.css";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import React from "react";
import ProfilePicture from '../components/Tweet/default_profile.png'

const Explore = props => {
  return (
    <React.Fragment>
      <div className="main__middle-side" id='explore-middle'>
        <div className={classes["search-bar__container"]}>
          <img src={ProfilePicture} alt='Profile' onClick={props.onMenuClick} />
          <Searchbar />
        </div>
        <TweetList />
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
