import { useEffect, useState, useCallback } from "react";
import classes from "./YouMightLike.module.css";
import axiosInstance from "../axios";
import axios from "axios";
import SuggestedUser from "./SuggestedUser";

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
          <SuggestedUser user={user} key={user.id} />
        ))}
      </div>
    </section>
  );
};

export default YouMightLike;
