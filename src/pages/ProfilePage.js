import YouMightLike from "../components/YouMightLike";
import React from "react";
import TweetList from "../components/Tweet/TweetList";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Profile";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";

const ProfilePage = (props) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const [follow, setFollow] = useState(null);
  const [profileTweets, setProfileTweets] = useState([]);
  const [tweetsIsLoading, setTweetsIsLoading] = useState(false);
  const [tweetsHasStarted, setTweetHasStarted] = useState(false);
  const [tweetsHasError, setTweetsHasError] = useState(false);

  const getProfile = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!isLoggedIn) {
      await axios
        .get(`http://127.0.0.1:8000/api/profiles/${username}`)
        .then((res) => setUser(res.data))
        .catch((err) => setError(err));
    }

    if (isLoggedIn) {
      await axiosInstance
        .get(`profiles/${username}`)
        .then((res) => setUser(res.data))
        .catch((err) => setError(err));
    }
    setIsLoading(false);
  }, [isLoggedIn, username]);

  const onOverlayClick = () => {
    props.onMenuClick()
  }

  const getTweets = useCallback(async () => {
    setTweetHasStarted(true);
    setTweetsIsLoading(true);
    await axios
      .get(`http://127.0.0.1:8000/api/profiles/${username}/tweets`)
      .then((res) => {
        if (res.status === 200) {
          setProfileTweets(res.data);
        }
      })
      .catch(() => setTweetsHasError(true));
    setTweetsIsLoading(false);
  }, [username]);

  useEffect(() => {
    getProfile();
    getTweets();
  }, [getProfile, follow, getTweets]);

  return (
    <React.Fragment>
      <div className="main__middle-side">
        {!error && !isLoading && hasStarted && (
          <Profile user={user} setFollow={setFollow} isMenuOpen={props.isMenuOpen} onOverlayClick={onOverlayClick} onMenuClick={props.onMenuClick} />
        )}
        {hasStarted && error && (
          <section className="profile-not-found">
            <p className="p-info--center" style={{marginTop: '0'}}>Sorry this profile doesn't exist.</p>
          </section>
        )}
        {tweetsHasStarted && !tweetsIsLoading && !tweetsHasError && (
          <TweetList isBookmarkPage={false} tweetList={profileTweets} />
        )}
        {tweetsHasStarted &&
          !tweetsIsLoading &&
          !tweetsHasError &&
          profileTweets.length === 0 && (
            <p className="p-info--center"
            >No tweets from this profile yet!</p>
          )}
      </div>
      <div className="main__right-side">
        <Searchbar />
        <YouMightLike />
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
