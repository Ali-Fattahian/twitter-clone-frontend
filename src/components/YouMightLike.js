import { useEffect, useState, useCallback } from "react";
import classes from "./YouMightLike.module.css";
import ProfilePicture from "./Tweet/default_profile.png";
import FollowButton from "./FollowButton";
import axiosInstance from "../axios";
import axios from "axios";

const YouMightLike = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const isLoggedIn = !!localStorage.getItem("access_token");

  const getSuggestedUsers = useCallback(async () => {
    let response;
    if (!isLoggedIn) {
      response = await axios.get("http://127.0.0.1:8000/api/suggested-users");
    } else {
      response = await axiosInstance.get(
        "http://127.0.0.1:8000/api/suggested-users"
      );
    }
    if (response.status === 200) setSuggestedUsers(response.data);
  }, [isLoggedIn]);

  useEffect(() => {
    getSuggestedUsers()
  }, [getSuggestedUsers])

  return (
    <section className={classes["you-might-like"]}>
      <p>Who to follow</p>
      <div className={classes["suggested-users"]}>
        {suggestedUsers.map((user) => (
          <div className={classes["suggested-user"]}>
            <div className={classes["suggested-user__left"]}>
              <img src={ProfilePicture} alt="profile" />
              <div className={classes["user-info"]}>
                <p
                  id={classes["fullname"]}
                >{`${user.firstname} ${user.lastname}`}</p>
                <p id={classes["username"]}>@{user.username}</p>
              </div>
            </div>
            <div className={classes["suggested-user__right"]}>
              <FollowButton color="#fff" backgroundColor="#000" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YouMightLike;
