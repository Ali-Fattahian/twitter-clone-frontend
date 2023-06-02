import { useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./TweetStyle.module.css";
import ProfilePicture from "./default_profile.png";
import { ServerContext } from "../../store/server-context";
import { AuthContext } from "../../store/auth-context";
import axiosInstance from "../../axiosInstance";

const AddTweet = (props) => {
  const tweetContent = useRef("");
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const { userData } = useContext(AuthContext)
  const { serverURL } = useContext(ServerContext);
  const [needToRefresh, setNeedToRefresh] = useState(null);

  useEffect(() => {}, [needToRefresh])

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      if (tweetContent.current.value.trim().length > 0) {
        sendData();
      }
    } else {
      props.setIsOverlayVisible(true)
      props.onError(
        <p>
          Please <Link to="/login">login</Link> before adding a tweet.
        </p>
      );
      setNeedToRefresh(Date.now());
    }
  };

  async function sendData() {
    const response = await axiosInstance.post(`${serverURL}compose/tweet`, {
      content: tweetContent.current.value,
    });

    if (response.status === 201) {
      tweetContent.current.value = "";
      return;
    }
  }

  return (
    <form
      id="add-tweet"
      className={classes["add-tweet__form"]}
      onSubmit={formSubmitHandler}
    >
      <div className={classes["add-tweet__upper"]}>
          <img
            className={classes["add-tweet__image"]}
            src={isLoggedIn && !!userData ? userData.picture : ProfilePicture}
            alt="User profile"
            style={{ objectFit: "cover" }}
          />
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
