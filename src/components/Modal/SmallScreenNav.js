import classes from "./SmallScreenNav.module.css";
import ProfilePicture from "../Tweet/default_profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { parseJwt } from "../../utils";
import * as ReactDOM from "react-dom";
import LoginLogoutBtn from "../LoginLogoutBtn";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ServerContext } from "../../store/server-context";

const SmallScreenNav = (props) => {
  const navigate = useNavigate();
  let currentUsername;
  const [currentUserData, setCurrentUserData] = useState(null);
  const { serverURL } = useContext(ServerContext)

  const fetchUserData = async (username) => {
    await axios
      .get(`${serverURL}profiles/${username}`)
      .then((res) => {
        if (res.status === 200) setCurrentUserData(res.data);
      });
  };

  useEffect(() => {
    if (!!localStorage.getItem("authTokens")) {
      const token = localStorage.getItem("authTokens");
      currentUsername = parseJwt(token).username;
      fetchUserData(currentUsername);
    }
  }, []);

  const profileClickHandler = () => {
    if (currentUserData) {
      navigate(`/${currentUserData.username}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      id="modal"
      className={`${classes.modal} ${
        props.isMenuOpen ? classes["open-menu"] : ""
      }`}
    >
      <div id={classes["close-modal"]}>
        <p>Account info</p>
        <i className="fa fa-close" onClick={props.onCloseBtnClick}></i>
      </div>
      <div id={classes["account-info"]}>
        <img
          src={currentUserData ? currentUserData.picture : ProfilePicture}
          alt="Profile"
        />
        {currentUserData ? (
          <p id={classes.fullname} className={classes['real-name']} onClick={() => navigate(`/${currentUserData.username}`)}>
            {currentUserData.firstname} {currentUserData.lastname}
          </p>
        ) : (
          <p id={classes.fullname}>Anonymous User</p>
        )}
        {currentUserData ? (
          <p id={classes.username} className={classes['real-name']} onClick={() => navigate(`/${currentUserData.username}`)}>@{currentUserData.username}</p>
        ) : (
          <p id={classes.username}>@Unknown</p>
        )}
      </div>
      {currentUserData ? (
        <div id={classes["follow-container"]}>
          <div className={classes.follow} onClick={() => navigate(`/${currentUserData.username}/followings`)} style={{cursor: 'pointer'}}>
            {currentUserData.follows["followings_count"]} <span>Following</span>
          </div>
          <div className={classes.follow} onClick={() => navigate(`/${currentUserData.username}/followers`)} style={{cursor: 'pointer'}}>
            {currentUserData.follows["followers_count"]} <span>Follower</span>
          </div>
        </div>
      ) : (
        <div id={classes["follow-container"]}>
          <div className={classes.follow}>
            No <span>Following</span>
          </div>
          <div className={classes.follow}>
            No <span>Follower</span>
          </div>
        </div>
      )}
      <div id={classes["nav__links"]}>
        <NavLink to="/home" className={classes["nav__link"]}>
          <i className="fa fa-home" title="Home page"></i>
          <p>Home</p>
        </NavLink>
        <div
          style={{ cursor: "pointer" }}
          onClick={profileClickHandler}
          className={classes["nav__link"]}
        >
          <i className="far fa-user-circle" title="Profile page"></i>
          <p>Profile</p>
        </div>
        <NavLink to="/explore" className={classes["nav__link"]}>
          <i className="fa fa-search" title="Explore page"></i>
          <p>Explore</p>
        </NavLink>
        <NavLink to="/bookmarks" className={classes["nav__link"]}>
          <i className="fa fa-bookmark-o" title="Bookmarks Page"></i>
          <p>Bookmarks</p>
        </NavLink>
        <div className={classes["nav__link"]}>
          <LoginLogoutBtn text={true} />
        </div>
      </div>
    </section>
  );
};

ReactDOM.createPortal(SmallScreenNav, document.getElementById("root"));

export default SmallScreenNav;
