import YouMightLike from "../components/YouMightLike";
import React, { useContext } from "react";
import TweetList from "../components/Tweet/TweetList";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Profile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ServerContext } from "../store/server-context";
import axiosInstance from "../axiosInstance";

const ProfilePage = (props) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const [follow, setFollow] = useState(null);
  const [profileTweets, setProfileTweets] = useState([]);
  const [tweetsIsLoading, setTweetsIsLoading] = useState(false);
  const [tweetsHasStarted, setTweetHasStarted] = useState(false);
  const [tweetsHasError, setTweetsHasError] = useState(false);
  const { serverURL } = useContext(ServerContext)

  const getProfile = async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!isLoggedIn) {
      await axios
        .get(`${serverURL}profiles/${username}`)
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
  };

  const onOverlayClick = () => {
    props.onMenuClick()
  }

  const getTweets = async () => {
    setTweetHasStarted(true);
    setTweetsIsLoading(true);
    await axios
      .get(`${serverURL}profiles/${username}/tweets`)
      .then((res) => {
        if (res.status === 200) {
          setProfileTweets(res.data);
        }
      })
      .catch(() => setTweetsHasError(true));
    setTweetsIsLoading(false);
  };

  useEffect(() => {
    getProfile();
    getTweets();
  }, [follow, username]);

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
