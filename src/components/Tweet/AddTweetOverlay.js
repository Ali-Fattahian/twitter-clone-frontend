import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./TweetStyle.module.css";
import ProfilePicture from "./default_profile.png";
import axiosInstance from "../../axios";
import { parseJwt } from "../../utils";
import { ServerContext } from "../../store/server-context";

const AddTweetOverlay = (props) => {
  const tweetContent = useRef("");
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [currentUserPfp, setCurrentUserPfp] = useState(null);
  const [hasStartedLoadingPfp, setHasStartedLoadingPfp] = useState(false);
  const [hasfinishedLoadingPfp, setHasfinishedLoadingPfp] = useState(false);
  const { serverURL } = useContext(ServerContext)

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

  async function fetchCurrentUserData() {
    let username = parseJwt(localStorage.getItem("access_token")).username;

    axiosInstance.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setCurrentUserPfp(res.data.picture);
      }
    });
  }

  async function sendData() {
    const response = await axiosInstance.post(
      `${serverURL}compose/tweet`,
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
      setHasStartedLoadingPfp(true);
      fetchCurrentUserData();
      setHasfinishedLoadingPfp(true);
    } else {
      setHasStartedLoadingPfp(true);
      setHasfinishedLoadingPfp(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="add-tweet__container">
      <form className="add-tweet" onSubmit={formSubmitHandler}>
        <div className="add-tweet__section">
          <i onClick={props.closeAddTweetHandler} className="fa fa-close"></i>
        </div>
        <div className="add-tweet__section" id="add-tweet__input">
          {hasfinishedLoadingPfp && hasStartedLoadingPfp && (
            <img
              className={classes["add-tweet__image"]}
              src={
                isLoggedIn && currentUserPfp ? currentUserPfp : ProfilePicture
              }
              alt="User profile"
              style={{ objectFit: "cover" }}
            />
          )}
          <textarea
            name="tweet-content"
            placeholder="What's happening?"
            ref={tweetContent}
          />
        </div>
        <div className="add-tweet__section" id="add-tweet__btn">
          <button type="submit" className="btn">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTweetOverlay;
