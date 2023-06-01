import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import classes from "./FollowPage.module.css";
import YouMightLike from "../components/YouMightLike";
import ProfileList from "../components/ProfileList";
import Searchbar from "../components/Searchbar";
import Overlay from "../components/Modal/Overlay";
import axios from "axios";
import useAxios from "../useAxios";
import { ServerContext } from "../store/server-context";

const UserFollowings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const { serverURL } = useContext(ServerContext);

  const isLoggedIn = !!localStorage.getItem("authTokens");
  const { username } = useParams();
  const [refreshFollow, setRefreshFollow] = useState(null);
  const api = useAxios();

  const getProfile = async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!isLoggedIn) {
      await axios
        .get(`${serverURL}profiles/${username}/followers`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }

    if (isLoggedIn) {
      await api
        .get(`profiles/${username}/followers`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }
    setIsLoading(false);
  };

  const onOverlayClick = () => {
    props.onMenuClick();
  };

  useEffect(() => {
    getProfile();
  }, [refreshFollow]);

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
                <a href={`#/get-profile/${username}`}>{username}</a>
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
            pageName="followers"
            setRefreshFollow={setRefreshFollow}
          />
        )}
        {hasStarted && !error && !isLoading && profiles.length === 0 && (
          <section className={classes["has-error"]}>
            <p className="p-info--center">
              This user doesn't have any followers.
            </p>
          </section>
        )}
        {hasStarted && error && (
          <section className={classes["has-error"]}>
            <p
              className="p-info--center"
              style={{
                margin: "0",
              }}
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
