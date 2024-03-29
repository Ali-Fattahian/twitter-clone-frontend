import { useEffect, useState, useCallback, useContext } from "react";
import classes from "./YouMightLike.module.css";
import axios from "axios";
import SuggestedUser from "./SuggestedUser";
import { ServerContext } from "../store/server-context";
import axiosInstance from "../axiosInstance";

const YouMightLike = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const isLoggedIn = !!localStorage.getItem("authTokens");
  const [followWasSuc, setFollowWasSuc] = useState(null);
  const [follow, setFollow] = useState(null) // Completely useless, i have to make it, pass it down to follow btn because i did it in profile page and it is expected in follow btn component
  const { serverURL } = useContext(ServerContext)

  const getSuggestedUsers = useCallback(async () => {
    let response;
    if (!isLoggedIn) {
      response = await axios.get(`${serverURL}suggested-users`);
    } else {
      response = await axiosInstance.get(
        `${serverURL}suggested-users`
      );
    }
    if (response.status === 200) setSuggestedUsers(response.data);
  }, [isLoggedIn, serverURL]);

  useEffect(() => {
    getSuggestedUsers()
  }, [followWasSuc])

  return (
    <section className={classes["you-might-like"]}>
      <p>Who to follow</p>
      <div className={classes["suggested-users"]}>
        {suggestedUsers.length > 0 && suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} setFollowWasSuc={setFollowWasSuc} setFollow={setFollow} />
        ))}
        {suggestedUsers.length === 0 && <p style={{color:'black', textAlign:'center', fontWeight: 'bold'}}>No Suggested users</p>}
      </div>
    </section>
  );
};

export default YouMightLike;
