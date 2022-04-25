import classes from './Navigation.module.css'

const Navigation = () => {
  return (
    <section className={classes["nav-container"]}>
      <nav className={classes.nav}>
      <div className={classes["nav__item"]} id={classes['twitter-icon']}>
          <i class="fa fa-twitter"></i>
        </div>  
        <div className={classes["nav__item"]}>
          <i class="fa fa-home"></i>
          <p>Home</p>
        </div>
        <div className={classes["nav__item"]}>
          <i class="fa fa-hashtag"></i>
          <p>Explore</p>
        </div>
        <div className={classes["nav__item"]}>
          <i class="fa fa-envelope-o"></i>
          <p>Messages</p>
        </div>
        <div className={classes["nav__item"]}>
          <i class="fa fa-bookmark-o"></i>
          <p>Bookmarks</p>
        </div>
        <div className={classes["nav__item"]}>
          <i class="far fa-user-circle"></i>
          <p>Profile</p>
        </div>
        <div className={classes['nav__item']} id={classes['nav__tweet']}>
            <button className='btn'>Tweet</button>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
