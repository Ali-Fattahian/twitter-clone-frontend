import classes from "./SmallScreenNav.module.css";
import ProfilePicture from "../Tweet/default_profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { parseJwt } from "../../utils";
import * as ReactDOM from "react-dom";
import LoginLogoutBtn from "../LoginLogoutBtn";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const SmallScreenNav = (props) => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext)

  const profileClickHandler = () => {
    if (!!userData) {
      navigate(`/${userData.username}`);
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
          src={!!userData ? userData.picture : ProfilePicture}
          alt="Profile"
        />
        {!!userData ? (
          <p id={classes.fullname} className={classes['real-name']} onClick={() => navigate(`/${userData.username}`)}>
            {userData.firstname} {userData.lastname}
          </p>
        ) : (
          <p id={classes.fullname}>Anonymous User</p>
        )}
        {!!userData ? (
          <p id={classes.username} className={classes['real-name']} onClick={() => navigate(`/${userData.username}`)}>@{userData.username}</p>
        ) : (
          <p id={classes.username}>@Unknown</p>
        )}
      </div>
      {!!userData ? (
        <div id={classes["follow-container"]}>
          <div className={classes.follow} onClick={() => navigate(`/${userData.username}/followings`)} style={{cursor: 'pointer'}}>
            {userData.follows["followings_count"]} <span>Following</span>
          </div>
          <div className={classes.follow} onClick={() => navigate(`/${userData.username}/followers`)} style={{cursor: 'pointer'}}>
            {userData.follows["followers_count"]} <span>Follower</span>
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
