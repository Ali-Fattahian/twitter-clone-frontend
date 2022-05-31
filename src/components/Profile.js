import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FollowButton from "./FollowButton";
import classes from "./Profile.module.css";
import dateTimeGenerator from "../utils";
import { parseJwt } from "../utils";
import axiosInstance from "../axios";
import UnfollowButton from "./UnfollowButton";

const Profile = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [followOrEdit, setFollowOrEdit] = useState(null);

  const checkForButton = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);
    if (!!localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
      const username = parseJwt(token).username;
      if (username === props.user.username) {
        setFollowOrEdit(<button className="btn" onClick={() => navigate(`/edit/${username}`)}>Edit profile</button>);
      } else {
        await axiosInstance
          .get(`follow/${props.user.username}/check`)
          .then((res) => {
            if (res.status === 200) {
              setFollowOrEdit(<UnfollowButton unfollowId={res.data.id} setFollow={props.setFollow} />)
            } else {
              throw res.status
            }}
          ).catch(() => {
            setFollowOrEdit(<FollowButton user={props.user} setFollow={props.setFollow} />)
          });
      }
    }
    setIsLoading(false);
  }, [props.user, props.setFollow, navigate]);

  useEffect(() => {
    checkForButton();
  }, [checkForButton]);

  return (
    <section className={classes.profile}>
      <div className={classes["profile__top"]}>
        <div className={classes["profile__top-left"]}>
          <div id={classes.icon}>
            <i className="fa fa-chevron-left" onClick={() => navigate(-1)}></i>
          </div>
          <div>
            <h3>{`${props.user.firstname} ${props.user.lastname}`}</h3>
            <p>{props.user.tweet_number} Tweets</p>
          </div>
        </div>
        <div></div>
      </div>
      <img src={props.user.background_picture} alt="header" />
      <div className={classes["profile__bottom"]}>
        <div className={classes["profile__bottom-middle"]}>
          <img src={props.user.picture} alt="profile" />
          {!isLoading && hasStarted && followOrEdit}
        </div>
        <div className={classes["profile__bottom-bottom"]}>
          <div className={classes["user-info"]}>
            <h3>{`${props.user.firstname} ${props.user.lastname}`}</h3>
            <p>@{props.user.username}</p>
          </div>
          <div className={classes["user-bio"]}>
            <p>{props.user.bio}</p>
          </div>
          <p className={classes["user-date-joined"]}>
            Joined{" "}
            {dateTimeGenerator(
              props.user.date_joined.date_joined_ago,
              props.user.date_joined.date_joined
            )}
          </p>
          <div className={classes.follow}>
            <div className={classes["user-follow"]} onClick={() => navigate(`/${props.user.username}/following`)}>
              <span>{props.user.follows.followings_count}</span>
              <p id={classes["user-follow__text"]}>Following</p>
            </div>
            <div className={classes["user-follow"]} onClick={() => navigate(`/${props.user.username}/followers`)}>
              <span>{props.user.follows.followers_count}</span>
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
