import React, { useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Reply.module.css";
import Profile from '../Tweet/default_profile.png'
import axiosInstance from "../../axios";

const AddReply = (props) => {
  const replyContent = useRef("");
  const isLoggedIn = !!localStorage.getItem("access_token");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      if (replyContent.current.value.trim().length > 0) {
        sendData();
      }
    } else {
      props.onError(
        <p>
          Please <Link to="/login">login</Link> before adding a tweet.
        </p>
      );
    }
  };



  async function sendData() {
    const response = await axiosInstance.post(`tweets/${props.tweetId}/reply`, {
      text: replyContent.current.value,
    });

    if (response.status === 201) {
      props.setNewReply(response.data.id)
      console.log("success");
      replyContent.current.value = "";
      return;
    }
    console.log(response);
  }

  return (
    <div className={classes["reply-section"]}>
      <div className={classes["close-reply__section"]}>
        <i class="fa fa-times" aria-hidden="true" onClick={() => props.hideReply()} style={{cursor: "pointer"}}></i>
      </div>
      <div className={classes["user__info"]}>
          <div className={classes['user-info__left']}>
              <img src={props.picture} alt='Profile' />
          </div>
          <div className={classes['user-info__right']}>
              <div className={classes['user__names']}>
                  <p id={classes['fullname']}>
                      {`${props.firstname} ${props.lastname}`}
                  </p>
                  <p id={classes['username']}>
                      {props.username}
                  </p>
                  <p>·</p>
                  <p id={classes['time-created']}>
                    {props.timeCreated}
                  </p>
              </div>
              <div className={classes['tweet-content']}>
                  {props.content}
              </div>
          </div>
      </div>
      <form
        id="add-reply"
        className={classes["add-reply__form"]}
        onSubmit={formSubmitHandler}
      >
        <div className={classes["add-reply__upper"]}>
          <img
            className={classes["add-reply__image"]}
            src={Profile}
            alt="Default profile"
          />
          <textarea
            className={classes["add-reply__input"]}
            placeholder="Tweet your reply"
            ref={replyContent}
          />
        </div>
        <div className={classes["add-reply__lower"]}>
          <div className={classes["btn-container"]}>
            <button className="btn" type="submit">
              Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReply;
