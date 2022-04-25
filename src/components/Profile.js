import classes from "./Profile.module.css";
import ProfilePicture from "./Tweet/default_profile.png";

const Profile = () => {
  return (
    <section className={classes.profile}>
      <div className={classes["profile__top"]}>
        <div className={classes["profile__top-left"]}></div>
        <div></div>
      </div>
      <img src={ProfilePicture} alt="header" />
      <div className={classes["profile__bottom"]}>
        <div className={classes["profile__bottom-middle"]}>
          <img src={ProfilePicture} alt='profile' />
          <button className="btn">Follow</button>
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
          <div className={classes["user-follow"]}>
            <span>193</span>
            <span id={classes["user-follow__text"]}>Following</span>
          </div>
          <div className={classes["user-follow"]}>
            <span>842</span>
            <span id={classes["user-follow__text"]}>Following</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
