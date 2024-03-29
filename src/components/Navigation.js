import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navigation.module.css";
import LoginLogoutBtn from "./LoginLogoutBtn";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const Navigation = (props) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const profileClickHandler = () => {
    if (!!localStorage.getItem('authTokens')) {
      navigate(`get-profile/${user.username}`)
    } else {
      navigate('/login');
    }
  }

  return (
    <section className={`${classes["nav-container"]} main__left-side`}>
      <nav className={classes.nav}>
        <NavLink to="/" className={classes["nav__item"]} id={classes['twitter-icon']}>
          <i className="fa fa-twitter"></i>
        </NavLink>
        <NavLink
          to="/"
          className={classes['nav__item']}
          >
          <i className="fa fa-home" title="Home page"></i>
          <p>Home</p>
        </NavLink>
        <NavLink
          to="explore"
          className={classes['nav__item']}
        >
          <i className="fa fa-hashtag" title="Explore page"></i>
          <p>Explore</p>
        </NavLink>
        {/* <NavLink to='/' className={classes["nav__item"]}>
          <i className="fa fa-envelope-o"></i>
          <p>Messages</p>
        </NavLink> */}
        <NavLink
          to="/bookmarks"
          className={classes['nav__item']}>
          <i className="fa fa-bookmark-o" title="Bookmarks page"></i>
          <p>Bookmarks</p>
        </NavLink>
        <div
          onClick={profileClickHandler}
          to="/get-profile/:username"
          className={classes['nav__item']}
        >
          <i className="far fa-user-circle" title="Profile page"></i>
          <p>Profile</p>
        </div>
        <div className={classes["nav__item"]} id={classes["nav__tweet"]} onClick={props.onAddTweetFormClick}>
          <button className="btn">Tweet</button>
          <i id={classes['add-tweet-icon']} className="fas fa-plus" title="Add a tweet"></i> 
        </div>
        <div className={classes["nav__item"]}>
          <LoginLogoutBtn setRefreshHomePageOnAuthChange={props.setRefreshHomePageOnAuthChange} text={true} />
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
