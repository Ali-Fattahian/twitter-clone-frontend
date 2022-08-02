import React, { useCallback, useEffect, useState } from "react";
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
import axiosInstance from "../axios";

const TweetDetailPage = (props) => {
  const [tweetDetail, setTweetDetail] = useState(null);
  const { tweetId } = useParams();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [newReply, setNewReply] = useState(null);
  const [currentUserPfp, setCurrentUserPfp] = useState(null);
  const [startedLoadingPfp, setStartedLoadingPfp] = useState(false);
  const [finishedLoadingPfp, setFinishedLoadingPfp] = useState(false);

  const getTweets = useCallback(async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/tweets/${tweetId}`
    );

    if (response.status === 200) setTweetDetail(response.data);
  }, [tweetId]);

  useEffect(() => {
    getTweets();
    if (!!localStorage.getItem("access_token")) {
      setStartedLoadingPfp(true);
      fetchCurrentUserData(); // For profile picture
      setFinishedLoadingPfp(true);
    } else {
      setStartedLoadingPfp(true);
      setCurrentUserPfp(ProfilePicture);
      setFinishedLoadingPfp(true);
    }
  }, [getTweets]);

  const showErrorMessageHandler = (message) => {
    setErrorMessage(message);
    setHasError(true);
  };

  const errorMessageCloseHandler = () => {
    setErrorMessage(null);
    setHasError(false);
  };

  async function fetchCurrentUserData() {
    let username = parseJwt(localStorage.getItem("access_token")).username;
    axiosInstance.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setCurrentUserPfp(res.data.picture);
      }
    });
  }

  const showReply = () => {
    setIsReplyVisible(true);
    document.getElementById("add-reply__container").classList.remove("hidden");
  };

  const hideReply = () => {
    setIsReplyVisible(false);
    document.getElementById("add-reply__container").classList.add("hidden");
  };

  return (
    <React.Fragment>
      {hasError && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={errorMessageCloseHandler}
        />
      )}
      <Overlay isVisible={isReplyVisible} onOverlayClick={() => hideReply()} />
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} />
          <p>{props.pageName}</p>
        </section>
        {finishedLoadingPfp && startedLoadingPfp && tweetDetail ? (
          <TweetDetail
            tweetId={tweetId}
            picture={tweetDetail.user.picture}
            content={tweetDetail.user.content}
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
