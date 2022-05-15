import React, { useCallback, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import ProfilePicture from "../components/Tweet/default_profile.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import TweetDetail from "../components/Tweet/TweetDetail";
import dateTimeGenerator from "../utils";
import Picture from "../components/Tweet/default_profile.png";
import AddReply from "../components/AddReply";
import ErrorMessage from "../components/Modal/ErrorMessage";
import Overlay from "../components/Modal/Overlay";

const TweetDetailPage = (props) => {
  const [tweetDetail, setTweetDetail] = useState(null);
  const { tweetId } = useParams();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isReplyVisible, setIsReplyVisible] = useState(false);

  const getTweets = useCallback(async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/tweets/${tweetId}`
    );

    if (response.status === 200) setTweetDetail(response.data);
  }, [tweetId]);

  useEffect(() => {
    getTweets();
  }, [getTweets]);

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
        {tweetDetail ? (
          <TweetDetail
            tweetId={tweetId}
            picture={Picture}
            content={tweetDetail.content}
            username={tweetDetail.user}
            firstname={tweetDetail.firstname}
            lastname={tweetDetail.lastname}
            likes={tweetDetail.likes.length}
            timeCreated={dateTimeGenerator(
              tweetDetail.date_created.created_ago,
              tweetDetail.date_created.created
            )}
            showReply={showReply}
          />
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#71767b",
              marginTop: "1.5rem",
            }}
          >
            This tweet doesn't exist.
          </p>
        )}
        {tweetDetail && (
          <div
            id="add-reply__container"
            className="add-reply__container hidden"
          >
            <AddReply
              onError={showErrorMessageHandler}
              tweetId={tweetId}
              username={tweetDetail.user}
              firstname={tweetDetail.firstname}
              lastname={tweetDetail.lastname}
              timeCreated={dateTimeGenerator(
                tweetDetail.date_created.created_ago,
                tweetDetail.date_created.created
              )}
              picture={Picture}
              content={tweetDetail.content}
              hideReply={hideReply}
            />
          </div>
        )}
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default TweetDetailPage;
