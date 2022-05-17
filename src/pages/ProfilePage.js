import YouMightLike from "../components/YouMightLike";
import React from "react";
import TweetList from "../components/Tweet/TweetList";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Profile";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const [follow, setFollow] = useState(null)

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

  useEffect(() => {
    getProfile();
  }, [getProfile, follow]);

  return (
    <React.Fragment>
      <div className="main__middle-side">
        {!error && !isLoading && hasStarted && <Profile user={user} setFollow={setFollow} />}
        {hasStarted && error && (
          <section className="profile-not-found">
            <p>Sorry this profile doesn't exist.</p>
          </section>
        )}
        <TweetList isBookmarkPage={false} /> {/* shows the tweets from this account */}
      </div>
      <div className="main__right-side">
        <Searchbar />
        <YouMightLike />
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
