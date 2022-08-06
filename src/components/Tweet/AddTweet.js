import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./TweetStyle.module.css";
import ProfilePicture from "./default_profile.png";
import axiosInstance from "../../axios";
import { parseJwt } from "../../utils";

const AddTweet = (props) => {
  const tweetContent = useRef("");
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [currentUserPfp, setCurrentUserPfp] = useState(null);
  const [hasStartedLoadingPfp, setHasStartedLoadingPfp] = useState(false)
  const [hasfinishedLoadingPfp, setHasfinishedLoadingPfp] = useState(false)

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      if (tweetContent.current.value.trim().length > 0) {
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

  async function fetchCurrentUserData () {
    let username = parseJwt(localStorage.getItem('access_token')).username

    axiosInstance.get(`profiles/${username}`).then(res => {
      if (res.status === 200) {
        setCurrentUserPfp(res.data.picture)
      }
    })
  }

  async function sendData() {
    const response = await axiosInstance.post(
      "http://127.0.0.1:8000/api/compose/tweet",
      {
        content: tweetContent.current.value,
      }
    );

    if (response.status === 201) {
      tweetContent.current.value = "";
      return;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setHasStartedLoadingPfp(true)
      fetchCurrentUserData()
      setHasfinishedLoadingPfp(true)
    } else {
      setHasStartedLoadingPfp(true)
      setHasfinishedLoadingPfp(true)
    }
  }, [])

  return (
    <form
      id="add-tweet"
      className={classes["add-tweet__form"]}
      onSubmit={formSubmitHandler}
    >
      <div className={classes["add-tweet__upper"]}>
        {hasfinishedLoadingPfp && hasStartedLoadingPfp && <img
          className={classes["add-tweet__image"]}
          src={isLoggedIn && currentUserPfp ? currentUserPfp : ProfilePicture}
          alt="User profile"
          style={{objectFit: 'cover'}}
        />}
        <textarea
          className={classes["add-tweet__input"]}
          placeholder="What's happening?"
          ref={tweetContent}
        />
      </div>
      <div className={classes["add-tweet__lower"]}>
        <div className={classes["btn-container"]}>
          <button className="btn" type="submit">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTweet;
