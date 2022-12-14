import React, { useEffect, useState, useContext } from "react";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import axiosInstance from "../axios";
import ErrorMessage from "../components/Modal/ErrorMessage";
import Overlay from "../components/Modal/Overlay";
import { ServerContext } from "../store/server-context";


const HomePage = (props) => {
  const [tweetList, setTweetList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { serverURL } = useContext(ServerContext)

  const getTweets = async () => {
    const response = await axiosInstance.get(`${serverURL}home`);

    if (response.status === 200) setTweetList(response.data);
  };

  useEffect(() => {
    getTweets();
  }, [props.refreshHomePageOnAuthChange]);

  const showErrorMessageHandler = (message) => {
    setErrorMessage(message);
    setHasError(true);
  };

  const errorMessageCloseHandler = () => {
    setErrorMessage(null);
    setHasError(false);
  };

  const onOverlayClick = () => {
    props.onMenuClick()
  }

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? <Overlay onOverlayClick={onOverlayClick} isVisible={true} /> : <Overlay onOverlayClick={onOverlayClick} isVisible={false} />}
      {hasError && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={errorMessageCloseHandler}
        />
      )}
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          {/* <img src={currentUserData ? currentUserData.picture : ProfilePicture} alt="Profile" onClick={props.onMenuClick} style={{objectFit: 'cover'}} /> */}
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{props.pageName}</p>
        </section>
        <AddTweet onError={showErrorMessageHandler} />
        <TweetList tweetList={tweetList} isBookmarkPage={false} />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
