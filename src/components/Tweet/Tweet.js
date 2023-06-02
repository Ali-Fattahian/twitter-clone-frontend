import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import UnlikeButton from "../UnlikeButton";
import classes from "./TweetStyle.module.css";
import AddReply from "../Reply/AddReply";
import ErrorMessage from "../Modal/ErrorMessage";
import Overlay from "../Modal/Overlay";
import SaveTweet from "../SaveTweet";
import axiosInstance from "../../axiosInstance";

const Tweet = (props) => {
  const userLink = `#/get-profile/${props.username}`;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState(null);
  const [likeClicked, setLikeClicked] = useState(null);
  const [fakeLikeNumber, setFakeLikeNumber] = useState(props.likes); // This is a fake number, when a user adds a like to a post, it is going to be in db, but instead refreshing the data from db, i set this fake number for number of likes, which is the same as the real one.
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const [isAddReplyVisible, setIsAddReplyVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setNewReply] = useState(null);

  const showReply = () => {
    setIsAddReplyVisible(true);
    document.getElementById("add-reply__container").classList.remove("hidden");
  };

  const hideReply = () => {
    setIsAddReplyVisible(false);
    document.getElementById("add-reply__container").classList.add("hidden");
  };

  const showErrorMessageHandler = (message) => {
    setErrorMessage(message);
    setHasError(true);
  };

  const errorMessageCloseHandler = () => {
    setErrorMessage(null);
    setHasError(false);
  };

  const checkForLikeButton = async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (isLoggedIn) {
      await axiosInstance
        .get(`like/${props.tweetId}/check`)
        .then((res) => {
          if (res.status === 200) {
            setLikeOrDislike(
              <UnlikeButton
                likeId={res.data.id}
                likes={fakeLikeNumber}
                setFakeLikeNumber={setFakeLikeNumber}
                setLikeClicked={setLikeClicked}
              />
            );
          } else {
            throw res.status;
          }
        })
        .catch(() => {
          setLikeOrDislike(
            <LikeButton
              tweetId={props.tweetId}
              likes={fakeLikeNumber}
              setFakeLikeNumber={setFakeLikeNumber}
              setLikeClicked={setLikeClicked}
            />
          );
        });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkForLikeButton();
  }, [likeClicked]);

  let likeButton;
  if (isLoggedIn) {
    likeButton = (
      <div title="Like">{!isLoading && hasStarted && likeOrDislike}</div>
    );
  } else {
    likeButton = (
      <div title="Like">
        <i className="fa fa-heart-o" onClick={() => navigate("/login")} />
        <p>{props.likes}</p>
      </div>
    );
  }

  const tweetDetailNavigateHandler = () => {
    navigate(`/tweets/${props.tweetId}`);
  };

  return (
    <React.Fragment>
      {hasError && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={errorMessageCloseHandler}
        />
      )}
      <Overlay
        isVisible={isAddReplyVisible}
        onOverlayClick={() => hideReply()}
      />
      <section
        id="add-reply__container"
        className="add-reply__container hidden"
      >
        <AddReply
          onError={showErrorMessageHandler}
          tweetId={props.tweetId}
          username={props.user}
          firstname={props.firstname}
          lastname={props.lastname}
          timeCreated={props.timeCreated}
          picture={props.picture}
          content={props.content}
          hideReply={hideReply}
          setNewReply={setNewReply}
        />
      </section>
      <div className={classes.tweet} onClick={tweetDetailNavigateHandler}>
        <div className={classes["tweet-left"]}>
          <img src={props.picture} alt="Profile" style={{objectFit: 'cover'}} />
        </div>
        <div className={classes["tweet-right"]}>
          <div className={classes["tweet-right__top"]}>
            <div className={classes["user-info"]}>
              <a id={classes["user-name"]} href={userLink}>
                {props.firstname} {props.lastname}
              </a>
              <a id={classes["username"]} href={userLink}>
                {props.username}
              </a>
              <a id={classes["tweet-dot"]} href={userLink}>
                ·
              </a>
              <a id={classes["tweet__time-created"]} href={userLink}>
                {props.timeCreated}
              </a>
            </div>
            {/* <div className={classes.more}>
              <div></div>
              <div></div>
              <div></div>
            </div> */}
          </div>
          <div className={classes["tweet-content"]}>{props.content}</div>
          <div className={classes["tweet-right__bottom"]}>
            <div
              title="Reply"
              onClick={(e) => {
                e.stopPropagation();
                showReply();
              }}
            >
              <i className="fa fa-reply" />
              <p>{props.reply}</p>
            </div>
            {likeButton}
            <div title="Save">
              <SaveTweet
                tweetId={props.tweetId}
                setHasError={setHasError}
                setErrorMessage={setErrorMessage}
                setNeedRefreshTweetList={props.setNeedRefresh}
                isBookmarkPage={props.isBookmarkPage}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tweet;
