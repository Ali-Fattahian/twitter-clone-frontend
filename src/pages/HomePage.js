import React, { useEffect, useState, useContext } from "react";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import axios from "axios";
import ErrorMessage from "../components/Modal/ErrorMessage";
import Overlay from "../components/Modal/Overlay";
import { ServerContext } from "../store/server-context";
import { AuthContext } from "../store/auth-context";
import ProfilePicture from "../components/Tweet/default_profile.png";

const HomePage = (props) => {
  const [tweetList, setTweetList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { serverURL } = useContext(ServerContext);
  const { userData } = useContext(AuthContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const getTweets = async () => {
    const response = await axios.get(`${serverURL}home`);

    if (response.status === 200) setTweetList(response.data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  const showErrorMessageHandler = (message) => {
    setErrorMessage(message);
    setHasError(true);
  };

  const errorMessageCloseHandler = () => {
    setErrorMessage(null);
    setHasError(false);
    setIsOverlayVisible(false);
  };

  const onOverlayClick = () => {
    setIsOverlayVisible(false);
    setHasError(false);
    setErrorMessage(false);
    props.setIsMenuOpen(false)
  };

  return (
    <React.Fragment>
      <Overlay onOverlayClick={onOverlayClick} isVisible={isOverlayVisible} />
      {hasError && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={errorMessageCloseHandler}
        />
      )}
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          <img
            src={!!userData ? userData.picture : ProfilePicture}
            alt="Profile"
            onClick={() => {
              setIsOverlayVisible(true);
              props.onMenuClick();
            }}
            style={{ objectFit: "cover" }}
          />
          <div
            className="ham-menu__btn"
            onClick={() => {
              setIsOverlayVisible(true);
              props.onMenuClick();
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{props.pageName}</p>
        </section>
        <AddTweet
          onError={showErrorMessageHandler}
          setIsOverlayVisible={setIsOverlayVisible}
        />
        <TweetList tweetList={tweetList} isBookmarkPage={false} />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
