import YouMightLike from "../components/YouMightLike";
import Navigation from "../components/Navigation";
import TweetList from "../components/Tweet/TweetList";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Profile";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <section className={classes.main}>
      <div className={classes["main__left-side"]}>
        <Navigation />
      </div>
      <div className={classes["main__middle-side"]}>
        <Profile />
        <TweetList /> {/* shows the tweets from this account */}
      </div>
      <div className={classes["main__right-side"]}>
        <Searchbar />
        <YouMightLike />
      </div>
    </section>
  );
};

export default ProfilePage;
