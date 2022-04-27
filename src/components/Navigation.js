import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <section className={`${classes["nav-container"]} main__left-side`}>
      <nav className={classes.nav}>
        <NavLink to="/" className={classes["nav__item"]} id={classes['twitter-icon']}>
          <i class="fa fa-twitter"></i>
        </NavLink>
        <NavLink
          to="/"
          className={classes['nav__item']}
          >
          <i class="fa fa-home"></i>
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/explore"
          className={classes['nav__item']}
        >
          <i class="fa fa-hashtag"></i>
          <p>Explore</p>
        </NavLink>
        {/* <NavLink to='/' className={classes["nav__item"]}>
          <i class="fa fa-envelope-o"></i>
          <p>Messages</p>
        </NavLink> */}
        <NavLink
          to="/bookmarks"
          className={classes['nav__item']}>
          <i class="fa fa-bookmark-o"></i>
          <p>Bookmarks</p>
        </NavLink>
        <NavLink
          to="/:username"
          className={classes['nav__item']}
        >
          <i class="far fa-user-circle"></i>
          <p>Profile</p>
        </NavLink>
        <div className={classes["nav__item"]} id={classes["nav__tweet"]}>
          <button className="btn">Tweet</button>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
