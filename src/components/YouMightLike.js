import classes from "./YouMightLike.module.css";
import ProfilePicture from "./Tweet/default_profile.png";

const YouMightLike = () => {
  return (
    <section className={classes["you-might-like"]}>
      <p>Who to follow</p>
      <div className={classes["suggested-users"]}>
        <div className={classes["suggested-user"]}>
          <div className={classes["suggested-user__left"]}>
            <img src={ProfilePicture} alt="profile" />
            <div className={classes["user-info"]}>
              <p id={classes["fullname"]}>Some Dude</p>
              <p id={classes["username"]}>@some_dude</p>
            </div>
          </div>
          <div className={classes["suggested-user__right"]}>
            <button className="btn">Follow</button>
          </div>
        </div>
        <div className={classes["suggested-user"]}>
          <div className={classes["suggested-user__left"]}>
            <img src={ProfilePicture} alt="profile" />
            <div className={classes["user-info"]}>
              <p id={classes["fullname"]}>Some Dude</p>
              <p id={classes["username"]}>@some_dude</p>
            </div>
          </div>
          <div className={classes["suggested-user__right"]}>
            <button className="btn">Follow</button>
          </div>
        </div>
        <div className={classes["suggested-user"]}>
          <div className={classes["suggested-user__left"]}>
            <img src={ProfilePicture} alt="profile" />
            <div className={classes["user-info"]}>
              <p id={classes["fullname"]}>Some Dude</p>
              <p id={classes["username"]}>@some_dude</p>
            </div>
          </div>
          <div className={classes["suggested-user__right"]}>
            <button className="btn">Follow</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouMightLike;
