import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import classes from "./TweetStyle.module.css";
import ProfilePicture from "./default_profile.png";
import useAxios from "../../useAxios";
import { parseJwt } from "../../utils";
import { ServerContext } from "../../store/server-context";

const AddTweet = (props) => {
  const tweetContent = useRef("");
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const [currentUserPfp, setCurrentUserPfp] = useState(null);
  const [hasStartedLoadingPfp, setHasStartedLoadingPfp] = useState(false);
  const [hasfinishedLoadingPfp, setHasfinishedLoadingPfp] = useState(false);
  const { serverURL } = useContext(ServerContext);
  const [needToRefresh, setNeedToRefresh] = useState(null);
  const api = useAxios();

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
      setNeedToRefresh(Date.now());
    }
  };

  const fetchCurrentUserData = useCallback(async () => {
    let username = parseJwt(localStorage.getItem("authTokens")).username;

    api.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setCurrentUserPfp(res.data.picture);
      }
    });
  }, [api]);

  async function sendData() {
    const response = await api.post(`${serverURL}compose/tweet`, {
      content: tweetContent.current.value,
    });

    if (response.status === 201) {
      tweetContent.current.value = "";
      return;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setHasStartedLoadingPfp(true);
      fetchCurrentUserData();
      setHasfinishedLoadingPfp(true);
    } else {
      setHasStartedLoadingPfp(true);
      setHasfinishedLoadingPfp(true);
    }
  }, [isLoggedIn, needToRefresh, fetchCurrentUserData]);

  return (
    <form
      id="add-tweet"
      className={classes["add-tweet__form"]}
      onSubmit={formSubmitHandler}
    >
      <div className={classes["add-tweet__upper"]}>
        {hasfinishedLoadingPfp && hasStartedLoadingPfp && (
          <img
            className={classes["add-tweet__image"]}
            src={isLoggedIn && currentUserPfp ? currentUserPfp : ProfilePicture}
            alt="User profile"
            style={{ objectFit: "cover" }}
          />
        )}
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
