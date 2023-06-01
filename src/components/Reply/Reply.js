import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Reply.module.css";

const Reply = (props) => {
  const navigate = useNavigate();
  const navigateToProfileHandler = () => navigate(`/get-profile/${props.username}`);

  return (
    <div className={classes["reply"]}>
      <div className={classes["reply-left"]}>
        <img src={props.profilePicture} alt={props.fullname} />
      </div>
      <div className={classes["reply-right"]}>
        <div className={classes["reply__user"]}>
          <div className={classes["user__names"]}>
            <p
              onClick={navigateToProfileHandler}
              id={classes.fullname}
              className={classes["link--underline"]}
            >
              {props.fullname}
            </p>
            <p
              onClick={navigateToProfileHandler}
              className={classes["link--underline"]}
            >
              {props.username}
            </p>
            <p>· {props.timeCreated}</p>
          </div>
        </div>
        <div className={classes["reply-content"]}>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
