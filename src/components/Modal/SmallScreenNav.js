import classes from "./SmallScreenNav.module.css";
import ProfilePicture from "../Tweet/default_profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { parseJwt } from "../../utils";
import * as ReactDOM from "react-dom";
import LoginLogoutBtn from "../LoginLogoutBtn";

const SmallScreenNav = (props) => {
  const navigate = useNavigate();

  const profileClickHandler = () => {
    if (!!localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
      const username = parseJwt(token).username;
      navigate(`/${username}`);
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
        <img src={ProfilePicture} alt="Profile" />
        <p id={classes.fullname}>Full Name</p>
        <p id={classes.username}>@username</p>
      </div>
      <div id={classes["follow-container"]}>
        <div className={classes.follow}>
          190 <span>Following</span>
        </div>
        <div className={classes.follow}>
          10 <span>Follower</span>
        </div>
      </div>
      <div id={classes["nav__links"]}>
        <NavLink to="/home" className={classes["nav__link"]}>
          <i className="fa fa-home"></i>
          <p>Home</p>
        </NavLink>
        <div style={{cursor: 'pointer'}} onClick={profileClickHandler} className={classes["nav__link"]}>
          <i className="far fa-user-circle"></i>
          <p>Profile</p>
        </div>
        <NavLink to="/explore" className={classes["nav__link"]}>
          <i className="fa fa-search"></i>
          <p>Explore</p>
        </NavLink>
        <NavLink to="/bookmarks" className={classes["nav__link"]}>
          <i className="fa fa-bookmark-o"></i>
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
