import React, { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import classes from "./FollowPage.module.css";
import YouMightLike from "../components/YouMightLike";
import ProfileList from "../components/ProfileList";
import Searchbar from "../components/Searchbar";
import Overlay from "../components/Modal/Overlay";
import axios from "axios";
import axiosInstance from "../axios";

const UserFollowings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();
  const { username } = useParams();
  const [refreshFollow, setRefreshFollow] = useState(null)

  const getProfile = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!isLoggedIn) {
      await axios
        .get(`http://127.0.0.1:8000/api/profiles/${username}/followers`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }

    if (isLoggedIn) {
      await axiosInstance
        .get(`profiles/${username}/followers`)
        .then((res) => setProfiles(res.data))
        .catch((err) => setError(err));
    }
    setIsLoading(false);
  }, [isLoggedIn, username, setHasStarted]);

  const onOverlayClick = () => {
    props.onMenuClick()
  }

  useEffect(() => {
    getProfile();
  }, [getProfile, refreshFollow]);

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? <Overlay onOverlayClick={onOverlayClick} isVisible={true} /> : <Overlay onOverlayClick={onOverlayClick} isVisible={false} />}
      <div className="main__middle-side">
        <div className={classes["middle-top__section"]}>
          <div className={classes["user-info__section"]}>
            <div>
              <div id={classes.icon}>
                <i
                  className="fa fa-chevron-left"
                  onClick={() => navigate(`/${username}`)}
                ></i>
              </div>
              {/* <div className={classes["user-info"]}>
                <p id={classes["user__fullname"]}>Fullname</p>
                <p id={classes["user__username"]}>@Username</p>
              </div> */}
            </div>
          </div>
          <div className={classes["switch-follows__section"]}>
            <NavLink
              className={classes["switch-follow"]}
              to={`/${username}/followers`}
              style={({ isActive }) =>
                isActive ? { color: "#000" } : {color: "#536471"}
              }
            >
              Followers
            </NavLink>
            <NavLink
              className={classes["switch-follow"]}
              to={`/${username}/followings`}
              style={({ isActive }) =>
                isActive ? { color: "#000" } : {color: "#536471"}
              }
            >
              Following
            </NavLink>
          </div>
        </div>
        {!isLoading && !error && hasStarted && (
          <ProfileList profiles={profiles} pageName='followers' setRefreshFollow={setRefreshFollow} />
        )}
        {hasStarted && !error && !isLoading && profiles.length === 0 && (
          <section className={classes["has-error"]}>
            <p
            className="p-info--center"
            >
              This user doesn't have any followers.
            </p>
          </section>
        )}
        {hasStarted && error && (
          <section className={classes["has-error"]}>
            <p
              className="p-info--center"
              style={{
                margin: "0"
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
