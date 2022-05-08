import ProfilePicture from "./Tweet/default_profile.png";
import FollowButton from './FollowButton';

import classes from './YouMightLike.module.css';
import { useNavigate } from "react-router-dom";

const SuggestedUser = props => {
  const navigate = useNavigate()

  const profileClickHandler = () => navigate(`/${props.user.username}`)

  return (
    <div className={classes["suggested-user"]} onClick={profileClickHandler}>
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
