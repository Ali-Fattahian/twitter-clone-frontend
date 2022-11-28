import React, { useState, useCallback, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import classes from "./FollowPage.module.css";
import YouMightLike from "../components/YouMightLike";
import ProfileList from "../components/ProfileList";
import Searchbar from "../components/Searchbar";
import Overlay from "../components/Modal/Overlay";

import axios from "axios";
import axiosInstance from "../axios";
import { ServerContext } from "../store/server-context";

const UserFollowings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [refreshFollow, setRefreshFollow] = useState(null);
  const { serverURL } = useContext(ServerContext)

  const isLoggedIn = !!localStorage.getItem("access_token");
  const { username } = useParams();

  const getProfile = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!isLoggedIn) {
      await axios
        .get(`${serverURL}profiles/${username}/followings`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }

    if (isLoggedIn) {
      await axiosInstance
        .get(`profiles/${username}/followings`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }
    setIsLoading(false);
  }, [isLoggedIn, username, setHasStarted]);

  const onOverlayClick = () => {
    props.onMenuClick();
  };

  useEffect(() => {
    getProfile();
  }, [getProfile, refreshFollow]);

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? (
        <Overlay onOverlayClick={onOverlayClick} isVisible={true} />
      ) : (
        <Overlay onOverlayClick={onOverlayClick} isVisible={false} />
      )}
      <div className="main__middle-side">
        <div className={classes["middle-top__section"]}>
          <div className={classes["user-info__section"]}>
            <section className={classes["top-navigation"]}>
              <div
                id={classes["ham-menu__btn"]}
                className="ham-menu__btn"
                onClick={props.onMenuClick}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes["top-navigation__username"]}>
                <a href={`/${username}`}>{username} profile</a>
              </div>
            </section>
          </div>
          <div className={classes["switch-follows__section"]}>
            <NavLink
              className={classes["switch-follow"]}
              to={`/${username}/followers`}
              style={({ isActive }) =>
                isActive ? { color: "#000" } : { color: "#536471" }
              }
            >
              Followers
            </NavLink>
            <NavLink
              className={classes["switch-follow"]}
              to={`/${username}/followings`}
              style={({ isActive }) =>
                isActive ? { color: "#000" } : { color: "#536471" }
              }
            >
              Following
            </NavLink>
          </div>
        </div>
        {!isLoading && !error && hasStarted && (
          <ProfileList
            profiles={profiles}
            pageName="followings"
            setRefreshFollow={setRefreshFollow}
          />
        )}
        {hasStarted && !error && !isLoading && profiles.length === 0 && (
          <section className={classes["has-error"]}>
            <p className="p-info--center">No following users yet!</p>
          </section>
        )}
        {hasStarted && error && (
          <section className={classes["has-error"]}>
            <p
              style={{
                margin: "0",
              }}
              className="p-info--center"
            >
              Sorry this profile doesn't exist.
            </p>
          </section>
        )}
      </div>
      <div className="main__right-side">
        <Searchbar />
        <YouMightLike />
      </div>
    </React.Fragment>
  );
};

export default UserFollowings;
