import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import classes from "./TweetStyle.module.css";
import LikeButton from "../LikeButton";
import UnlikeButton from "../UnlikeButton";
import axiosInstance from "../../axios";
import Picture from "./default_profile.png";
import SaveTweet from "../SaveTweet";
import ErrorMessage from "../Modal/ErrorMessage";

const TweetDetail = (props) => {
  const userLink = `/${props.username}`;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState(null);
  const [likeClicked, setLikeClicked] = useState(null);
  const [fakeLikeNumber, setFakeLikeNumber] = useState(props.likes); // This is a fake number, when a user adds a like to a post, it is going to be in db, but instead refreshing the data from db, i set this fake number for number of likes, which is the same as the real one.
  const isLoggedIn = !!localStorage.getItem("access_token");
  const replyContent = useRef("");
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const checkForLikeButton = useCallback(async () => {
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
  }, [isLoggedIn, props.tweetId, fakeLikeNumber]);

  useEffect(() => {
    checkForLikeButton();
  }, [checkForLikeButton, likeClicked]);

  let likeButton;
  if (isLoggedIn) {
    likeButton = <div>{!isLoading && hasStarted && likeOrDislike}</div>;
  } else {
    likeButton = (
      <div>
        <i className="fa fa-heart-o" onClick={() => navigate("/login")} />
        <p>{props.likes}</p>
      </div>
    );
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      if (replyContent.current.value.trim().length > 0) {
        sendData();
      }
    } else {
      props.onError(
        <p>
          Please <Link to="/login">login</Link> before adding a tweet.
        </p>
      );
    }
  };

  async function sendData() {
    const response = await axiosInstance.post(`tweets/${props.tweetId}/reply`, {
      text: replyContent.current.value,
    });

    if (response.status === 201) {
      console.log("success");
      props.setNewReply(response.data.id)
      replyContent.current.value = "";
      return;
    }
  }

  const onClose = () => {
    setErrorMessage(null);
    setHasError(false);
  };

  return (
    <section className={classes["tweet-detail"]}>
      {hasError && <ErrorMessage onClose={onClose} errorMessage={errorMessage} />}
      <div className={classes["tweet-detail__top"]}>
        <div className={classes["user-info"]}>
          <div className={classes["tweet-detail__user-picture"]}>
            <img src={props.picture} alt="Profile" />
          </div>
          <div className={classes["tweet-detail__user-names"]}>
            <a id={classes["user-name"]} href={userLink}>
              {`${props.firstname} ${props.lastname}`}
            </a>
            <a id={classes["username"]} href={userLink}>
              {props.username}
            </a>
          </div>
        </div>
        {/* <div className={classes["tweet-detail__more-btn"]}>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
      </div>
      <div className={classes["tweet-detail__middle"]}>
        <p className={classes["tweet-detail__content"]}>{props.content}</p>
      </div>
      <div className={classes["tweet-detail__bottom"]}>
        <div className={classes["tweet-detail__btns"]}>
          <div title="Reply" className={classes["tweet-detail__interactive-btn"]}>
            <i className="fa fa-reply" onClick={props.showReply} />
            <p>{props.reply}</p>
          </div>
          <div title="Like" className={classes["tweet-detail__interactive-btn"]}>
            {likeButton}
          </div>
          <div title="Save" className={classes["tweet-detail__interactive-btn"]}>
            <SaveTweet tweetId={props.tweetId} setHasError={setHasError} setErrorMessage={setErrorMessage} />
          </div>
        </div>
        <div className={classes["always-visible__add-reply"]}>
          <form onSubmit={formSubmitHandler}>
            <img src={Picture} alt="Profile" />
            <textarea placeholder="Tweet your reply" ref={replyContent} />
            <button className="btn" type="submit">
              Reply
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TweetDetail;
