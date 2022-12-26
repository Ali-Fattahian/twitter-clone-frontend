import React, { useState, useEffect, useCallback, useContext } from "react";

import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import Overlay from "../components/Modal/Overlay";
import useAxios from "../useAxios";
import { useNavigate } from "react-router-dom";
import { ServerContext } from "../store/server-context";

const Bookmarks = (props) => {
  const [tweetList, setTweetList] = useState([]);
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const navigate = useNavigate();
  const [needRefresh, setNeedRefresh] = useState(null);
  const { serverURL } = useContext(ServerContext)
  const api = useAxios()

  const getTweets = useCallback(async () => {
    if (isLoggedIn) {
      const response = await api.get(
        `${serverURL}bookmarks`
      );
      if (response.status === 200) {
        const tweets = response.data.map((tweet) => tweet.tweet);
        setTweetList(tweets);
      }
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, api, serverURL]);

  const onOverlayClick = () => {
    props.onMenuClick();
  };

  useEffect(() => {
    getTweets();
  }, [needRefresh, getTweets]);

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? (
        <Overlay onOverlayClick={onOverlayClick} isVisible={true} />
      ) : (
        <Overlay onOverlayClick={onOverlayClick} isVisible={false} />
      )}
      <div className="main__middle-side">
        <div className="ham-menu__container" style={{gap: '1.5rem'}}>
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{props.pageName}</p>
        </div>
        {tweetList.length === 0 ? (
          <p className="p-info--center">You don't have any saved tweets.</p>
        ) : (
          <TweetList
            tweetList={tweetList}
            isBookmarkPage={true}
            setNeedRefresh={setNeedRefresh}
          />
        )}
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default Bookmarks;
