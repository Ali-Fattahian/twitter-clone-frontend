import classes from "./Profile.module.css";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import UnfollowButton from "./UnfollowButton";
import axiosInstance from "../axios";
import { useEffect, useState } from "react";

const SmallProfile = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");
    const [hasStarted, setHasStarted] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const [hasFollowed, setHasFollowed] = useState(false)
  useEffect(() => {
    if (isLoggedIn) {
      setHasStarted(true)
      axiosInstance.get(`follow/${props.username}/check`).then((res) => {
        if (res.status === 200) setHasFollowed(true); // Something Truthy
      });
      setHasFinished(true)
    } else {
        setHasStarted(true)
        setHasFinished(true)
    }
  }, []);

  return (
    <div
      className={classes["small-profile__section"]}
      onClick={() => {
        navigate(`/${props.username}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className={classes["small-profile__left-part"]}>
        <img src={props.picture} alt="Profile" />
      </div>
      <div className={classes["small-profile__right-part"]}>
        <div className={classes["small-profile__right-top"]}>
          <div className={classes["small-profile__user-name"]}>
            <p
              id={classes["small-profile__fullname"]}
            >{`${props.firstname} ${props.lastname}`}</p>
            <p id={classes["small-profile__username"]}>@{props.username}</p>
          </div>
          {hasFinished && hasStarted && hasFollowed ? (
            <UnfollowButton
              setFollow={props.setRefreshFollow}
              pageName={props.pageName}
              username={props.username}
            ></UnfollowButton>
          ) : (
            <FollowButton
              setFollow={props.setRefreshFollow}
              setFollowWasSuc={props.setRefreshFollow}
              user={props.profile}
              backgroundColor="#000"
              color="#fff"
            />
          )}
        </div>
        <div className={classes["small-profile__right-bottom"]}>
          <p>{props.bio.split(" ").slice(0, 14).join(" ").trim()}</p>{" "}
          {/* Show the first 14 words */}
        </div>
      </div>
    </div>
  );
};

export default SmallProfile;
