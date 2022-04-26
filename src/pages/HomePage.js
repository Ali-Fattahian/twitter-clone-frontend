import Navigation from "../components/Navigation";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import classes from "./Pages.module.css";

const HomePage = () => {
  return (
    <section className={classes.main}>
      <div className={classes["main__left-side"]}>
        <Navigation />
      </div>
      <div className={classes["main__middle-side"]}>
        <AddTweet />
        <TweetList />
      </div>
      <div className={classes['main__right-side']}>
        <Searchbar />
      </div>
    </section>
  );
};

export default HomePage;
