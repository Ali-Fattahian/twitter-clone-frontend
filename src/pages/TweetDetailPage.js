import React, { useCallback, useEffect, useState, useContext } from "react";
import Searchbar from "../components/Searchbar";
import ProfilePicture from "../components/Tweet/default_profile.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import TweetDetail from "../components/Tweet/TweetDetail";
import dateTimeGenerator from "../utils";
import AddReply from "../components/Reply/AddReply";
import ErrorMessage from "../components/Modal/ErrorMessage";
import Overlay from "../components/Modal/Overlay";
import ReplyList from "../components/Reply/ReplyList";
import { parseJwt } from "../utils";
import useAxios from "../useAxios";
import { ServerContext } from "../store/server-context";

const TweetDetailPage = (props) => {
  const [tweetDetail, setTweetDetail] = useState(null);
  const { tweetId } = useParams();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [newReply, setNewReply] = useState(null);
  const [currentUserPfp, setCurrentUserPfp] = useState(null);
  const [startedLoading, setStartedLoading] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { serverURL } = useContext(ServerContext)
  const api = useAxios()

  const getTweets = useCallback(async () => {
    const response = await axios.get(
      `${serverURL}tweets/${tweetId}`
    );

    if (response.status === 200) setTweetDetail(response.data);
  }, [tweetId, serverURL]);

  const fetchCurrentUserData = useCallback(async () => {
    let username = parseJwt(localStorage.getItem("authTokens")).username;
    api.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setCurrentUserPfp(res.data.picture);
      }
    });
  }, [api])

  useEffect(() => {
    if (!!localStorage.getItem("authTokens")) {
      setStartedLoading(true);
      getTweets();
      fetchCurrentUserData(); // For profile picture
      setFinishedLoading(true);
    } else {
      setStartedLoading(true);
      getTweets();
      setCurrentUserPfp(ProfilePicture);
      setFinishedLoading(true);
    }
  }, [getTweets, hasError, fetchCurrentUserData]);

  const showErrorMessageHandler = (message) => {
    setErrorMessage(message);
    setHasError(true);
  };

  const errorMessageCloseHandler = () => {
    setErrorMessage(null);
    setHasError(false);
  };

  const showReply = () => {
    setIsReplyVisible(true);
    document.getElementById("add-reply__container").classList.remove("hidden");
  };

  const hideReply = () => {
    setIsReplyVisible(false);
    document.getElementById("add-reply__container").classList.add("hidden");
  };

  const onOverlayClick = () => {
    props.onMenuClick()
    setHasError(false)
  }

  return (
    <React.Fragment>
      <Overlay onOverlayClick={onOverlayClick} isVisible={!!props.isMenuOpen} />
      <Overlay onOverlayClick={hideReply} isVisible={isReplyVisible} />
      <Overlay onOverlayClick={errorMessageCloseHandler} isVisible={hasError} />
      {hasError && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={errorMessageCloseHandler}
        />
      )}
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
        {finishedLoading && startedLoading && tweetDetail ? (
          <TweetDetail
            tweetId={tweetId}
            picture={tweetDetail.user.picture}
            content={tweetDetail.content}
            username={tweetDetail.user.user}
            firstname={tweetDetail.user.firstname}
            lastname={tweetDetail.user.lastname}
            likes={tweetDetail.likes.length}
            timeCreated={dateTimeGenerator(
              tweetDetail.date_created.created_ago,
              tweetDetail.date_created.created
            )}
            showReply={showReply}
            setNewReply={setNewReply}
            currentUserPfp={currentUserPfp}
            onError = {showErrorMessageHandler}
          />
        ) : (
          <p className="p-info--center">This tweet doesn't exist.</p>
        )}
        {tweetDetail && (
          <div
            id="add-reply__container"
            className="add-reply__container hidden"
          >
            <AddReply
              onError={showErrorMessageHandler}
              tweetId={tweetId}
              username={tweetDetail.user.username}
              firstname={tweetDetail.user.firstname}
              lastname={tweetDetail.user.lastname}
              timeCreated={dateTimeGenerator(
                tweetDetail.date_created.created_ago,
                tweetDetail.date_created.created
              )}
              picture={tweetDetail.user.picture}
              content={tweetDetail.content}
              hideReply={hideReply}
              setNewReply={setNewReply}
            />
          </div>
        )}
        <ReplyList newReply={newReply} tweetId={tweetId} />
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default TweetDetailPage;
