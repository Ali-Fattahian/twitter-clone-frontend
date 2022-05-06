import FollowButton from "./FollowButton";
import classes from "./Profile.module.css";
import ProfilePicture from "./Tweet/default_profile.png";

const Profile = () => {
  return (
    <section className={classes.profile}>
      <div className={classes["profile__top"]}>
        <div className={classes["profile__top-left"]}>
          <div id={classes.icon}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div>
            <h3>Full Name</h3>
            <p>1200 Tweets</p>
          </div>
        </div>
        <div></div>
      </div>
      <img src={ProfilePicture} alt="header" />
      <div className={classes["profile__bottom"]}>
        <div className={classes["profile__bottom-middle"]}>
          <img src={ProfilePicture} alt="profile" />
          <FollowButton />
        </div>
        <div className={classes["profile__bottom-bottom"]}>
          <div className={classes["user-info"]}>
            <h3>Some Guy Fullname</h3>
            <p>@some_guy_username</p>
          </div>
          <div className={classes["user-bio"]}>
            <p>
              Managing Partner,Master Ventures Institutional Inv. Mgmt.(MVIM),
              Advisor, Former Sell-Side Analyst, Dot-com CEO MBA Grad #Bitcoin
              #Binance #Polkadot #Solana🇺🇸
            </p>
          </div>
          <p className={classes["user-date-joined"]}>Joined November 2017</p>
          <div className={classes.follow}>
            <div className={classes["user-follow"]}>
              <span>193</span>
              <p id={classes["user-follow__text"]}>Following</p>
            </div>
            <div className={classes["user-follow"]}>
              <span>842</span>
              <p id={classes["user-follow__text"]}>Followers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Images should be a link to the image
// Fullname at the top and the tweet count are links to the profile page
// Follow button is Following turns into Unfollow (red) (244, 33, 46) on hover. at least in dark mode.
// For not followings, it is a Follow text (black color) and (#eff3f4) background and gets a little darker on hover.
// Following and Follower number at the bottom show real peaple
// Follow button text turns into 'Edit profile' for the users profile 

export default Profile;
