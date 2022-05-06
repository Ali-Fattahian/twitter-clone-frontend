import ProfilePicture from "./Tweet/default_profile.png";
import FollowButton from './FollowButton';

import classes from './YouMightLike.module.css';

const SuggestedUser = props => {
  return (
    <div className={classes["suggested-user"]}>
      <div className={classes["suggested-user__left"]}>
        <img src={ProfilePicture} alt="profile" />
        <div className={classes["user-info"]}>
          <p id={classes["fullname"]}>{`${props.user.firstname} ${props.user.lastname}`}</p>
          <p id={classes["username"]}>@{props.user.username}</p>
        </div>
      </div>
      <div className={classes["suggested-user__right"]}>
        <FollowButton color="#fff" backgroundColor="#000" user={props.user} />
      </div>
    </div>
  );
};

export default SuggestedUser;
