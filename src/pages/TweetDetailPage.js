import React, { useCallback, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import ProfilePicture from "../components/Tweet/default_profile.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import TweetDetail from "../components/Tweet/TweetDetail";
import dateTimeGenerator from "../utils";
import Picture from '../components/Tweet/default_profile.png';

const TweetDetailPage = (props) => {
  const [tweetDetail, setTweetDetail] = useState(null);
  const { tweetId } = useParams();

  const getTweets = useCallback(async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/tweets/${tweetId}`
    );

    if (response.status === 200) setTweetDetail(response.data);
  }, [tweetId]);

  useEffect(() => {
    getTweets();
  }, [getTweets]);

  return (
    <React.Fragment>
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
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default TweetDetailPage;
