import React, { useEffect, useState, useContext } from "react";
import classes from "./Pages.module.css";

import YouMightLike from "../components/YouMightLike";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import Overlay from "../components/Modal/Overlay";
import axios from "axios";
import { ServerContext } from "../store/server-context";

const Explore = (props) => {
  const [tweetList, setTweetList] = useState([]);
  const { serverURL } = useContext(ServerContext)

  const getTweets = async () => {
    const response = await axios.get(
      `${serverURL}explore`
    );

    if (response.status === 200) setTweetList(response.data);
  } 

  useEffect(() => {
    getTweets();
  }, []);

  const onOverlayClick = () => {
    props.onMenuClick()
  }

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? <Overlay onOverlayClick={onOverlayClick} isVisible={true} /> : <Overlay onOverlayClick={onOverlayClick} isVisible={false} />}
      <div className="main__middle-side" id="explore-middle">
        <div className={classes["search-bar__container"]}>
        {/* <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} /> */}
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Searchbar />
        </div>
        {tweetList.length === 0 ? (
          <p className="p-info--center">No tweets from the last 24 hours.</p>
        ) : (
          <TweetList tweetList={tweetList} isBookmarkPage={false} />
        )}
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
