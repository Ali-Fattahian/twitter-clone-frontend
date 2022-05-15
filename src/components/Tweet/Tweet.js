import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

import LikeButton from "../LikeButton";
import UnlikeButton from "../UnlikeButton";
import classes from "./TweetStyle.module.css";

const Tweet = (props) => {
  const userLink = `/${props.username}`;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState(null);
  const [likeClicked, setLikeClicked] = useState(null)
  const [fakeLikeNumber, setFakeLikeNumber] = useState(props.likes) // This is a fake number, when a user adds a like to a post, it is going to be in db, but instead refreshing the data from db, i set this fake number for number of likes, which is the same as the real one.
  const isLoggedIn = !!localStorage.getItem("access_token");

  const checkForLikeButton = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (isLoggedIn) {
      await axiosInstance
        .get(`like/${props.tweetId}/check`)
        .then((res) => {
          if (res.status === 200) {
            setLikeOrDislike(<UnlikeButton likeId={res.data.id} likes={fakeLikeNumber} setFakeLikeNumber={setFakeLikeNumber} setLikeClicked={setLikeClicked} />);
          } else {
            throw res.status;
          }
        })
        .catch(() => {
          setLikeOrDislike(<LikeButton tweetId={props.tweetId} likes={fakeLikeNumber} setFakeLikeNumber={setFakeLikeNumber} setLikeClicked={setLikeClicked} />);
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
        <i className="fa fa-heart-o" onClick={() => navigate('/login')} />
        <p>{props.likes}</p>
      </div>
    );
  }

  const tweetDetailNavigateHandler = e => {
    if (e.target===e.currentTarget) navigate(`/tweets/${props.tweetId}`)
  }

  return (
    <div className={classes.tweet} onClick={tweetDetailNavigateHandler}>
      <div className={classes["tweet-left"]}>
        <img src={props.picture} alt="Profile" />
      </div>
      <div className={classes["tweet-right"]}>
        <div className={classes["tweet-right__top"]}>
          <div className={classes["user-info"]}>
            <a id={classes["user-name"]} href={userLink}>
              {props.fullname}
            </a>
            <a id={classes["username"]} href={userLink}>
              {props.username}
            </a>
            <a id={classes["tweet-dot"]} href="\">
              ·
            </a>{" "}
            {/* this is a link to the post */}
            <a id={classes["tweet__time-created"]} href="\">
              {props.timeCreated}
            </a>{" "}
            {/* this is a link to the post */}
          </div>
          <div className={classes.more}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classes["tweet-content"]}>{props.content}</div>
        <div className={classes["tweet-right__bottom"]}>
          <div>
            <i className="fa fa-reply" />
            <p>{props.reply}</p>
          </div>
          <div>
            <i className="fa fa-retweet" />
            <p>{props.retweet}</p>
          </div>
            {likeButton}
          <div>
            <i className="fa fa-upload" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
