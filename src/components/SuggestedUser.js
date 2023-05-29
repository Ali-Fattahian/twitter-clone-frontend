import ProfilePicture from "./Tweet/default_profile.png";
import FollowButton from "./FollowButton";
import classes from "./YouMightLike.module.css";

const SuggestedUser = (props) => {
  return (
    <div className={classes["suggested-user"]}>
      <div className={classes["suggested-user__left"]}>
        <img src={ProfilePicture} alt="profile" />
        <a className={classes["user-info"]} href={`/${props.user.username}`}>
          <p
            id={classes["fullname"]}
          >{`${props.user.firstname} ${props.user.lastname}`}</p>
          <p id={classes["username"]}>@{props.user.username}</p>
        </a>
      </div>
      <div className={classes["suggested-user__right"]}>
        <FollowButton
          color="#fff"
          backgroundColor="#000"
          user={props.user}
          setFollowWasSuc={props.setFollowWasSuc}
          setFollow={props.setFollow}
        />
      </div>
    </div>
  );
};

export default SuggestedUser;
